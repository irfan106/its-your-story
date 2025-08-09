import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useQuery, gql } from "@apollo/client";
import MostPopular from "../components/MostPopular";
import CommentSection from "../components/CommentSection";
import Spinner from "../components/Spinner";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import LikeButton from "../components/LikeButton";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FollowButton from "../components/FollowButton";
import { getRandomDefaultImg } from "../utility/general.utils";
import GlassButton from "../components/GlassButton/GlassButton";
import Categories from "../components/Categories";

const GET_BLOG_DETAIL = gql`
  query GetBlogDetail($id: ID!) {
    blog(id: $id) {
      id
      title
      description
      imgUrl
      author
      userId
      timestamp
      views
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
  const { user, setActive } = useAppContext();
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
  } = useQuery(GET_SIDEBAR_DATA, { variables: { limit: 5 } });

  const blog = blogData?.blog;
  const blogs = sidebarData?.mostPopularBlogs || [];

  useEffect(() => {
    if (blog) setActive(null);
  }, [blog, setActive]);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const blogRef = doc(db, "blogs", id);
        await updateDoc(blogRef, { views: increment(1) });
      } catch (err) {
        console.error("Error incrementing views", err);
      }
    };

    if (id) incrementViews();
  }, [id]);

  if (blogLoading || sidebarLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" height="40vh" mt={4}>
        <Spinner />
      </Stack>
    );
  }

  if (blogError || sidebarError) {
    return (
      <Typography color="error" align="center" mt={10}>
        Something went wrong. Please try again later.
      </Typography>
    );
  }

  return (
    <Box pt={8} pb={6} px={{ xs: 2, md: 10 }}>
      {/* 🖼 Header Image + Title */}
      <Box
        sx={{
          position: "relative",
          borderRadius: 4,
          overflow: "hidden",
          mb: 6,
          backgroundImage: `url('${blog?.imgUrl || getRandomDefaultImg()}')`,
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
            background: "rgba(0,0,0,0.4)",
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
          <Typography variant="subtitle2" mt={1}>
            {new Date(blog?.timestamp).toDateString()}
          </Typography>
        </Box>
      </Box>

      {/* 📄 Blog Content + Sidebar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* ✏️ Blog Main */}
        <Box sx={{ flex: 3 }}>
          <Box
            sx={{
              backgroundColor: "transparent",
              borderRadius: 5,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
              boxShadow: isDark
                ? "0 4px 20px rgba(255,255,255,0.04)"
                : "0 8px 24px rgba(0,0,0,0.1)",
              padding: { xs: 3, md: 4 },
              mb: 6,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <Typography variant="subtitle1" color="text.secondary">
                By <strong>{blog?.author}</strong>
              </Typography>
              {user?.uid === blog?.userId && (
                <Box display="flex" justifyContent="flex-end" mb={2}>
                  <GlassButton
                    variant="contained"
                    component={Link}
                    to={`/edit/${blog?.id}`}
                  >
                    Edit Blog
                  </GlassButton>
                </Box>
              )}
              {user?.uid && blog?.userId && (
                <FollowButton targetUserId={blog.userId} />
              )}
            </Box>

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={2}
              py={1}
              mt={2}
              mb={3}
              borderRadius={2}
              sx={{
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.03)",
                border: isDark
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0,0,0,0.05)",
              }}
            >
              <LikeButton blogId={id} user={user} />

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                color="text.secondary"
              >
                <VisibilityIcon fontSize="small" />
                <Typography variant="body2">
                  {blog?.views?.toLocaleString() || 0} views
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                lineHeight: 1.7,
                fontSize: "1.1rem",
                color: isDark ? "#ddd" : "#333",
                maxWidth: "100%",
                mb: 3,
              }}
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />
          </Box>

          <CommentSection blogId={id} user={user} />
        </Box>

        {/* 🔍 Sidebar */}
        <Box sx={{ flex: 1 }}>
          <Categories />
          <Box mt={4}>
            <MostPopular blogs={blogs} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogDetails;
