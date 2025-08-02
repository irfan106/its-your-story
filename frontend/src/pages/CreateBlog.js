import React, { useState, useEffect } from "react";
import BlogForm from "../components/BlogForm";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { Container } from "@mui/material";
import ProtectedRoute from "./ProtectedRoute";
import { useAppContext } from "../context/AppContext";
import CommonBackground from "../components/CommonBackground";

const initialState = {
  title: "",
  subtitle: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
  imgUrl: "",
};

const CreateBlog = () => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const { user } = useAppContext();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, subtitle, tags, category, description } = form;

    if (!title || !subtitle || !category || !tags.length || !description) {
      return toast.error("All fields are required.");
    }
    if (progress !== null && progress < 100) {
      return toast.info("Please wait for the image to finish uploading.");
    }

    const blogData = {
      ...form,
      views: 0,
      timestamp: serverTimestamp(),
      author: user.displayName,
      userId: user.uid,
    };

    try {
      await addDoc(collection(db, "blogs"), blogData);
      toast.success("Blog created successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProtectedRoute user={user}>
      <CommonBackground>
        <Container maxWidth="md">
          <BlogForm
            form={form}
            setForm={setForm}
            handleSubmit={handleSubmit}
            editing={false}
            setFile={setFile}
            imagePreview={file}
            categories={["Tech", "Travel", "Lifestyle", "Finance", "Food"]}
          />
        </Container>
      </CommonBackground>
    </ProtectedRoute>
  );
};

export default CreateBlog;
