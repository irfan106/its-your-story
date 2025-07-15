import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";

const About = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8 },
        px: 2,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            background: isDark
              ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))"
              : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,240,240,0.85))",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: isDark
              ? "0 0 20px rgba(255, 255, 255, 0.05)"
              : "0 0 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              background: isDark
                ? "linear-gradient(to right, #e5e5e5, #cbd5e1)"
                : "linear-gradient(to right, #1a1a1a, #4b4b4b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About <span style={{ fontWeight: 300 }}>It's Your Story</span>
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              color: isDark ? "#9ca3af" : "#4b4b4b",
              mb: 4,
            }}
          >
            Empowering voices. Celebrating every perspective.
          </Typography>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={4}>
            {[
              {
                title: "🎤 Your Voice, Amplified",
                text: `Everyone has a story — a unique voice, a lived experience. "It's Your Story" gives you a platform to share it with the world in a meaningful and impactful way.`,
              },
              {
                title: "💡 Discover Ideas",
                text: `Explore diverse content across categories like Technology, Lifestyle, Politics, and more. Find the stories that inspire, challenge, and move you.`,
              },
              {
                title: "🌐 Built for Connection",
                text: `Connect with writers, readers, and thinkers. Share feedback, spark conversations, and grow your network with a community that values authenticity.`,
              },
              {
                title: "✨ Designed for Ease",
                text: `With a simple, intuitive editor, robust tag system, and built-in publishing tools, we help you focus on what truly matters — telling your story.`,
              },
            ].map((item, i) => (
              <Grid key={i} item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: isDark ? "#f1f5f9" : "#1f2937",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? "#cbd5e1" : "#4a4a4a",
                    lineHeight: 1.6,
                  }}
                >
                  {item.text}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 5 }} />

          <Typography
            variant="h6"
            align="center"
            sx={{
              fontStyle: "italic",
              color: isDark ? "#a1a1aa" : "#555",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            “Your voice matters. Your experience is valid. Your story deserves
            to be heard.”
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default About;
