import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";
import BlogForm from "../components/BlogForm";
import { Container, Stack, Typography } from "@mui/material";
import Spinner from "../components/Spinner";
import { useAppContext } from "../context/AppContext";
import imageCompression from "browser-image-compression";
import ProtectedRoute from "./ProtectedRoute";

const MIN_LENGTH = 250;

const EditBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useAppContext();
  const navigate = useNavigate();

  const categories = [
    "Tech",
    "Travel",
    "Lifestyle",
    "Finance",
    "Food",
    "Fiction",
    "Personal Growth",
    "Startups",
    "Culture",
    "Productivity",
    "Relationships",
    "Mental Health",
    "Books & Reviews",
    "College Life",
    "Design & UX",
  ];

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const snap = await getDoc(doc(db, "blogs", id));
        if (snap.exists()) {
          const data = snap.data();
          setForm({ ...data, tags: data.tags || [] });
          setImagePreview(data.imgUrl || null);
        } else {
          toast.error("Blog not found");
          navigate("/");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        toast.error("Error loading blog");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Compress and upload image
  useEffect(() => {
    const uploadCompressedFile = async () => {
      if (!file) return;

      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        const storageRef = ref(storage, `compressed_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(prog);
          },
          (error) => {
            console.error("Upload error:", error);
            toast.error("Image upload failed");
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            toast.success("Image uploaded successfully");
            setForm((prev) => ({ ...prev, imgUrl: url }));
          }
        );
      } catch (err) {
        console.error("Image compression failed:", err);
        toast.error("Image compression failed");
      }
    };

    uploadCompressedFile();
  }, [file]);

  // Submit edited blog
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, subtitle, tags, category, description, imgUrl } = form;

    if (!title || !subtitle || !category || !tags.length || !description) {
      return toast.error("All fields are required.");
    }

    if (!imgUrl || (progress !== null && progress < 100)) {
      return toast.info("Please wait for the image to finish uploading.");
    }

    const plainTextLength = description.replace(/<[^>]+>/g, "").trim().length;
    if (plainTextLength < MIN_LENGTH) {
      return toast.error("Content must be at least 250 characters.");
    }

    const updatedData = {
      ...form,
      timestamp: serverTimestamp(),
      author: user.displayName,
      author_lower: (user.displayName || "").toLowerCase(),
      title_lower: (form.title || "").toLowerCase(),
      userId: user.uid,
    };

    try {
      await updateDoc(doc(db, "blogs", id), updatedData);
      toast.success("Blog updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed");
    }
  };

  const isFormValid =
    form &&
    form.title.trim() &&
    form.subtitle.trim() &&
    form.category &&
    form.tags.length > 0 &&
    form.description.replace(/<[^>]+>/g, "").trim().length >= MIN_LENGTH &&
    form.imgUrl &&
    (progress === null || progress === 100);

  return form ? (
    <ProtectedRoute user={user}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ my: 4 }}>
          Edit Blog
        </Typography>
        <BlogForm
          form={form}
          setForm={setForm}
          handleSubmit={handleSubmit}
          editing={true}
          setFile={setFile}
          imagePreview={imagePreview}
          categories={categories}
          isFormValid={isFormValid}
          setImagePreview={setImagePreview}
        />
      </Container>
    </ProtectedRoute>
  ) : (
    <Stack
      alignItems="center"
      justifyContent="center"
      height="40vh"
      sx={{ mt: 4 }}
    >
      <Spinner />
    </Stack>
  );
};

export default EditBlog;
