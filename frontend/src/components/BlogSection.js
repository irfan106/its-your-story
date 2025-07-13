import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";

const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>
        Exciting Stories
      </Typography>

      {blogs?.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            mb: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <CardMedia
            component="img"
            image={item.imgUrl}
            alt={item.title}
            sx={{
              width: { xs: "100%", md: 300 },
              height: 200,
              objectFit: "cover",
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <CardContent>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                {item.category}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1 }}>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                <strong>{item.author}</strong> —{" "}
                {new Date(item.timestamp).toDateString()}
              </Typography>

              <Typography variant="body2" sx={{ mb: 2 }}>
                {excerpt(item.description, 120)}
              </Typography>

              <Button
                component={Link}
                to={`/detail/${item.id}`}
                variant="contained"
                color="primary"
              >
                Read More
              </Button>

              {userId && item.userId === userId && (
                <Box sx={{ float: "right" }}>
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    aria-label="delete"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/update/${item.id}`}
                    aria-label="edit"
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                </Box>
              )}
            </CardContent>
          </Box>
        </Card>
      ))}
      <Grid item xs={12}>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/explore"
          >
            View More Stories
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default BlogSection;
