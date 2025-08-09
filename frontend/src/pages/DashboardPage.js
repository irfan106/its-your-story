import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  Stack,
  useTheme,
} from "@mui/material";
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
  const { blogs, isLoading } = useMyPaginatedBlogs(1, 3);
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
    <Box sx={{ px: 3, py: 8 }}>
      {/* Profile Section */}
      <Box
        sx={{
          maxWidth: 700,
          mx: "auto",
          textAlign: "center",
          mb: 6,
        }}
      >
        <Avatar
          src={
            profile.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={profile.displayName}
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            mb: 2,
            border: "3px solid #fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />
        <Typography variant="h5" fontWeight={700}>
          {profile.displayName || "No Name"}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          {profile.email}
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={6}
          sx={{ mt: 2 }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {profile.followers ?? 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Followers
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {profile.following ?? 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Following
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ mb: 6 }} />

      {/* Recent Stories */}
      <Box sx={{ px: { xs: 1, md: 6 } }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 6,
            fontWeight: 700,
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
            <Grid container spacing={3} justifyContent="center">
              {blogs.map((blog) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={blog.id}
                  justifyItems="center"
                >
                  <BlogCard blog={blog} />
                </Grid>
              ))}
            </Grid>

            {/* Show View More button only if blogs > 0 */}
            <Box mt={6} display="flex" justifyContent="center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <GlassButton
                  component={Link}
                  to="/my-stories"
                  variant="contained"
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

export default DashboardPage;
