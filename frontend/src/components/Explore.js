import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import Spinner from "./Spinner";
import { usePaginatedBlogsByPage } from "../hooks/usePaginatedBlogs";

const Explore = () => {
  const { blogs, isLoading, fetchPage, currentPage, totalPages } =
    usePaginatedBlogsByPage();

  return (
    <Box sx={{ py: 4, px: 10 }}>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        Explore All Stories
      </Typography>

      {isLoading ? (
        <Stack alignItems="center" justifyContent="center" sx={{ mt: 4 }}>
          <Spinner />
        </Stack>
      ) : (
        <>
          <Grid container spacing={4}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={4} key={blog.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="180"
                    image={blog.imgUrl}
                    alt={blog.title}
                  />
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {blog.category}
                    </Typography>
                    <Typography variant="h6">
                      {excerpt(blog.title, 30)}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {excerpt(blog.description, 100)}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/detail/${blog.id}`}
                      variant="outlined"
                      size="small"
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                onClick={() => fetchPage(index + 1)}
                sx={{ mx: 0.5 }}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Explore;
