import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { useAppContext } from "../context/AppContext";
import BlogForm from "../components/BlogForm";
import { Container, Typography } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";
import useFileUpload from "../hooks/useFileUpload";

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

  // Custom hook for image upload
  const { setFile, preview, progress, url, startUpload } = useFileUpload();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, tags, category, description } = form;

    if (!title || !category || !tags.length || !description) {
      return toast.error("All required fields must be filled.");
    }

    if (!url) {
      return toast.error("Please upload an image before submitting.");
    }

    const plainTextLength = description.replace(/<[^>]+>/g, "").trim().length;
    if (plainTextLength < MIN_LENGTH) {
      return toast.error("Content must be at least 250 characters.");
    }

    const newPost = {
      ...form,
      imgUrl: url,
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
    url;

  return (
    <ProtectedRoute user={user}>
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
          startUpload={startUpload}
          imagePreview={preview}
          uploadProgress={progress}
          categories={categories}
          isFormValid={isFormValid}
          url={url}
        />
      </Container>
    </ProtectedRoute>
  );
};

export default CreateBlog;
