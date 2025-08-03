import React from "react";
import { Box, Chip, Typography, useTheme } from "@mui/material";

const Tags = ({ tags }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ my: 4 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          background: isDark
            ? "linear-gradient(to right, #e0e0e0, #cfcfcf)"
            : "linear-gradient(to right, #1f2937, #4b5563)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Tags
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
        {tags?.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            clickable
            sx={{
              fontWeight: 500,
              fontSize: 13,
              borderRadius: 2,
              px: 1,
              cursor: "pointer",
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.25)",
              color: isDark ? "#fff" : "#1f2937",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              boxShadow: isDark
                ? "0 1px 3px rgba(255,255,255,0.05)"
                : "0 1px 3px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.18)"
                  : "rgba(255, 255, 255, 0.85)",
                color: isDark ? "#fff" : "#111827",
                boxShadow: isDark
                  ? "0 2px 6px rgba(255,255,255,0.15)"
                  : "0 2px 6px rgba(0,0,0,0.1)",
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Tags;
