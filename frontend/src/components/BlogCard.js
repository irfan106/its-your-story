import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        overflow: "hidden",
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(255, 255, 255, 0.35)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.08)"
          : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow: isDark
          ? "0 4px 20px rgba(255, 255, 255, 0.04)"
          : "0 8px 30px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: isDark
            ? "0 6px 30px rgba(255, 255, 255, 0.1)"
            : "0 12px 36px rgba(0, 0, 0, 0.15)",
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
        }}
      />

      <CardContent
        sx={{
          flex: 1,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(255, 255, 255, 0.5)",
          borderTop: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <Typography
          variant="overline"
          color={isDark ? "grey.400" : "text.secondary"}
        >
          {blog.category}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
          {excerpt(blog.title, 30)}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          {excerpt(blog.description, 90)}
          <Link
            to={`/detail/${blog.id}`}
            style={{
              fontWeight: 500,
              fontSize: "0.85rem",
              color: isDark ? "#90caf9" : "#1976d2",
              textDecoration: "none",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            Read More
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
