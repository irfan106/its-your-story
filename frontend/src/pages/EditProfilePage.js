import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Stack,
  Avatar,
  Divider,
  Box,
  FormControlLabel,
  Switch,
  CircularProgress,
  InputAdornment,
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
import useFileUpload from "../hooks/useFileUpload";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "react-phone-input-2/lib/material.css";
import PhoneInput from "react-phone-input-2";

const MotionPaper = motion(Paper);

const EditProfilePage = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const MAX_LENGTHS = {
    displayName: 50,
    username: 30,
    location: 50,
    birthday: "",
    jobTitle: 50,
    company: 50,
    skills: 200,
    linkedin: 100,
    twitter: 100,
    instagram: 100,
    github: 100,
    photoURL: "",
    bio: 500,
    website: 100,
    phone: 20,
  };

  const [profileData, setProfileData] = useState({
    displayName: "",
    username: "",
    location: "",
    birthday: "",
    jobTitle: "",
    company: "",
    skills: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    github: "",
    photoURL: "",
    bio: "",
    website: "",
    phone: "",
    phoneVisibility: "private",
  });

  const { file, setFile, preview, startUpload } = useFileUpload(
    profileData.photoURL
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    const { name, value } = e.target;
    if (MAX_LENGTHS[name] && value.length > MAX_LENGTHS[name]) return;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePhoneVisibility = () => {
    setProfileData((prev) => ({
      ...prev,
      phoneVisibility: prev.phoneVisibility === "public" ? "private" : "public",
    }));
  };

  const handlePhotoChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (selected.size > 500 * 1024) {
      toast.error("Image must be less than 500 KB");
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let updatedPhotoURL = profileData.photoURL;
      if (file) {
        updatedPhotoURL = await startUpload();
      }

      const docRef = doc(db, "users", user.uid);
      const sanitizedProfileData = {};
      for (const key in profileData) {
        if (profileData[key] !== undefined) {
          sanitizedProfileData[key] = profileData[key];
        }
      }
      if (updatedPhotoURL) {
        sanitizedProfileData.photoURL = updatedPhotoURL;
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

  const today = new Date();
  const yearLimit = today.getFullYear() - 14;
  const maxDate = `${yearLimit}-12-31`;

  return (
    <ProtectedRoute user={user}>
      <Container maxWidth="md" sx={{ py: 10 }}>
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
              {/* Profile Picture */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  src={preview || profileData.photoURL}
                  sx={{ width: 80, height: 80 }}
                />
                <GlassButton
                  variant="outlined"
                  component="label"
                  startIcon={<EditIcon />}
                >
                  Change Profile Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                  />
                </GlassButton>
              </Stack>

              {/* Basic Info */}
              <Typography variant="h6">Basic Info</Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Display Name"
                  name="displayName"
                  required
                  fullWidth
                  value={profileData.displayName}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.displayName }}
                  helperText={`${profileData.displayName.length}/${MAX_LENGTHS.displayName}`}
                />
                <TextField
                  label="Username"
                  name="username"
                  fullWidth
                  value={profileData.username}
                  onChange={handleChange}
                  placeholder="@username"
                  inputProps={{ maxLength: MAX_LENGTHS.username }}
                  helperText={`${profileData.username.length}/${MAX_LENGTHS.username}`}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  value={profileData.location}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.location }}
                  helperText={`${profileData.location.length}/${MAX_LENGTHS.location}`}
                />

                <TextField
                  label="Birthday"
                  name="birthday"
                  type="date"
                  fullWidth
                  value={profileData.birthday}
                  onChange={handleChange}
                  inputProps={{ max: maxDate }}
                  InputLabelProps={{ shrink: true }}
                  onClick={(e) => e.target.showPicker && e.target.showPicker()} // whole field touchable
                  sx={{
                    "& input[type='date']::-webkit-calendar-picker-indicator": {
                      display: "none", // hides browser default icon
                    },
                    "& input[type='date']": {
                      cursor: "pointer",
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarMonthIcon
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.7)" // light in dark mode
                                : "rgba(0,0,0,0.6)", // dark in light mode
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              {/* Professional Info */}
              <Typography variant="h6" sx={{ mt: 3 }}>
                Professional Info
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Job Title"
                  name="jobTitle"
                  fullWidth
                  value={profileData.jobTitle}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.jobTitle }}
                  helperText={`${profileData.jobTitle.length}/${MAX_LENGTHS.jobTitle}`}
                />
                <TextField
                  label="Company"
                  name="company"
                  fullWidth
                  value={profileData.company}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.company }}
                  helperText={`${profileData.company.length}/${MAX_LENGTHS.company}`}
                />
              </Stack>

              <TextField
                label="Skills"
                name="skills"
                fullWidth
                value={profileData.skills}
                onChange={handleChange}
                placeholder="JavaScript, React, Firebase"
                inputProps={{ maxLength: MAX_LENGTHS.skills }}
                helperText={`${profileData.skills.length}/${MAX_LENGTHS.skills}`}
              />

              {/* Social Links */}
              <Typography variant="h6" sx={{ mt: 3 }}>
                Social Links
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="LinkedIn"
                  name="linkedin"
                  fullWidth
                  value={profileData.linkedin}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.linkedin }}
                  helperText={`${profileData.linkedin.length}/${MAX_LENGTHS.linkedin}`}
                />
                <TextField
                  label="Twitter"
                  name="twitter"
                  fullWidth
                  value={profileData.twitter}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.twitter }}
                  helperText={`${profileData.twitter.length}/${MAX_LENGTHS.twitter}`}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Instagram"
                  name="instagram"
                  fullWidth
                  value={profileData.instagram}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.instagram }}
                  helperText={`${profileData.instagram.length}/${MAX_LENGTHS.instagram}`}
                />
                <TextField
                  label="GitHub"
                  name="github"
                  fullWidth
                  value={profileData.github}
                  onChange={handleChange}
                  inputProps={{ maxLength: MAX_LENGTHS.github }}
                  helperText={`${profileData.github.length}/${MAX_LENGTHS.github}`}
                />
              </Stack>

              {/* Contact Info */}
              <Typography variant="h6" sx={{ mt: 3 }}>
                Contact Info
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
              >
                <Box sx={{ flex: 1 }}>
                  <PhoneInput
                    country={"in"}
                    value={profileData.phone}
                    onChange={(phone) =>
                      setProfileData((prev) => ({ ...prev, phone }))
                    }
                    inputProps={{
                      name: "phone",
                      required: false,
                      autoFocus: false,
                    }}
                    specialLabel="" // ✅ Removes default label
                    enableSearch={true}
                    searchPlaceholder="Search country"
                    isValid={(value) => {
                      if (!value) return true;
                      return /^\+?[1-9]\d{9,14}$/.test(value);
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "56px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      color: isDark ? "#fff" : "#000",
                      backgroundColor: "transparent",
                      backdropFilter: "blur(12px)",
                      border: `1px solid ${
                        profileData.phone.length > 0 &&
                        !/^\+?[1-9]\d{9,14}$/.test(profileData.phone)
                          ? "red"
                          : isDark
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.23)"
                      }`,
                    }}
                    buttonStyle={{
                      backgroundColor: "transparent",
                      borderRight: isDark
                        ? "1px solid rgba(255,255,255,0.2)"
                        : "1px solid rgba(0,0,0,0.23)",
                    }}
                    dropdownStyle={{
                      backgroundColor: isDark
                        ? "rgba(30, 30, 30, 0.9)"
                        : "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(16px)",
                      color: isDark ? "#fff" : "#000",
                      borderRadius: "8px",
                      overflowY: "auto",
                      maxHeight: "250px",
                      zIndex: 1300,
                      padding: "4px 0",
                    }}
                    searchStyle={{
                      width: "calc(100% - 24px)",
                      margin: "8px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                      backgroundColor: "transparent",
                      color: isDark ? "black" : "#000",
                      border: `1px solid ${
                        isDark ? "black" : "rgba(0,0,0,0.23)"
                      }`,
                    }}
                  />

                  {profileData.phone.length > 0 &&
                    !/^\+?[1-9]\d{9,14}$/.test(profileData.phone) && (
                      <Typography
                        variant="caption"
                        color="error"
                        sx={{ ml: 1, mt: 0.5 }}
                      >
                        Enter a valid phone number
                      </Typography>
                    )}
                </Box>

                <FormControlLabel
                  control={
                    <Switch
                      checked={profileData.phoneVisibility === "public"}
                      onChange={handleTogglePhoneVisibility}
                    />
                  }
                  label="Make Public"
                  sx={{ whiteSpace: "nowrap" }}
                />
              </Stack>

              {/* Extra styles to override react-phone-input-2 dropdown */}
              <style>
                {`
    .country-list .country:hover {
      background-color: ${
        isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"
      } !important;
    }
    .country-list .country.highlight {
      background-color: ${
        isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
      } !important;
    }
    .react-tel-input .form-control {
      background: transparent !important; /* override default white */
    }
  `}
              </style>

              <TextField
                label="Website"
                name="website"
                type="url"
                fullWidth
                value={profileData.website}
                onChange={handleChange}
                inputProps={{ maxLength: MAX_LENGTHS.website }}
                helperText={`${profileData.website.length}/${MAX_LENGTHS.website}`}
              />

              {/* Bio */}
              <TextField
                label="Bio"
                name="bio"
                multiline
                minRows={3}
                fullWidth
                value={profileData.bio}
                onChange={handleChange}
                inputProps={{ maxLength: MAX_LENGTHS.bio }}
                helperText={`${profileData.bio.length}/${MAX_LENGTHS.bio} characters`}
              />

              <GlassButton
                type="submit"
                variant="contained"
                disabled={!profileData.displayName || saving}
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
