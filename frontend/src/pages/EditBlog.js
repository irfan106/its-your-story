import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import BlogForm from "../components/BlogForm";
import { Container, Stack, Typography } from "@mui/material";
import Spinner from "../components/Spinner";

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
        setForm({ ...data, tags: data.tags || [] });
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
          console.error("Upload error:", error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, tags, category, content } = form;

    if (!title || !category || !tags.length || !content) {
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
      console.error("Update failed:", err);
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
        imagePreview={imagePreview}
        handleFileChange={handleFileChange}
        progress={progress}
        categories={["Technology", "Travel", "Lifestyle", "Health", "Other"]}
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
