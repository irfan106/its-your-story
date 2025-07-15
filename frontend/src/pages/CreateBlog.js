import React, { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { Container, Typography } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const CreateBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

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
          console.log(error);
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

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setImagePreview(URL.createObjectURL(selected));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, tags, category, trending, description } = form;

    if (!title || !category || !tags.length || !description || !trending) {
      return toast.error("All fields are required.");
    }

    const blogData = {
      ...form,
      timestamp: serverTimestamp(),
      author: user.displayName,
      userId: user.uid,
    };

    try {
      await addDoc(collection(db, "blogs"), blogData);
      toast.success("Story uploaded successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  console.log(user, "user");

  return (
    <ProtectedRoute user={user}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ my: 4 }}>
          Upload a Story
        </Typography>
        <BlogForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleTags={handleTags}
          handleTrending={handleTrending}
          handleCategoryChange={handleCategoryChange}
          handleFileChange={handleFileChange}
          progress={progress}
          imagePreview={imagePreview}
          isEdit={false}
        />
      </Container>
    </ProtectedRoute>
  );
};

export default CreateBlog;
