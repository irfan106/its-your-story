import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useQuery, gql } from "@apollo/client";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";
import CommentSection from "../components/CommentSection";
import Spinner from "../components/Spinner";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import LikeButton from "../components/LikeButton";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FollowButton from "../components/FollowButton";
import { getRandomDefaultImg } from "../utility/general.utils";

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
  const tags = sidebarData?.blogTags || [];
  const blogs = sidebarData?.mostPopularBlogs || [];

  useEffect(() => {
    if (blog) setActive(null);
  }, [blog, setActive]);

  useEffect(() => {
    const incrementViews = async () => {
      try {
        console.log("Incrementing view for blog:", id);
        const blogRef = doc(db, "blogs", id);
        await updateDoc(blogRef, {
          views: increment(1),
        });
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
            background: blog?.imgUrl ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.6)",
            backdropFilter: blog?.imgUrl ? "blur(6px)" : "blur(10px)",
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

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box sx={{ flex: 3 }}>
          <Box
            sx={{
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

              {user?.uid && blog?.userId && (
                <FollowButton targetUserId={blog.userId} />
              )}
            </Box>

            <LikeButton blogId={id} user={user} />
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <VisibilityIcon fontSize="small" />
              <Typography>{blog?.views || 0} views</Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            />
          </Box>

          <CommentSection blogId={id} user={user} />
        </Box>

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
