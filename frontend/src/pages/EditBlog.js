import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";
import BlogForm from "../components/BlogForm";
import { Container, Stack, Typography } from "@mui/material";
import Spinner from "../components/Spinner";
import { useAppContext } from "../context/AppContext";
import ProtectedRoute from "./ProtectedRoute";
import useFileUpload from "../hooks/useFileUpload";

const MIN_LENGTH = 250;

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

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);

  // Custom hook for file upload with initial preview
  const { file, setFile, preview, setPreview, progress, url, startUpload } =
    useFileUpload(form?.imgUrl || "");

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const snap = await getDoc(doc(db, "blogs", id));
        if (snap.exists()) {
          const data = snap.data();
          setForm({ ...data, tags: data.tags || [] });

          // Set existing image as preview
          if (data.imgUrl) {
            setPreview(data.imgUrl);
          }
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
  }, [id, navigate, setPreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form) return;

    const { title, subtitle, tags, category, description } = form;

    if (!title || !subtitle || !category || !tags.length || !description) {
      return toast.error("All fields are required.");
    }

    const plainTextLength = description.replace(/<[^>]+>/g, "").trim().length;
    if (plainTextLength < MIN_LENGTH) {
      return toast.error("Content must be at least 250 characters.");
    }

    if (file && !url && progress !== 100) {
      return toast.info("Please upload the image before submitting.");
    }

    const updatedData = {
      ...form,
      imgUrl: url || form.imgUrl,
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
    (form.imgUrl || url) &&
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
          setFile={setFile} // selects new file
          startUpload={startUpload} // triggers upload
          uploadProgress={progress}
          categories={categories}
          isFormValid={isFormValid}
          imagePreview={preview || form.imgUrl} // existing image
          url={url}
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
