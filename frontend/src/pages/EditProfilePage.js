import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
  Avatar,
  IconButton,
  Divider,
  Box,
  FormControlLabel,
  Switch,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import EditIcon from "@mui/icons-material/Edit";
import { useAppContext } from "../context/AppContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import GlassButton from "../components/GlassButton/GlassButton";
import { toast } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";

const MotionPaper = motion(Paper);

const EditProfilePage = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [profileData, setProfileData] = useState({
    displayName: "",
    photoURL: "",
    bio: "",
    website: "",
    phone: "",
    phoneVisibility: "private",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch {
        toast.error("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setProfileData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTogglePhoneVisibility = () => {
    setProfileData((prev) => ({
      ...prev,
      phoneVisibility: prev.phoneVisibility === "public" ? "private" : "public",
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileData((prev) => ({ ...prev, photoURL: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const docRef = doc(db, "users", user.uid);

      // Sanitize profileData to remove undefined values
      const sanitizedProfileData = {};
      for (const key in profileData) {
        if (profileData[key] !== undefined) {
          sanitizedProfileData[key] = profileData[key];
        }
      }

      await updateDoc(docRef, sanitizedProfileData);
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Firestore update error:", error);
      toast.error("Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedRoute user={user}>
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <MotionPaper
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            backdropFilter: "blur(15px)",
            background: "transparent",
            boxShadow: isDark
              ? "0 10px 40px rgba(0,0,0,0.6)"
              : "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid",
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            "& .MuiTextField-root": {
              backgroundColor: "transparent",
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
              backgroundColor: "transparent",
              color: isDark ? "#fff" : "#333",
              transition: "0.3s ease",
              boxShadow: isDark
                ? "0 4px 20px rgba(0,0,0,0.4)"
                : "0 4px 16px rgba(0,0,0,0.06)",
              ":hover": {
                transform: "scale(1.02)",
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
            sx={{ mb: 1 }}
          >
            Edit Profile
          </Typography>
          <Divider sx={{ mb: 4 }} />

          {loading ? (
            <Stack alignItems="center" justifyContent="center" height={200}>
              <CircularProgress />
            </Stack>
          ) : (
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <Box
                sx={{ position: "relative", display: "inline-block", mb: 3 }}
              >
                <Avatar
                  src={profileData.photoURL || ""}
                  alt={profileData.displayName || "Avatar"}
                  sx={{
                    width: 100,
                    height: 100,
                    boxShadow: 3,
                    border: `3px solid ${
                      isDark ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)"
                    }`,
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />

                <Tooltip title="Change Profile Photo" arrow>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => fileInputRef.current.click()}
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      bgcolor: isDark
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(255, 255, 255, 0.8)",
                      color: isDark ? "#000" : "#000",
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: isDark
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(255, 255, 255, 1)",
                        transform: "scale(1.2)",
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <TextField
                label="Display Name"
                name="displayName"
                required
                fullWidth
                value={profileData.displayName}
                onChange={handleChange}
                autoComplete="name"
              />

              <TextField
                label="Bio"
                name="bio"
                multiline
                minRows={3}
                fullWidth
                value={profileData.bio || ""}
                onChange={handleChange}
                placeholder="Tell us about yourself"
              />

              <TextField
                label="Phone Number"
                name="phone"
                type="tel"
                fullWidth
                value={profileData.phone || ""}
                onChange={handleChange}
                placeholder="+1 (555) 555-5555"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={profileData.phoneVisibility === "public"}
                    onChange={handleTogglePhoneVisibility}
                    color="primary"
                  />
                }
                label="Make Phone Number Public"
              />

              <TextField
                label="Website"
                name="website"
                type="url"
                fullWidth
                value={profileData.website || ""}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />

              <GlassButton
                type="submit"
                variant="contained"
                disabled={saving}
                sx={{ mt: 1 }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </GlassButton>
            </Box>
          )}
        </MotionPaper>
      </Container>
    </ProtectedRoute>
  );
};

export default EditProfilePage;
