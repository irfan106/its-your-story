import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        pt: 6,
        pb: 4,
        px: 2,
        background: isDark
          ? "linear-gradient(135deg, #0e0e0e, #1a1a1a)"
          : "linear-gradient(135deg, #fafafa, #e5e5e5)",
        color: isDark ? "#e0e0e0" : "#1a1a1a",
        borderTop: `1px solid ${isDark ? "#2a2a2a" : "#d4d4d4"}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Section: Brand Description */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Tell Your Story
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDark ? "#a3a3a3" : "#4b4b4b",
                lineHeight: 1.7,
              }}
            >
              Everyone has a voice. Share your unique ideas, thoughts, and
              experiences with the world through storytelling.
            </Typography>
          </Grid>

          {/* Section: Quick Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {["Home", "Explore", "About", "Contact"].map((text) => (
                <Link
                  key={text}
                  href={`/${text.toLowerCase()}`}
                  underline="none"
                  sx={{
                    fontSize: "0.95rem",
                    color: isDark ? "#d4d4d4" : "#2a2a2a",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: isDark ? "#ffffff" : "#000000",
                      pl: 0.5,
                    },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Section: Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Connect With Us
            </Typography>
            <Stack spacing={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon
                  sx={{ fontSize: 20, color: isDark ? "#9ca3af" : "#525252" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#a3a3a3" : "#4b4b4b" }}
                >
                  info@yourstory.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon
                  sx={{ fontSize: 20, color: isDark ? "#9ca3af" : "#525252" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#a3a3a3" : "#4b4b4b" }}
                >
                  Worldwide 🌍
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box mt={6} textAlign="center">
          <Typography
            variant="caption"
            sx={{ color: isDark ? "#7d7d7d" : "#6b6b6b" }}
          >
            © {new Date().getFullYear()} Tell Your Story. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
