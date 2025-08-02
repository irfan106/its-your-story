import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const MotionPaper = motion(Paper);

const BlogForm = ({
  form,
  setForm,
  handleSubmit,
  categories = [],
  editing,
  setFile,
  imagePreview,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const inputEffect = {
    transition: "0.3s",
    "&:hover": {
      boxShadow: `0 0 0 2px ${isDark ? "#90caf940" : "#1976d230"}`,
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 2px ${isDark ? "#90caf980" : "#1976d260"}`,
    },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (!form.tags.includes(newTag)) {
        setForm((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      e.target.value = "";
    }
  };

  const handleTagDelete = (tagToDelete) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToDelete),
    }));
  };

  const handleQuillChange = (value) => {
    setForm({ ...form, description: value });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <MotionPaper
        elevation={8}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        sx={{
          p: 4,
          borderRadius: 4,
          backdropFilter: "blur(12px)",
          background: isDark
            ? "rgba(30, 30, 30, 0.6)"
            : "rgba(255, 255, 255, 0.85)",
          border: `1px solid ${
            isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
          }`,
          boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.8)"
            : "0 8px 32px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          {editing ? "Edit Blog" : "Create New Blog"}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                variant="outlined"
                required
                InputProps={{ sx: inputEffect }}
                sx={{
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  borderRadius: 1,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subtitle"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                variant="outlined"
                InputProps={{ sx: inputEffect }}
                sx={{
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  borderRadius: 1,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                fullWidth
                value={form.category}
                onChange={handleCategoryChange}
                name="category"
                displayEmpty
                required
                sx={{
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  borderRadius: 1,
                  "& .MuiSelect-select": { py: 1.5 },
                  "& fieldset": { border: "none" },
                  ...inputEffect,
                }}
              >
                <MenuItem value="" disabled>
                  Select a Category
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags (press Enter to add)"
                variant="outlined"
                onKeyDown={handleTagKeyDown}
                InputProps={{ sx: inputEffect }}
                sx={{
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  borderRadius: 1,
                }}
              />
              <Box sx={{ mt: 1 }}>
                {form.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                    sx={{ m: 0.5 }}
                    color="primary"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Content
              </Typography>
              <ReactQuill
                value={form.description}
                onChange={handleQuillChange}
                theme="snow"
                style={{
                  background: isDark ? "#1e1e1e" : "#fff",
                  color: isDark ? "#eee" : "#111",
                  borderRadius: 8,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Blog Image
              </Typography>
              <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                Choose File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    if (selectedFile) {
                      const maxSize = 2 * 1024 * 1024;
                      if (selectedFile.size > maxSize) {
                        toast.error("Image must be less than 2MB");
                        return;
                      }
                      setFile(selectedFile);
                      setForm({ ...form, imgUrl: "" });
                    }
                  }}
                />
              </Button>
              {imagePreview && (
                <Box
                  component="img"
                  src={URL.createObjectURL(imagePreview)}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    maxHeight: 300,
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              )}
            </Grid>

            <Grid item xs={12} textAlign="right">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 3, px: 4 }}
              >
                {editing ? "Update Blog" : "Create Blog"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </MotionPaper>
    </Container>
  );
};

export default BlogForm;
