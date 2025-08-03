import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  Box,
  Button,
  TextField,
  Typography,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import GlassButton from "./GlassButton/GlassButton";

const CommentSection = ({ blogId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Real-time listener
  useEffect(() => {
    const q = query(
      collection(db, "blogs", blogId, "comments"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      userId: user.uid,
      author: user.displayName,
      content: newComment,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "blogs", blogId, "comments"), comment);
    setNewComment("");
  };

  return (
    <Box mt={6}>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      {user ? (
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            multiline
            minRows={2}
          />
          <GlassButton
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
            disabled={!newComment.trim()}
          >
            Post Comment
          </GlassButton>
        </Box>
      ) : (
        <Typography variant="body2">Login to leave a comment.</Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <List>
        {comments.map((comment) => (
          <ListItem
            key={comment.id}
            sx={{
              mb: 1,
              flexDirection: "column",
              alignItems: "flex-start",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Typography fontWeight={600}>{comment.author}</Typography>
            <Typography variant="body2">{comment.content}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CommentSection;
