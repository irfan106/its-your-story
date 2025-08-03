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
import { useApolloClient } from "@apollo/client";
import imageCompression from "browser-image-compression";

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
  const client = useApolloClient();
  const navigate = useNavigate();

  // Upload compressed image
  useEffect(() => {
    const uploadCompressedFile = async () => {
      try {
        if (!file) return;

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
            console.error(error);
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
    const { title, subtitle, tags, category, description, imgUrl } = form;

    if (!title || !subtitle || !category || !tags.length || !description) {
      return toast.error("All fields are required.");
    }

    if (!imgUrl || (progress !== null && progress < 100)) {
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

      await client.refetchQueries({
        include: ["GetBlogs", "MyBlogsByPage", "BlogsByPage"],
        awaitRefetchQueries: true, // ✅ Ensures the UI waits
      });

      toast.success("Blog created successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Blog creation failed");
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
