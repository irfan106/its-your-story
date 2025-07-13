// pages/EditBlog.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import BlogForm from "../components/BlogForm";
import { Container, Typography } from "@mui/material";

const EditBlog = ({ user, setActive }) => {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const snap = await getDoc(doc(db, "blogs", id));
      if (snap.exists()) {
        const data = snap.data();
        setForm(data);
        setImagePreview(data.imgUrl || null);
      }
    };
    fetchBlog();
    setActive(null);
  }, [id, setActive]);

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

    const updatedData = {
      ...form,
      timestamp: serverTimestamp(),
      author: user.displayName,
      userId: user.uid,
    };

    try {
      await updateDoc(doc(db, "blogs", id), updatedData);
      toast.success("Story updated successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return form ? (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        Update Story
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
        isEdit={true}
      />
    </Container>
  ) : (
    <Typography align="center" sx={{ mt: 10 }}>
      Loading...
    </Typography>
  );
};

export default EditBlog;
