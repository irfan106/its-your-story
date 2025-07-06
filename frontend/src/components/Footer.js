import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  useTheme,
} from "@mui/material";

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 6,
        px: 2,
        backgroundColor: isDark ? "#0f172a" : "#f9fafb",
        color: isDark ? "#f1f5f9" : "#1f2937",
        borderTop: `1px solid ${isDark ? "#1e293b" : theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Tell Your Story
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDark ? "#94a3b8" : "#4b5563" }}
            >
              It's your story, so tell everyone! Share your ideas, thoughts, and
              experiences with the world.
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Box>
              {["Home", "Explore", "About", "Contact"].map((text) => (
                <Link
                  key={text}
                  href={`/${text.toLowerCase()}`}
                  underline="hover"
                  color={isDark ? "#cbd5e1" : "inherit"}
                  display="block"
                  sx={{
                    my: 0.5,
                    transition: "color 0.3s",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Connect
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: isDark ? "#94a3b8" : "#4b5563" }}
            >
              Email: info@yourstory.com
              <br />
              Location: Worldwide 🌍
            </Typography>
          </Grid>
        </Grid>

        <Box mt={5} textAlign="center">
          <Typography
            variant="body2"
            sx={{ color: isDark ? "#64748b" : "#6b7280" }}
          >
            © {new Date().getFullYear()} Tell Your Story. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
