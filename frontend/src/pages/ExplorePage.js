import React, { useState } from "react";
import { Box, Grid, Typography, Stack, useTheme } from "@mui/material";
import Spinner from "../components/Spinner";
import { usePaginatedBlogs } from "../hooks/usePaginatedBlogs";
import BlogCard from "../components/BlogCard";
import PaginationControls from "../components/PaginationControls";

const ExplorePage = () => {
  const [page, setPage] = useState(1);
  const { blogs, isLoading, currentPage, totalPages, refetchPage } =
    usePaginatedBlogs(page);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetchPage(newPage);
  };

  return (
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
        Explore All Stories
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
      ) : (
        <>
          <Grid container spacing={4}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
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
  );
};

export default ExplorePage;
