import React from "react";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

const Categories = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    // Navigate to explore page with category param
    navigate(`/explore?category=${encodeURIComponent(cat)}`);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          background: isDark
            ? "linear-gradient(to right, #f4f4f5, #e5e7eb)"
            : "linear-gradient(to right, #1f2937, #4b5563)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Categories
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          p: 2,
          borderRadius: 3,
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.02)"
            : "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.05)",
          boxShadow: isDark
            ? "0 4px 12px rgba(255,255,255,0.03)"
            : "0 4px 12px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
        }}
      >
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => handleCategoryClick(cat)}
            sx={{
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              px: 2,
              cursor: "pointer",
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.3)",
              color: isDark ? "#fff" : "#1f2937",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow: isDark
                ? "0 1px 4px rgba(255,255,255,0.1)"
                : "0 1px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.2)"
                  : "rgba(255, 255, 255, 0.9)",
                color: isDark ? "#fff" : "#111827",
                boxShadow: isDark
                  ? "0 2px 8px rgba(255,255,255,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.15)",
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
