import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Grid,
  useTheme,
  Paper,
  Box,
} from "@mui/material";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const { setUser, setActive } = useAppContext();
  const { email, password, firstName, lastName, confirmPassword } = state;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const showError = (message) => {
    setSnackbar({ open: true, message, severity: "error" });
  };

  const showSuccess = (message) => {
    setSnackbar({ open: true, message, severity: "success" });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (!signUp) {
        if (email && password) {
          const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          setUser(user);
          setActive("home");
          showSuccess("Login successful!");
          setTimeout(() => navigate("/"), 200);
        } else {
          showError("All fields are mandatory to fill");
        }
      } else {
        if (password !== confirmPassword) {
          return showError("Passwords don't match");
        }
        if (firstName && lastName && email && password) {
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
          });
          setActive("home");
          showSuccess("Account created!");
          setTimeout(() => navigate("/"), 200);
        } else {
          showError("All fields are mandatory to fill");
        }
      }
    } catch (err) {
      showError(err.message || "Authentication failed");
    }
  };

  const inputEffect = {
    transition: "0.3s",
    "&:hover": {
      boxShadow: `0 0 0 2px ${isDark ? "#90caf9" : "#1976d2"}30`,
    },
    "&.Mui-focused": {
      boxShadow: `0 0 0 2px ${isDark ? "#90caf9" : "#1976d2"}60`,
    },
  };

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <MotionPaper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        elevation={6}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          background: isDark
            ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))"
            : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,240,240,0.85))",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: isDark
            ? "0 10px 40px rgba(0,0,0,0.6)"
            : "0 10px 40px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          gutterBottom
        >
          {signUp ? "Create Account" : "Welcome Back"}
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          sx={{ mb: 4, color: "text.secondary" }}
        >
          {signUp
            ? "Sign up to get started with your journey."
            : "Sign in to continue exploring."}
        </Typography>

        <form onSubmit={handleAuth}>
          <Grid container spacing={3}>
            {signUp && (
              <>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: inputEffect }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    InputProps={{ sx: inputEffect }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{ sx: inputEffect }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                InputProps={{ sx: inputEffect }}
              />
            </Grid>
            {signUp && (
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  InputProps={{ sx: inputEffect }}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    borderRadius: 99,
                    textTransform: "none",
                    background: "linear-gradient(45deg, #2196f3, #21cbf3)",
                    boxShadow: "0 8px 20px rgba(33, 203, 243, 0.25)",
                  }}
                >
                  {signUp ? "Sign Up" : "Sign In"}
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, cursor: "pointer", color: "primary.main" }}
          onClick={() => setSignUp(!signUp)}
        >
          {signUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Typography>
      </MotionPaper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Auth;
