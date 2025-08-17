import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Divider,
  Paper,
  Button,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GlassButton from "../components/GlassButton/GlassButton";

const AboutPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

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
            background: "transparent",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: isDark
              ? "0 0 20px rgba(255, 255, 255, 0.05)"
              : "0 0 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          {/* Title */}
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

          {/* Mission */}
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              color: isDark ? "#9ca3af" : "#4b4b4b",
              mb: 4,
              maxWidth: "700px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            <strong>Our mission</strong> is simple: to give everyone a space to
            express themselves. <em>It's Your Story</em> is a platform where
            writers, thinkers, and everyday people can publish their voices,
            connect with others, and build communities around meaningful
            conversations.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* How It Works */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mb: 6 }}>
            {[
              {
                step: "✍️ Write",
                desc: "Use our distraction-free editor to share your story, idea, or opinion. Add tags and images to bring it to life.",
              },
              {
                step: "🌍 Share",
                desc: "Publish your story instantly. Choose to share it publicly, or keep it within your circle.",
              },
              {
                step: "💬 Engage",
                desc: "Readers can comment, react, and follow. Every story can spark a conversation.",
              },
              {
                step: "🚀 Grow",
                desc: "Build your profile, expand your reach, and connect with a growing network of curious minds.",
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
                  {item.step}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDark ? "#cbd5e1" : "#4a4a4a",
                    lineHeight: 1.6,
                  }}
                >
                  {item.desc}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Features */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}
          >
            Why You'll Love It
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "⚡ Powerful Editor",
                text: "Write without distractions. Format text, add images, and publish seamlessly.",
              },
              {
                title: "🔎 Personalized Discovery",
                text: "Our tag system and recommendations help you find stories that matter to you.",
              },
              {
                title: "🤝 Community First",
                text: "Follow writers, join discussions, and collaborate across diverse topics.",
              },
              {
                title: "🔒 Privacy & Control",
                text: "You decide who sees your story. Keep it private, share with friends, or go public.",
              },
              {
                title: "📈 Grow as a Creator",
                text: "Build your profile, showcase your work, and grow an audience that values your voice.",
              },
              {
                title: "🌍 Global, Inclusive",
                text: "From everyday experiences to big ideas, every voice is welcome here.",
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

          {/* Values */}
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}
          >
            Our Values
          </Typography>
          <Typography
            align="center"
            sx={{
              color: isDark ? "#d1d5db" : "#333",
              maxWidth: "700px",
              mx: "auto",
              mb: 5,
              lineHeight: 1.7,
            }}
          >
            We believe in <strong>authenticity</strong>,{" "}
            <strong>inclusivity</strong>, and <strong>respect</strong>. Every
            person has a story worth telling. This is a safe space for diverse
            perspectives, civil discussions, and meaningful connections.
          </Typography>

          {/* Closing & CTA */}
          <Typography
            variant="h6"
            align="center"
            sx={{
              fontStyle: "italic",
              color: isDark ? "#a1a1aa" : "#555",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.7,
              mb: 4,
            }}
          >
            “Your voice matters. Your experience is valid. Your story deserves
            to be heard.”
          </Typography>

          <Box display="flex" justifyContent="center">
            <GlassButton
              variant="contained"
              size="large"
              onClick={() => navigate("/create")}
            >
              Start Writing Your Story
            </GlassButton>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutPage;
