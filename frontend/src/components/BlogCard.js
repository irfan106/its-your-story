import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { getRandomDefaultImg } from "../utility/general.utils";

const BlogCard = ({ blog }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Card
      sx={{
        height: "90%",
        width: "95%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: "transparent",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: isDark
          ? "0 8px 32px rgba(0,0,0,0.25)"
          : "0 8px 32px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: isDark
            ? "0 12px 40px rgba(255, 255, 255, 0.05)"
            : "0 12px 40px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <CardMedia
        component="div"
        sx={{
          height: 200,
          backgroundImage: `url(${blog.imgUrl || getRandomDefaultImg()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <CardContent sx={{ flex: 1, p: 3 }}>
        <Typography
          variant="overline"
          color={isDark ? "grey.400" : "text.secondary"}
        >
          {blog.category}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mt: 1,
            mb: 1,
            fontWeight: 600,
            color: isDark ? "#fff" : "#1f2937",
          }}
        >
          {excerpt(blog.title, 20)}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          <strong>{blog?.author}</strong> —{" "}
          {new Date(blog.timestamp).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Typography>

        <Typography variant="body2">
          {excerpt(blog.description, 50)}{" "}
          <MuiLink
            component={Link}
            to={`/detail/${blog.id}`}
            underline="hover"
            sx={{
              fontWeight: 500,
              fontSize: "0.85rem",
              color: isDark ? "#90caf9" : "#1976d2",
              ml: 0.5,
              "&:hover": {
                textDecoration: "underline",
                color: isDark ? "#c3dcfa" : "#2563eb",
              },
            }}
          >
            Read More
          </MuiLink>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
