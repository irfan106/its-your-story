import React, { useState, useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  getDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

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

const AddEditBlog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const { title, tags, category, trending, description } = form;

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
            console.log(error);
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

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blogs", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setForm({ ...snap.data() });
      }
    };

    if (id) {
      fetchBlog();
      setActive(null);
    }
  }, [id, setActive]);

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
      if (!id) {
        await addDoc(collection(db, "blogs"), blogData);
        toast.success("Story uploaded successfully");
      } else {
        await updateDoc(doc(db, "blogs", id), blogData);
        toast.success("Story updated successfully");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ my: 4 }}>
        {id ? "Update Story" : "Upload a Story"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="title"
              label="Title"
              variant="outlined"
              value={title}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <ReactTagInput
              tags={tags}
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
                value={trending}
                onChange={handleTrending}
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
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categoryOptions.map((cat, i) => (
                  <MenuItem value={cat} key={i}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              name="description"
              label="Description"
              multiline
              rows={5}
              variant="outlined"
              value={description}
              onChange={handleChange}
              required
            />
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
              {id ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddEditBlog;
