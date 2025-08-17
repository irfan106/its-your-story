import React from "react";
import { Typography, Stack, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassButton from "../components/GlassButton/GlassButton"; // your glass button

export default function NotFoundPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      spacing={4}
      sx={{
        px: 2,
      }}
    >
      {/* Illustration - magnifying glass / lost page */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="250"
          height="250"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isDark ? "#fff" : "#0f172a"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="8" x2="14" y2="14" />
        </svg>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          sx={{
            background: isDark
              ? "linear-gradient(to right, #f4f4f5, #e5e7eb)"
              : "linear-gradient(to right, #1f2937, #4b5563)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            pb: 2,
          }}
        >
          404 - Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 1, maxWidth: 500 }}
        >
          We looked everywhere but couldn’t find the page you’re looking for.
        </Typography>
      </motion.div>

      {/* Glass Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <GlassButton
          component={Link}
          to="/"
          variant="contained"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 3,
          }}
        >
          Go Back Home
        </GlassButton>
      </motion.div>
    </Stack>
  );
}
