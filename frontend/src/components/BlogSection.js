import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import { getRandomDefaultImg } from "../utility/general.utils";
import GlassButton from "./GlassButton/GlassButton";

const BlogSection = ({ blogs }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 700,
          background: isDark
            ? "linear-gradient(to right, #f4f4f5, #e5e7eb)"
            : "linear-gradient(to right, #1f2937, #4b5563)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Exciting Stories
      </Typography>

      {blogs?.map((item) => (
        <Card
          key={item.id}
          sx={{
            mb: 4,
            borderRadius: 5,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
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
              transform: "scale(1.02)",
              boxShadow: isDark
                ? "0 12px 40px rgba(255, 255, 255, 0.05)"
                : "0 12px 40px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: 250 },
              height: 250,
              flexShrink: 0,
              backgroundImage: `url(${item.imgUrl || getRandomDefaultImg()})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <Box sx={{ flex: 1, p: 3 }}>
            <CardContent sx={{ p: 0 }}>
              <Typography
                variant="overline"
                color={isDark ? "grey.400" : "text.secondary"}
              >
                {item.category}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1, mt: 1 }}>
                {item.title}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <strong>{item.author}</strong> —{" "}
                {new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>

              <Typography variant="body2">
                {excerpt(item.description, 150)}{" "}
                <MuiLink
                  component={Link}
                  to={`/detail/${item.id}`}
                  underline="hover"
                  sx={{
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    color: isDark ? "#90caf9" : "#1e40af",
                    ml: 0.5,
                    "&:hover": {
                      textDecoration: "underline",
                      color: isDark ? "#c3dcfa" : "#2563eb",
                    },
                  }}
                >
                  Read more
                </MuiLink>
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}

      <Grid item xs={12}>
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <GlassButton component={Link} to="/explore">
            View More Stories
          </GlassButton>
        </Box>
      </Grid>
    </Box>
  );
};

export default BlogSection;
