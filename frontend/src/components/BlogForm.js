import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  LinearProgress,
} from "@mui/material";
import ReactTagInput from "@pathofdev/react-tag-input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  serverTimestamp,
  addDoc,
  updateDoc,
  collection,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import DOMPurify from "dompurify";

const initialState = {
  title: "",
  tags: [],
  trending: "no",
  category: "",
  description: "",
};

const categoryOptions = [
  "Fantasy",
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const BlogForm = ({ user, initialData = null, blogId = null }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (file) {
      const uploadFile = () => {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

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
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              toast.info("Image uploaded successfully");
              setForm((prev) => ({ ...prev, imgUrl: url }));
            });
          }
        );
      };
      uploadFile();
    }
  }, [file]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTags = (tags) => {
    setForm((prev) => ({ ...prev, tags }));
  };

  const handleDescriptionChange = (value) => {
    setForm((prev) => ({ ...prev, description: value }));

    const plainText = DOMPurify.sanitize(value, {
      USE_PROFILES: { html: false },
    })
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    const words = plainText.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setCharCount(plainText.length);
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
      if (blogId) {
        await updateDoc(doc(db, "blogs", blogId), blogData);
        toast.success("Story updated successfully");
      } else {
        await addDoc(collection(db, "blogs"), blogData);
        toast.success("Story uploaded successfully");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        {blogId ? "Update Story" : "Upload a Story"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              variant="outlined"
              value={form.title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <ReactTagInput
              tags={form.tags}
              onChange={handleTags}
              placeholder="Tags"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel>Is it a trending story?</FormLabel>
              <RadioGroup
                row
                name="trending"
                value={form.trending}
                onChange={handleChange}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={form.category}
                onChange={handleChange}
                name="category"
                label="Category"
              >
                {categoryOptions.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 🔥 Rich Text Editor for Description with Word Count */}
          <Grid item xs={12}>
            <FormLabel>Description</FormLabel>
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={handleDescriptionChange}
              style={{ height: "200px", marginBottom: "1rem" }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              align="right"
              sx={{ mb: 2 }}
            >
              Word Count: {wordCount} | Character Count: {charCount}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            {progress !== null && progress < 100 && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={progress !== null && progress < 100}
            >
              {blogId ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BlogForm;
