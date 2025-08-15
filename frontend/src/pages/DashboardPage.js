import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Stack,
  useTheme,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAppContext } from "../context/AppContext";
import { useMyPaginatedBlogs } from "../hooks/useMyPaginatedBlogs";
import { useUserProfile } from "../hooks/useUserProfile";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";
import GlassButton from "../components/GlassButton/GlassButton";
import ProtectedRoute from "./ProtectedRoute";

const DashboardPage = () => {
  const { user } = useAppContext();

  return (
    <ProtectedRoute user={user}>
      <DashboardContent user={user} />
    </ProtectedRoute>
  );
};

const DashboardContent = ({ user }) => {
  const { blogs, isLoading } = useMyPaginatedBlogs(1, 2);
  const { profile, loading: profileLoading } = useUserProfile(user?.uid);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (profileLoading)
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        height="40vh"
        sx={{ mt: 4 }}
      >
        <Spinner />
      </Stack>
    );

  return (
    <Box
      sx={{
        px: { xs: 2, md: 6 },
        py: 8,
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Grid container spacing={6}>
        {/* Glassy Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 3,
              textAlign: "center",
              position: "relative",
              borderRadius: 4,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              background: "transparent",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: isDark
                ? "0 0 20px rgba(255, 255, 255, 0.05)"
                : "0 0 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Box sx={{ position: "relative", display: "inline-block", mb: 3 }}>
              <Avatar
                src={
                  profile.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={profile.displayName || "User Avatar"}
                sx={{
                  width: 130,
                  height: 130,
                  border: `4px solid ${
                    isDark
                      ? "rgba(255, 255, 255, 0.6)"
                      : "rgba(255, 255, 255, 0.9)"
                  }`,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />

              {/* Edit Button on Avatar */}
              <Tooltip title="Edit Profile" arrow>
                <IconButton
                  component={Link}
                  to="/edit-profile"
                  size="small"
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
                    "&:hover": {
                      bgcolor: isDark
                        ? "rgba(255, 255, 255, 0.6)"
                        : "rgba(255, 255, 255, 1)",
                      transform: "scale(1.2)",
                      transition: "all 0.3s ease",
                    },
                  }}
                  aria-label="edit profile"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="h5" fontWeight={700} mb={0.5} noWrap>
              {profile.displayName || "No Name"}
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={1} noWrap>
              {profile.email}
            </Typography>

            {profile.bio && (
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{ px: 2 }}
              >
                {profile.bio}
              </Typography>
            )}

            {profile.phone && (
              <Typography variant="body2" color="text.secondary" mb={1}>
                Phone:{" "}
                {profile.phoneVisibility === "public"
                  ? profile.phone
                  : "Private"}
              </Typography>
            )}

            {profile.website && (
              <Typography
                variant="body2"
                mb={3}
                sx={{ wordWrap: "break-word" }}
              >
                Website:{" "}
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "underline",
                    wordBreak: "break-word",
                  }}
                >
                  {profile.website}
                </a>
              </Typography>
            )}

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={6}
              mb={0}
            >
              <Box textAlign="center" minWidth={80}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={isDark ? "#eee" : "#111"}
                >
                  {profile.followers ?? 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Followers
                </Typography>
              </Box>

              <Box textAlign="center" minWidth={80}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color={isDark ? "#eee" : "#111"}
                >
                  {profile.following ?? 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Following
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Stories Section */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            sx={{
              mb: 6,
              fontWeight: 700,
              background: isDark
                ? "linear-gradient(to right, #f4f4f5, #e5e7eb)"
                : "linear-gradient(to right, #1f2937, #4b5563)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Your Recent Stories
          </Typography>

          {isLoading ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              height="30vh"
              sx={{ mt: 4 }}
            >
              <Spinner />
            </Stack>
          ) : blogs.length === 0 ? (
            <Stack alignItems="center" spacing={2} sx={{ mt: 4 }}>
              <Typography align="center" color="text.secondary">
                You haven’t posted any stories yet.
              </Typography>
              <GlassButton component={Link} to="/create" variant="contained">
                Create Your First Story
              </GlassButton>
            </Stack>
          ) : (
            <>
              <Grid container spacing={3}>
                {blogs.map((blog) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={blog.id}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <BlogCard blog={blog} />
                  </Grid>
                ))}
              </Grid>

              <Box mt={4} display="flex" justifyContent="center">
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
