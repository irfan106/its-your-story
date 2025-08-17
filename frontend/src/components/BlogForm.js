import React, { useRef, useState } from "react";
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
  LinearProgress,
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
  startUpload,
  uploadProgress,
  isFormValid,
  imagePreview = "",
  url,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const quillRef = useRef(null);
  const [selectedFile, setSelectedFileState] = useState(null);
  const [preview, setPreview] = useState(imagePreview);

  const MAX_LENGTH = 5000;
  const MIN_LENGTH = 250;
  const MAX_TAG_LENGTH = 30;

  const MAX_LENGTHS = {
    title: 100,
    subtitle: 200,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (MAX_LENGTHS[name] && value.length > MAX_LENGTHS[name]) return; // prevent overflow
    setForm({ ...form, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newTag = e.target.value.trim();

      if (newTag.length > MAX_TAG_LENGTH) {
        toast.error(`Tag cannot exceed ${MAX_TAG_LENGTH} characters`);
        return;
      }

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
    const plainText = value.replace(/<[^>]+>/g, "").trim();

    if (plainText.length <= MAX_LENGTH) {
      setForm({ ...form, description: value });
    } else {
      const truncated = plainText.slice(0, MAX_LENGTH);
      quillRef.current.getEditor().clipboard.dangerouslyPasteHTML(truncated);
      setForm({
        ...form,
        description: quillRef.current.getEditor().root.innerHTML,
      });
      toast.warn(`Content truncated to ${MAX_LENGTH} characters.`);
    }
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
          background: "transparent",
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
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={
                  <span>
                    Title <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="title"
                value={form.title}
                onChange={handleChange}
                variant="outlined"
                helperText={
                  form.title.length > MAX_LENGTHS.title
                    ? `Maximum ${MAX_LENGTHS.title} characters allowed`
                    : `${form.title.length} / ${MAX_LENGTHS.title}`
                }
                error={form.title.length > MAX_LENGTHS.title}
              />
            </Grid>

            {/* Subtitle */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subtitle"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                variant="outlined"
                helperText={
                  form.subtitle.length > MAX_LENGTHS.subtitle
                    ? `Maximum ${MAX_LENGTHS.subtitle} characters allowed`
                    : `${form.subtitle.length} / ${MAX_LENGTHS.subtitle}`
                }
                error={form.subtitle.length > MAX_LENGTHS.subtitle}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12}>
              <Select
                fullWidth
                value={form.category}
                onChange={handleCategoryChange}
                name="category"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  <span>
                    Select a Category <span style={{ color: "red" }}>*</span>
                  </span>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* Tags */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={`Tags (press Enter to add, max ${MAX_TAG_LENGTH} chars)`}
                variant="outlined"
                onKeyDown={handleTagKeyDown}
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

            {/* Content Editor */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Content <span style={{ color: "red" }}>*</span>
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
                    backgroundColor: "transparent",
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
                    backgroundColor: "transparent",
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
                  ref={quillRef}
                  value={form.description}
                  onChange={handleQuillChange}
                  theme="snow"
                />
              </Box>
              <Box
                sx={{
                  mt: 1,
                  textAlign: "right",
                  fontSize: 13,
                  color:
                    form.description.replace(/<[^>]+>/g, "").trim().length <
                    MIN_LENGTH
                      ? "error.main"
                      : isDark
                      ? "#bbb"
                      : "#666",
                }}
              >
                {form.description.replace(/<[^>]+>/g, "").trim().length} /{" "}
                {MAX_LENGTH} characters
                {form.description.replace(/<[^>]+>/g, "").trim().length <
                  MIN_LENGTH && " (min 250 characters required)"}
              </Box>
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Blog Image *
              </Typography>

              <GlassButton variant="outlined" component="label" sx={{ mb: 2 }}>
                Choose File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const selected = e.target.files[0];
                    if (!selected) return;

                    if (selected.size > 2 * 1024 * 1024) {
                      toast.error("Image must be less than 2MB");
                      return;
                    }

                    setFile(selected); // parent upload
                    setSelectedFileState(selected); // local
                    setPreview(URL.createObjectURL(selected)); // preview
                  }}
                />
              </GlassButton>

              {preview && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />

                  {/* Only show upload/remove buttons if there's a selected file AND no URL yet */}
                  {selectedFile && !url && (
                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                      <GlassButton
                        variant="contained"
                        onClick={startUpload}
                        disabled={!selectedFile}
                      >
                        Upload Image
                      </GlassButton>
                      <GlassButton
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setFile(null);
                          setSelectedFileState(null);
                          setPreview("");
                        }}
                      >
                        Remove Image
                      </GlassButton>
                    </Box>
                  )}
                </Box>
              )}

              {uploadProgress !== null && (
                <Box
                  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{ flexGrow: 1 }}
                  />
                  <Typography variant="body2">{uploadProgress}%</Typography>
                </Box>
              )}
            </Grid>

            {/* Submit */}
            <Grid item xs={12} textAlign="right">
              <GlassButton
                type="submit"
                variant="contained"
                size="large"
                disabled={!isFormValid}
              >
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
