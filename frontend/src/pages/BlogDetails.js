import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useQuery, gql } from "@apollo/client";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Spinner from "../components/Spinner";

// GraphQL queries
const GET_BLOG_DETAIL = gql`
  query GetBlogDetail($id: ID!) {
    blog(id: $id) {
      id
      title
      description
      imgUrl
      author
      timestamp
    }
  }
`;

const GET_SIDEBAR_DATA = gql`
  query GetSidebarData($limit: Int) {
    mostPopularBlogs(limit: $limit) {
      id
      title
      imgUrl
      timestamp
    }
    blogTags
  }
`;

const BlogDetails = () => {
  const { id } = useParams();
  const { setActive } = useAppContext();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const {
    data: blogData,
    loading: blogLoading,
    error: blogError,
  } = useQuery(GET_BLOG_DETAIL, { variables: { id }, skip: !id });

  const {
    data: sidebarData,
    loading: sidebarLoading,
    error: sidebarError,
  } = useQuery(GET_SIDEBAR_DATA, {
    variables: { limit: 5 },
  });

  const blog = blogData?.blog;
  const tags = sidebarData?.blogTags || [];
  const blogs = sidebarData?.mostPopularBlogs || [];

  useEffect(() => {
    if (blog) setActive(null);
  }, [blog]);

  if (blogLoading || sidebarLoading) {
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
  }

  if (blogError || sidebarError) {
    return (
      <Typography color="error" align="center" sx={{ mt: 10 }}>
        Something went wrong. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{ pt: 8, pb: 6, px: { xs: 2, md: 10 } }}>
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          mb: 6,
          backgroundImage: `url('${blog?.imgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 320,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(6px)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            {blog?.title}
          </Typography>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            {new Date(blog?.timestamp).toDateString()}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 3,
            backgroundColor: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.4)",
            borderRadius: 5,
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
            boxShadow: isDark
              ? "0 4px 20px rgba(255,255,255,0.04)"
              : "0 8px 30px rgba(0,0,0,0.1)",
            padding: 4,
          }}
        >
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            By <strong>{blog?.author}</strong> –{" "}
            {new Date(blog?.timestamp).toDateString()}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {blog?.description}
          </Typography>
        </Box>

        {/* Sidebar */}
        <Box sx={{ flex: 1 }}>
          <Tags tags={tags} />
          <Box mt={4}>
            <MostPopular blogs={blogs} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetails;
