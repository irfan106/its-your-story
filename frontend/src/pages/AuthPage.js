import {
  Container,
  Paper,
  Snackbar,
  Alert,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { motion } from "framer-motion";
import AuthForm from "../components/Auth/AuthForm";
import GoogleLoginButton from "../components/Auth/GoogleLoginButton";

const MotionPaper = motion(Paper);

const AuthPage = () => {
  const [signUp, setSignUp] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const toggleMode = () => setSignUp((prev) => !prev);

  const showSnackbar = (message, severity = "error") => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={6}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          backdropFilter: "blur(15px)",
          background: isDark
            ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))"
            : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,240,240,0.85))",
          boxShadow: isDark
            ? "0 10px 40px rgba(0,0,0,0.6)"
            : "0 10px 30px rgba(0,0,0,0.1)",
          border: "1px solid",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
          transition: "all 0.3s ease-in-out",
          "& .MuiTextField-root": {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,1)",
            borderRadius: 2,
            input: {
              color: isDark ? "#fff" : "#222",
            },
          },
          "& .MuiButton-root": {
            borderRadius: 2,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            backdropFilter: "blur(8px)",
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#f4f4f4",
            color: isDark ? "#fff" : "#333",
            transition: "0.3s ease",
            boxShadow: isDark
              ? "0 4px 20px rgba(0,0,0,0.4)"
              : "0 4px 16px rgba(0,0,0,0.06)",
            ":hover": {
              transform: "scale(1.02)",
              backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
              boxShadow: isDark
                ? "0 6px 30px rgba(0,0,0,0.5)"
                : "0 6px 20px rgba(0,0,0,0.1)",
            },
          },
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          fontWeight={700}
        >
          {signUp ? "Create Account" : "Welcome Back"}
        </Typography>
        <Typography
          variant="subtitle2"
          textAlign="center"
          sx={{ mb: 3, color: "text.secondary" }}
        >
          {signUp
            ? "Sign up to get started."
            : "Sign in to continue your journey."}
        </Typography>

        <AuthForm
          signUp={signUp}
          toggleMode={toggleMode}
          showSnackbar={showSnackbar}
        />

        <Divider
          sx={{
            my: 3,
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          }}
        >
          or
        </Divider>

        <Box>
          <GoogleLoginButton showSnackbar={showSnackbar} />
        </Box>
      </MotionPaper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuthPage;
