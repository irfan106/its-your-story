import { TextField, Grid, Typography, useTheme, Box } from "@mui/material";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import GlassButton from "../GlassButton/GlassButton";

const AuthForm = ({ signUp, toggleMode, showSnackbar }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setUser, setActive } = useAppContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, firstName, lastName } = form;

    try {
      if (!signUp) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser(user);
        setActive("home");
        showSnackbar("Login successful!", "success");
        navigate("/");
      } else {
        if (password !== confirmPassword) {
          return showSnackbar("Passwords do not match", "error");
        }

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName}` });

        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          avatar: "",
          bio: "",
          followers: 0,
          following: 0,
          createdAt: serverTimestamp(),
        };

        await setDoc(doc(db, "users", user.uid), userData);

        setUser(user);
        setActive("home");
        showSnackbar("Account created!", "success");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      showSnackbar(err.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {signUp && (
          <>
            <Grid item xs={6}>
              <TextField
                name="firstName"
                label="First Name"
                fullWidth
                required
                onChange={handleChange}
                InputProps={{
                  style: {
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="lastName"
                label="Last Name"
                fullWidth
                required
                onChange={handleChange}
                InputProps={{
                  style: {
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
            onChange={handleChange}
            InputProps={{
              style: {
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                borderRadius: 8,
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            type="password"
            label="Password"
            fullWidth
            required
            onChange={handleChange}
            InputProps={{
              style: {
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                borderRadius: 8,
              },
            }}
          />
        </Grid>
        {signUp && (
          <Grid item xs={12}>
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              fullWidth
              required
              onChange={handleChange}
              InputProps={{
                style: {
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#fff",
                  borderRadius: 8,
                },
              }}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <GlassButton variant="contained" type="submit" fullWidth>
            {signUp ? "Sign Up" : "Sign In"}
          </GlassButton>
        </Grid>

        <Grid item xs={12}>
          <Typography
            align="center"
            onClick={toggleMode}
            sx={{
              cursor: "pointer",
              color: "primary.main",
              fontWeight: 500,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {signUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Typography>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthForm;
