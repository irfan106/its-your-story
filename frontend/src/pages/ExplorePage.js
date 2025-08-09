import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  useTheme,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  useMediaQuery,
} from "@mui/material";
import Spinner from "../components/Spinner";
import BlogCard from "../components/BlogCard";
import PaginationControls from "../components/PaginationControls";
import { usePaginatedBlogs } from "../hooks/usePaginatedBlogs";

const categories = [
  "Tech",
  "Travel",
  "Lifestyle",
  "Finance",
  "Food",
  "Fiction",
  "Personal Growth",
  "Startups",
  "Culture",
  "Productivity",
  "Relationships",
  "Mental Health",
  "Books & Reviews",
  "College Life",
  "Design & UX",
];

const ExplorePage = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedAuthor, setDebouncedAuthor] = useState("");

  const [sortOrder, setSortOrder] = useState("desc");

  const pageSize = 6;

  const { blogs, isLoading, currentPage, totalPages, fetchBlogs } =
    usePaginatedBlogs();

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Debounce author
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAuthor(author);
    }, 500);
    return () => clearTimeout(handler);
  }, [author]);

  // Fetch after debounce
  useEffect(() => {
    fetchBlogs({
      variables: {
        page,
        pageSize,
        category,
        author: debouncedAuthor,
        search: debouncedSearch,
        sortOrder,
      },
    });
  }, [page, category, debouncedAuthor, debouncedSearch, sortOrder]);

  // Handlers that reset page to 1 when filters change
  const handleCategoryClick = (cat) => {
    setCategory(category === cat ? "" : cat);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const getSelectedChipStyle = () => ({
    background: isDark
      ? "linear-gradient(135deg, #6366f1, #8b5cf6)" // Indigo → Purple for dark
      : "linear-gradient(135deg, #3b82f6, #06b6d4)", // Blue → Cyan for light
    color: "#fff",
    fontWeight: 600,
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
  });

  const getUnselectedChipStyle = () => ({
    backgroundColor: isDark
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(0, 0, 0, 0.05)",
    color: isDark ? "#e5e7eb" : "#374151",
    backdropFilter: "blur(8px)",
    border: `1px solid ${
      isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"
    }`,
    fontWeight: 500,
    "&:hover": {
      backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
    },
  });

  return (
    <Box sx={{ py: 6, px: { xs: 2, md: 10 } }}>
      {/* Title */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 4,
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

      {/* Category Chips */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1}
        justifyContent="center"
        mb={3}
      >
        <Chip
          label="All Categories"
          clickable
          onClick={() => handleCategoryClick("")}
          sx={
            category === "" ? getSelectedChipStyle() : getUnselectedChipStyle()
          }
        />
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            onClick={() => handleCategoryClick(cat)}
            sx={
              category === cat
                ? getSelectedChipStyle()
                : getUnselectedChipStyle()
            }
          />
        ))}
      </Stack>

      {/* Inline Search & Filters */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        mb={4}
        alignItems="stretch"
      >
        <TextField
          label="Search by Story Title"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
        />
        <TextField
          label="Filter by Author Name"
          variant="outlined"
          value={author}
          onChange={handleAuthorChange}
          fullWidth
        />
        <FormControl fullWidth={isMobile} sx={{ minWidth: 150 }}>
          <InputLabel>Sort Stories</InputLabel>
          <Select value={sortOrder} onChange={handleSortChange}>
            <MenuItem value="desc">Newest First</MenuItem>
            <MenuItem value="asc">Oldest First</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {/* Results */}
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
        <Stack
          alignItems="center"
          justifyContent="center"
          height="40vh"
          sx={{ mt: 4 }}
        >
          <Typography variant="h6" color="text.secondary" align="center">
            No stories found. Try changing your search or filters.
          </Typography>
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

          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default ExplorePage;
