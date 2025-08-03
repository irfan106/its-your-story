import React from "react";
import {
  Box,
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
import GlassButton from "./GlassButton/GlassButton";

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
                required
                InputProps={{ sx: inputEffect }}
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

              <Box
                sx={{
                  border: `1px solid ${isDark ? "#444" : "#ccc"}`,
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    borderColor: isDark ? "#666" : "#999",
                    boxShadow: isDark
                      ? "0 0 0 2px rgba(255,255,255,0.1)"
                      : "0 0 0 2px rgba(0,0,0,0.05)",
                  },

                  // Quill toolbar styles
                  "& .ql-toolbar": {
                    border: "none",
                    backgroundColor: isDark ? "#2a2a2a" : "#f3f3f3",
                    borderBottom: `1px solid ${isDark ? "#555" : "#ddd"}`,
                    button: {
                      color: isDark ? "#ccc" : "#333",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: isDark ? "#fff" : "#000",
                        backgroundColor: isDark ? "#333" : "#e0e0e0",
                      },
                      "&.ql-active": {
                        color: isDark ? "#66ccff" : "#0055aa",
                        backgroundColor: isDark ? "#1f2a3a" : "#d6e9ff",
                      },
                    },
                  },

                  "& .ql-container": {
                    border: "none",
                    backgroundColor: isDark ? "#1e1e1e" : "#fff",
                    borderRadius: 0,
                  },
                  "& .ql-editor": {
                    minHeight: "200px",
                    maxHeight: "300px",
                    padding: "12px",
                    fontSize: "1rem",
                    color: isDark ? "#eee" : "#111",
                  },
                  "& .ql-editor:focus": {
                    outline: "none",
                  },
                }}
              >
                <ReactQuill
                  value={form.description}
                  onChange={handleQuillChange}
                  theme="snow"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Upload Blog Image
              </Typography>
              <GlassButton variant="outlined" component="label" sx={{ mb: 2 }}>
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
              </GlassButton>
              {imagePreview && (
                <Box
                  component="img"
                  src={
                    typeof imagePreview === "string"
                      ? imagePreview
                      : URL.createObjectURL(imagePreview)
                  }
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
              <GlassButton type="submit" variant="contained" size="large">
                {editing ? "Update Blog" : "Create Blog"}
              </GlassButton>
            </Grid>
          </Grid>
        </Box>
      </MotionPaper>
    </Container>
  );
};

export default BlogForm;
