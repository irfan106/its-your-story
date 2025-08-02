import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
  Divider,
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

const DashboardPage = () => {
  const { user } = useAppContext();
  const { blogs, isLoading } = useMyPaginatedBlogs(1, 2);
  const { profile, loading: profileLoading } = useUserProfile(user?.uid);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  if (!user || profileLoading)
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
    <Box sx={{ p: 4, minHeight: "100vh" }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          maxWidth: 600,
          mx: "auto",
          borderRadius: 4,
          textAlign: "center",
          background: isDark
            ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))"
            : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,240,240,0.85))",
        }}
      >
        <Avatar
          src={
            profile.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={profile.displayName}
          sx={{ width: 100, height: 100, mx: "auto", mb: 2 }}
        />
        <Typography variant="h5" fontWeight={600}>
          {profile.displayName || "No Name"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.email}
        </Typography>

        <Stack direction="row" justifyContent="center" spacing={4} mt={2}>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {profile.followers ?? 0}
            </Typography>
            <Typography variant="caption">Followers</Typography>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {profile.following ?? 0}
            </Typography>
            <Typography variant="caption">Following</Typography>
          </Box>
        </Stack>
      </Paper>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ py: 6, px: { xs: 2, md: 10 } }}>
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
            height="40vh"
            sx={{ mt: 4 }}
          >
            <Spinner />
          </Stack>
        ) : blogs.length === 0 ? (
          <Typography align="center">
            You haven't posted any stories yet.
          </Typography>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
        )}

        <Box mt={4} display="flex" justifyContent="center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              component={Link}
              to="/my-stories"
              sx={{
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 99,
                textTransform: "none",
                background: "linear-gradient(45deg, #2196f3, #21cbf3)",
                boxShadow: "0 8px 20px rgba(33, 203, 243, 0.25)",
              }}
            >
              {"View More Stories"}
            </Button>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
