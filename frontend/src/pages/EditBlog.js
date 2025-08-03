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

const EditBlog = () => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useAppContext();
  const navigate = useNavigate();

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
      }
    };

    fetchBlog();
  }, [id, navigate]);

  useEffect(() => {
    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => {
          console.error("Upload error:", error);
          toast.error("Image upload failed");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            toast.info("Image uploaded successfully");
            setForm((prev) => ({ ...prev, imgUrl: url }));
          });
        }
      );
    }
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, subtitle, tags, category, description } = form;

    if (!title || !subtitle || !category || !tags.length || !description) {
      return toast.error("All fields are required.");
    }

    if (progress !== null && progress < 100) {
      return toast.info("Please wait for the image to finish uploading.");
    }

    const updatedData = {
      ...form,
      timestamp: serverTimestamp(),
      author: user.displayName,
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

  return form ? (
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
        categories={["Tech", "Travel", "Lifestyle", "Finance", "Food"]}
      />
    </Container>
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
