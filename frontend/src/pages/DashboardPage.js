import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Stack,
  useTheme,
  IconButton,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import WorkIcon from "@mui/icons-material/Work";
import WcIcon from "@mui/icons-material/Wc";
import PublicIcon from "@mui/icons-material/Public";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import { useAppContext } from "../context/AppContext";
import { useMyPaginatedBlogs } from "../hooks/useMyPaginatedBlogs";
import { useUserProfile } from "../hooks/useUserProfile";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import GlassButton from "../components/GlassButton/GlassButton";
import ProtectedRoute from "./ProtectedRoute";
import parsePhoneNumber from "libphonenumber-js";

const DashboardPage = () => {
  const { user } = useAppContext();
  return (
    <ProtectedRoute user={user}>
      <DashboardContent user={user} />
    </ProtectedRoute>
  );
};

const DashboardContent = ({ user }) => {
  const { blogs, isLoading } = useMyPaginatedBlogs(1, 3);
  const { profile, loading: profileLoading } = useUserProfile(user?.uid);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (profileLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="40vh">
        <Spinner />
      </Stack>
    );
  }

  const photoURL =
    profile.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const skills = toArray(profile.skills);
  const interests = toArray(profile.interests);
  const languages = toArray(profile.languages);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 6 }, py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          mb: 4,
          p: 0,
          background: "transparent",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
          boxShadow: isDark
            ? "0 10px 40px rgba(0,0,0,0.35)"
            : "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Profile Banner */}
        <Box
          sx={{
            position: "relative",
            borderRadius: 3,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            height: { xs: 160, md: 200 },
            background: isDark
              ? "linear-gradient(135deg, #6366f1, #8b5cf6)" // Indigo → Purple for dark
              : "linear-gradient(135deg, #3b82f6, #06b6d4)", // Blue → Cyan for light
            mb: { xs: 10, md: 8 },
            overflow: "visible", // allow avatar to overflow
          }}
        >
          {/* Edit Button */}
          <IconButton
            component={Link}
            to="/edit-profile"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "transparent",
              color: "text.primary",
              border: "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              "&:hover": {
                bgcolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.05)",
              },
              zIndex: 2,
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          {/* Avatar Inside Banner */}
          <Box
            sx={{
              position: "absolute",
              bottom: -60,
              left: { xs: "50%", md: 24 },
              transform: { xs: "translateX(-50%)", md: "none" },
              zIndex: 3, // ensure it’s above other content
            }}
          >
            <Avatar
              src={photoURL}
              alt={profile.displayName || "User Avatar"}
              sx={{
                width: { xs: 140, md: 150 },
                height: { xs: 140, md: 150 },
                border: `4px solid ${isDark ? "#1e293b" : "#fff"}`,
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              }}
            />
          </Box>
        </Box>

        {/* Headline section */}
        <Box
          sx={{
            px: { xs: 2, md: 4 },
            pt: { xs: 6, md: 4 },
            pb: { xs: 2, md: 3 },
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h5" fontWeight={800} noWrap>
            {profile.displayName || "No Name"}
          </Typography>
          {profile.username && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.25 }}
            >
              @{profile.username}
            </Typography>
          )}

          {/* Followers / Following */}
          <Stack
            direction="row"
            spacing={3}
            justifyContent={{ xs: "center", md: "flex-start" }}
            sx={{ mt: 1.5 }}
          >
            <CountPill label="Followers" value={profile.followers || 0} />
            <CountPill label="Following" value={profile.following || 0} />
          </Stack>

          {/* Bio */}
          {profile.bio && (
            <Typography
              variant="body2"
              sx={{
                mt: 1.5,
                maxWidth: 720,
                mx: { xs: "auto", md: 0 },
                lineHeight: 1.6,
              }}
            >
              {profile.bio}
            </Typography>
          )}
        </Box>

        <Divider sx={{ opacity: 0.6 }} />

        {/* Primary meta row */}
        <Box sx={{ px: { xs: 2, md: 4 }, py: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "flex-start" }}
            sx={{ m: 0, rowGap: 1 }}
          >
            {profile.location && (
              <InfoTag
                icon={<LocationOnIcon fontSize="small" />}
                text={profile.location}
              />
            )}
            {profile.pronouns && (
              <InfoTag
                icon={<WcIcon fontSize="small" />}
                text={profile.pronouns}
              />
            )}
            {profile.birthday && (
              <InfoTag
                icon={<CakeIcon fontSize="small" />}
                text={profile.birthday}
              />
            )}
            {profile.phone &&
              profile.phoneVisibility === "public" &&
              (() => {
                try {
                  const phoneNumber = parsePhoneNumber(profile.phone);
                  return (
                    <InfoTag
                      icon={<PhoneIcon fontSize="small" />}
                      text={phoneNumber.formatInternational()} // formats with country code
                    />
                  );
                } catch {
                  // fallback in case parsing fails
                  return (
                    <InfoTag
                      icon={<PhoneIcon fontSize="small" />}
                      text={profile.phone}
                    />
                  );
                }
              })()}

            {profile.email && (
              <InfoTag
                icon={<EmailIcon fontSize="small" />}
                text={profile.email}
              />
            )}
          </Stack>
        </Box>
      </Paper>

      {/* ABOUT + CHIPS (compact, responsive, airy) */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          p: { xs: 2.5, md: 4 },
          mb: 5,
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
          background: "transparent",
        }}
      >
        <Grid container spacing={3}>
          {/* Education + Work Summary */}
          {profile?.education && profile.jobTitle && (
            <Grid item xs={12} md={6}>
              <SectionTitle>Professional Info</SectionTitle>
              <Stack spacing={1.25} sx={{ mt: 1 }}>
                {profile.education && (
                  <LineItem icon={<SchoolIcon />} text={profile.education} />
                )}
                {profile.jobTitle && profile.company && (
                  <LineItem
                    icon={<WorkIcon />}
                    text={`${profile.jobTitle} @ ${profile.company}`}
                  />
                )}
              </Stack>
            </Grid>
          )}

          {/* Socials */}
          <Grid item xs={12} md={6}>
            <SectionTitle>On the Web</SectionTitle>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent={{ xs: "center", md: "flex-start" }}
              sx={{ mt: 1 }}
            >
              {profile.linkedin && (
                <SocialChip
                  icon={<LinkedInIcon />}
                  label="LinkedIn"
                  href={profile.linkedin}
                />
              )}
              {profile.github && (
                <SocialChip
                  icon={<GitHubIcon />}
                  label="GitHub"
                  href={profile.github}
                />
              )}
              {profile.twitter && (
                <SocialChip
                  icon={<TwitterIcon />}
                  label="Twitter"
                  href={profile.twitter}
                />
              )}
              {profile.website && (
                <SocialChip
                  icon={<PublicIcon />}
                  label="Website"
                  href={profile.website}
                />
              )}
            </Stack>
          </Grid>

          {/* Skills / Interests / Languages */}
          {(skills.length || interests.length || languages.length) > 0 && (
            <Grid item xs={12}>
              <SectionTitle>Highlights</SectionTitle>
              <Stack spacing={1.25} sx={{ mt: 1 }}>
                <ChipRow label="Skills" items={skills} />
                <ChipRow label="Interests" items={interests} />
                <ChipRow label="Languages" items={languages} />
              </Stack>
            </Grid>
          )}
        </Grid>
      </Paper>

      {/* RECENT STORIES */}
      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          sx={{
            mb: 3,
            textAlign: { xs: "center", md: "left" },
            background: isDark
              ? "linear-gradient(to right, #f4f4f5, #e5e7eb)"
              : "linear-gradient(to right, #1f2937, #4b5563)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Your Recent Stories
        </Typography>

        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" height="30vh">
            <Spinner />
          </Stack>
        ) : blogs.length === 0 ? (
          <Stack alignItems="center" spacing={2}>
            <Typography align="center" color="text.secondary">
              You haven’t posted any stories yet.
            </Typography>
            <GlassButton component={Link} to="/create" variant="contained">
              Create Your First Story
            </GlassButton>
          </Stack>
        ) : (
          <>
            <Grid container spacing={2}>
              {blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <BlogCard blog={blog} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
            <Box mt={3} display="flex" justifyContent="center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <GlassButton
                  component={Link}
                  to="/my-stories"
                  variant="contained"
                  sx={{ px: 4 }}
                >
                  View More Stories
                </GlassButton>
              </motion.div>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

/* ---------- Helpers & Subcomponents ---------- */

const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val.filter(Boolean);
  if (typeof val === "string")
    return val
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
};

const CountPill = ({ label, value }) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="baseline"
    sx={{
      px: 1.25,
      py: 0.5,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "divider",
    }}
  >
    <Typography variant="body1" fontWeight={800}>
      {value}
    </Typography>
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ letterSpacing: 0.2 }}
    >
      {label}
    </Typography>
  </Stack>
);

const InfoTag = ({ icon, text, asLink = false, href }) => {
  const content = (
    <Stack direction="row" spacing={0.75} alignItems="center" sx={{ m: 0 }}>
      <Box sx={{ display: "flex", alignItems: "center", lineHeight: 0 }}>
        {icon}
      </Box>
      <Typography variant="body2" sx={{ m: 0 }}>
        {text}
      </Typography>
    </Stack>
  );
  return (
    <Box
      component={asLink ? "a" : "div"}
      href={asLink ? href : undefined}
      target={asLink ? "_blank" : undefined}
      rel={asLink ? "noopener noreferrer" : undefined}
      sx={{
        px: 1.2,
        py: 0.6,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {content}
    </Box>
  );
};

const SectionTitle = ({ children }) => (
  <Typography variant="subtitle1" fontWeight={800} sx={{ letterSpacing: 0.2 }}>
    {children}
  </Typography>
);

const LineItem = ({ icon, text }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>
    <Typography variant="body2">{text}</Typography>
  </Stack>
);

const SocialChip = ({ icon, label, href }) => (
  <Chip
    icon={icon}
    label={label}
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    clickable
    variant="outlined"
    sx={{ px: 0.5 }}
  />
);

const ChipRow = ({ label, items }) => {
  if (!items || !items.length) return null;
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start" flexWrap="wrap">
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ minWidth: 84, pt: 0.5 }}
      >
        {label}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {items.map((item, idx) => (
          <Chip key={`${label}-${idx}`} label={item} size="small" />
        ))}
      </Stack>
    </Stack>
  );
};

export default DashboardPage;
