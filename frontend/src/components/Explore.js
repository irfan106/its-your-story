import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import Spinner from "./Spinner";
import { usePaginatedBlogs } from "../hooks/usePaginatedBlogs";

const Explore = () => {
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
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 5,
                    overflow: "hidden",
                    backgroundColor: isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.35)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.08)"
                      : "1px solid rgba(0, 0, 0, 0.08)",
                    boxShadow: isDark
                      ? "0 4px 20px rgba(255, 255, 255, 0.04)"
                      : "0 8px 30px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: isDark
                        ? "0 6px 30px rgba(255, 255, 255, 0.1)"
                        : "0 12px 36px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.imgUrl}
                    alt={blog.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography
                      variant="overline"
                      color={isDark ? "grey.400" : "text.secondary"}
                    >
                      {blog.category}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                      {excerpt(blog.title, 30)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1.5 }}
                    >
                      {excerpt(blog.description, 90)}{" "}
                      <Link
                        to={`/detail/${blog.id}`}
                        style={{
                          fontWeight: 500,
                          fontSize: "0.85rem",
                          color: isDark ? "#90caf9" : "#1976d2",
                          textDecoration: "none",
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.textDecoration = "underline")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.textDecoration = "none")
                        }
                      >
                        Read More
                      </Link>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Buttons */}
          <Box sx={{ textAlign: "center", mt: 6 }}>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                variant={currentPage === index + 1 ? "contained" : "outlined"}
                sx={{
                  mx: 0.6,
                  textTransform: "none",
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  fontWeight: 500,
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  backgroundColor:
                    currentPage === index + 1
                      ? isDark
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(0,0,0,0.1)"
                      : "transparent",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(0,0,0,0.15)",
                  color: isDark ? "#fff" : "#111827",
                  "&:hover": {
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(0,0,0,0.08)",
                    boxShadow: isDark
                      ? "0 0 8px rgba(255,255,255,0.1)"
                      : "0 4px 12px rgba(0,0,0,0.12)",
                  },
                }}
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
