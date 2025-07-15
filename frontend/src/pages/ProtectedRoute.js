import React from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const MotionPaper = motion(Paper);

const ProtectedRoute = ({ user, children }) => {
  const navigate = useNavigate();

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MotionPaper
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            textAlign: "center",
            backdropFilter: "blur(12px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            color: "#fff",
            maxWidth: 500,
          }}
        >
          <LockOutlinedIcon
            color="error"
            sx={{ fontSize: 60, mb: 2, filter: "drop-shadow(0 0 8px red)" }}
          />
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Restricted Access
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: "rgba(255,255,255,0.8)" }}
          >
            🚫 You are not authorized to view this page. <br />
            Please sign in to continue or return to the homepage.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/auth")}
            sx={{
              borderRadius: 10,
              textTransform: "none",
              px: 4,
              py: 1.2,
              background: "linear-gradient(45deg, #ff1744, #f50057)",
              boxShadow: "0 4px 20px rgba(255, 23, 68, 0.4)",
            }}
          >
            Go to Login
          </Button>
        </MotionPaper>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
