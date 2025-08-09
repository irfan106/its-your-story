import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../firebase";
import { useAppContext } from "../context/AppContext";
import BlogForm from "../components/BlogForm";
import { Container, Typography } from "@mui/material";
import imageCompression from "browser-image-compression";

const MIN_LENGTH = 250;

const CreateBlog = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    tags: [],
    category: "",
    description: "",
    imgUrl: "",
  });

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, tags, category, description, imgUrl } = form;

    if (!title || !category || !tags.length || !description) {
      return toast.error("All required fields must be filled.");
    }

    if (!imgUrl || (progress !== null && progress < 100)) {
      return toast.info("Please wait for the image to finish uploading.");
    }

    const plainTextLength = description.replace(/<[^>]+>/g, "").trim().length;
    if (plainTextLength < MIN_LENGTH) {
      return toast.error("Content must be at least 250 characters.");
    }

    const newPost = {
      ...form,
      author: user.displayName,
      author_lower: (user.displayName || "").toLowerCase(),
      title_lower: (form.title || "").toLowerCase(),
      userId: user.uid,
      timestamp: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "blogs"), newPost);
      toast.success("Blog created successfully");
      navigate("/");
    } catch (err) {
      console.error("Blog creation failed:", err);
      toast.error("Blog creation failed");
    }
  };

  const isFormValid =
    form &&
    form.title.trim() &&
    form.category &&
    form.tags.length > 0 &&
    form.description.replace(/<[^>]+>/g, "").trim().length >= MIN_LENGTH &&
    form.imgUrl &&
    (progress === null || progress === 100);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Create New Blog
      </Typography>
      <BlogForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        editing={false}
        setFile={setFile}
        imagePreview={imagePreview}
        categories={categories}
        setImagePreview={setImagePreview}
        isFormValid={isFormValid}
      />
    </Container>
  );
};

export default CreateBlog;
