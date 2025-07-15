import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import { useMyPaginatedBlogs } from "../hooks/useMyPaginatedBlogs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProtectedRoute from "./ProtectedRoute";

const MotionCard = motion(Card);

const MyStoriesPage = () => {
  const { user } = useAppContext();
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const { blogs, isLoading, currentPage, totalPages, refetchPage, error } =
    useMyPaginatedBlogs(page, pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    refetchPage({ page: newPage, pageSize });
  };

  return (
    <ProtectedRoute user={user}>
      <Box sx={{ p: 4, backdropFilter: "blur(12px)", minHeight: "100vh" }}>
        <Typography variant="h4" sx={{ mb: 4 }} align="center">
          My Stories
        </Typography>

        {isLoading ? (
          <Typography align="center">Loading...</Typography>
        ) : blogs.length === 0 ? (
          <Typography align="center">
            You haven't published any stories yet.
          </Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog.id}>
                  <MotionCard
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.08)",
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={blog.imgUrl}
                      alt={blog.title}
                      sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                    />
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        {blog.category}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {blog.title.length > 40
                          ? blog.title.slice(0, 37) + "..."
                          : blog.title}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {blog.description.length > 100
                          ? blog.description.slice(0, 97) + "..."
                          : blog.description}
                      </Typography>
                      <Button
                        component={Link}
                        to={`/detail/${blog.id}`}
                        variant="outlined"
                        size="small"
                        sx={{ mt: 1 }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </MotionCard>
                </Grid>
              ))}
            </Grid>

            <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "contained" : "outlined"}
                  onClick={() => handlePageChange(index + 1)}
                  sx={{ mx: 0.5 }}
                >
                  {index + 1}
                </Button>
              ))}
            </Stack>
          </>
        )}
      </Box>
    </ProtectedRoute>
  );
};

export default MyStoriesPage;
