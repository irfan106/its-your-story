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
  TextField,
  Typography,
  Divider,
  List,
  ListItem,
  Button,
  Modal,
  IconButton,
  Stack,
} from "@mui/material";
import GlassButton from "./GlassButton/GlassButton";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MAX_COMMENT_LENGTH = 500;
const DEFAULT_VISIBLE_COMMENTS = 5;

const CommentSection = ({ blogId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Real-time listener - most recent comments first
  useEffect(() => {
    const q = query(
      collection(db, "blogs", blogId, "comments"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [blogId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || newComment.length > MAX_COMMENT_LENGTH) return;

    setLoading(true);
    try {
      const comment = {
        userId: user.uid,
        author: user.displayName,
        content: newComment.trim(),
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, "blogs", blogId, "comments"), comment);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
    setLoading(false);
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  // Show newest comments first, limit to DEFAULT_VISIBLE_COMMENTS by default
  const visibleComments = comments.slice(0, DEFAULT_VISIBLE_COMMENTS);

  return (
    <Box mt={6}>
      <Typography variant="h6" gutterBottom>
        Comments ({comments.length})
      </Typography>

      {user ? (
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder={`Write a comment (max ${MAX_COMMENT_LENGTH} chars)...`}
            value={newComment}
            onChange={(e) => {
              if (e.target.value.length <= MAX_COMMENT_LENGTH)
                setNewComment(e.target.value);
            }}
            multiline
            minRows={2}
            helperText={`${newComment.length}/${MAX_COMMENT_LENGTH}`}
          />
          <GlassButton
            type="submit"
            variant="contained"
            sx={{ mt: 1 }}
            disabled={!newComment.trim() || loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </GlassButton>
        </Box>
      ) : (
        <Typography variant="body2">Login to leave a comment.</Typography>
      )}

      <Divider sx={{ my: 2 }} />

      <List>
        {visibleComments.length === 0 ? (
          <Typography variant="body2" color="text.secondary" align="center">
            No comments yet. Be the first to comment!
          </Typography>
        ) : (
          visibleComments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                mb: 2,
                flexDirection: "column",
                alignItems: "flex-start",
                borderBottom: "1px solid #ccc",
                pb: 1,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                width="100%"
                alignItems="center"
                mb={0.5}
              >
                <Typography fontWeight={600}>{comment.author}</Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  {comment.timestamp
                    ? dayjs(comment.timestamp.toDate()).fromNow()
                    : "just now"}
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                {comment.content}
              </Typography>
            </ListItem>
          ))
        )}
      </List>

      {comments.length > DEFAULT_VISIBLE_COMMENTS && (
        <Button onClick={handleOpenModal} variant="text">
          View More Comments ({comments.length})
        </Button>
      )}

      {/* Modal for all comments */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 },
            maxHeight: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Fixed header */}
          <Box
            sx={{
              px: 3,
              py: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h6">
              All Comments ({comments.length})
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Scrollable comment list */}
          <Box
            sx={{
              overflowY: "auto",
              p: 3,
              maxHeight: "calc(80vh - 64px)", // approx header height
            }}
          >
            <List>
              {comments.map((comment) => (
                <ListItem
                  key={comment.id}
                  sx={{
                    mb: 2,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    borderBottom: "1px solid #ccc",
                    pb: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                    alignItems="center"
                    mb={0.5}
                  >
                    <Typography fontWeight={600}>{comment.author}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      {comment.timestamp
                        ? dayjs(comment.timestamp.toDate()).fromNow()
                        : "just now"}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                    {comment.content}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CommentSection;
