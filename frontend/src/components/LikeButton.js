import React, { useEffect, useState } from "react";
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";
import { IconButton, Tooltip, Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeButton = ({ blogId, user }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!blogId) return;

    const likesRef = collection(db, "blogs", blogId, "likes");

    // Listener to get total likes
    const unsubscribe = onSnapshot(likesRef, (snapshot) => {
      setLikeCount(snapshot.size);
      const userLike = snapshot.docs.find((doc) => doc.id === user?.uid);
      setLiked(!!userLike);
    });

    return () => unsubscribe();
  }, [blogId, user?.uid]);

  const handleLike = async () => {
    if (!user) return alert("Login to like the post");

    const likeDocRef = doc(db, "blogs", blogId, "likes", user.uid);

    if (liked) {
      await deleteDoc(likeDocRef);
    } else {
      await setDoc(likeDocRef, { timestamp: new Date() });
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Tooltip title={liked ? "Unlike" : "Like"}>
        <IconButton onClick={handleLike} color="error">
          {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
      <Typography>
        {likeCount} {likeCount === 1 ? "like" : "likes"}
      </Typography>
    </Box>
  );
};

export default LikeButton;
