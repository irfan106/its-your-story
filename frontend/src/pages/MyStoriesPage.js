import React, { useState } from "react";
import { Box, Typography, Grid, useTheme, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useMyPaginatedBlogs } from "../hooks/useMyPaginatedBlogs";
import ProtectedRoute from "./ProtectedRoute";
import BlogCard from "../components/BlogCard";
import PaginationControls from "../components/PaginationControls";
import Spinner from "../components/Spinner";
import GlassButton from "../components/GlassButton/GlassButton"; // your custom button

const MyStoriesPage = () => {
  const { user } = useAppContext();
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const { blogs, isLoading, currentPage, totalPages, refetchPage } =
    useMyPaginatedBlogs(page, pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetchPage({ page: newPage, pageSize });
  };

  return (
    <ProtectedRoute user={user}>
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
          My Stories
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
          <Stack alignItems="center" spacing={2} sx={{ mt: 4 }}>
            <Typography align="center">
              You haven't published any stories yet.
            </Typography>
            <GlassButton
              variant="contained"
              size="large"
              onClick={() => navigate("/create")}
            >
              Create Your First Story
            </GlassButton>
          </Stack>
        ) : (
          <>
            <Grid container spacing={4}>
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

            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default MyStoriesPage;
