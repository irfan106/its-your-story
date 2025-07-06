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

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 4, sm: 6 },
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            align="center"
            sx={{ fontWeight: 700, color: theme.palette.primary.main }}
          >
            About <span style={{ color: "#333" }}>Its Your Story</span>
          </Typography>

          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Empowering voices, celebrating perspectives.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                🎤 Your Voice, Amplified
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Everyone has a story — a unique voice, a lived experience. "Its
                Your Story" gives you a platform to share it with the world in a
                meaningful and impactful way.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                💡 Discover Ideas
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Explore diverse content across categories like Technology,
                Lifestyle, Politics, and more. Find the stories that inspire,
                challenge, and move you.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                🌐 Built for Connection
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Connect with writers, readers, and thinkers. Share feedback,
                spark conversations, and grow your network with a community that
                values authenticity.
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                ✨ Designed for Ease
              </Typography>
              <Typography variant="body1" color="text.secondary">
                With a simple, intuitive editor, robust tag system, and built-in
                publishing tools, we help you focus on what truly matters —
                telling your story.
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h6"
            align="center"
            sx={{ fontStyle: "italic", color: "text.secondary" }}
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
