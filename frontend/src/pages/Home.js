import React, { useEffect } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import BlogSection from "../components/BlogSection";
import Spinner from "../components/Spinner";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Trending from "../components/Trending";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useBlogs } from "../hooks/useBlogs";
import { useTrendingBlogs } from "../hooks/useTrendingBlogs";
import { usePopularBlogs } from "../hooks/usePopularBlogs";
import { useTags } from "../hooks/useTags";
import { useAppContext } from "../context/AppContext";

const Home = () => {
  const { setActive, user } = useAppContext();

  const { data: blogs = [], isLoading: loadingBlogs } = useBlogs({
    latestOnly: true,
    limit: 6,
  });

  const { data: trendBlogs = [], isLoading: loadingTrending } =
    useTrendingBlogs(10);

  const { data: popularBlogs = [], isLoading: loadingPopular } =
    usePopularBlogs(5);

  const { tags = [], isLoading: loadingTags } = useTags();

  useEffect(() => {
    setActive("home");
  }, [setActive]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Story deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete blog");
      }
    }
  };

  if (loadingBlogs || loadingTrending || loadingPopular || loadingTags) {
    return (
      <Stack
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Spinner />
      </Stack>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Trending blogs={trendBlogs} />
          </Grid>

          <Grid item xs={12} md={8}>
            <BlogSection
              blogs={blogs}
              user={user}
              handleDelete={handleDelete}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Tags tags={tags} />
            <MostPopular blogs={popularBlogs} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
