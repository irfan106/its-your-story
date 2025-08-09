import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  useTheme,
  IconButton,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link as RouterLink } from "react-router-dom";

// GlassButton example style, adjust as per your GlassButton component or style
const GlassButton = (props) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Button
      {...props}
      sx={{
        bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.3)",
        color: isDark ? "#e0e0e0" : "#111",
        borderRadius: "12px",
        backdropFilter: "blur(10px)",
        border: isDark
          ? "1px solid rgba(255, 255, 255, 0.2)"
          : "1px solid rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          bgcolor: isDark ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.5)",
          boxShadow: isDark
            ? "0 0 10px rgba(255,255,255,0.2)"
            : "0 0 10px rgba(0,0,0,0.1)",
        },
        textTransform: "none",
        fontWeight: 600,
      }}
    />
  );
};

export default function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const linkColor = isDark ? "#d4d4d4" : "#1e40af";
  const linkHoverColor = isDark ? "#ffffff" : "#1d4ed8";
  const textColor = isDark ? "#a3a3a3" : "#475569";

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() === "") return;
    // You can add your mailing service integration here
    setSubscribed(true);
    setEmail("");
  };

  return (
    <Box
      component="footer"
      sx={{
        pt: 10,
        pb: 6,
        px: { xs: 3, sm: 6 },
        background: "transparent",
        color: isDark ? "#e5e5e5" : "#1e293b",
        borderTop: `1px solid ${isDark ? "#2a2a2a" : "#cbd5e1"}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 6, md: 8 }}
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
        >
          {/* Brand Description */}
          <Grid item xs={12} md={3}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Tell Your Story
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: textColor, lineHeight: 1.8 }}
              paragraph
            >
              Everyone has a voice. Share your unique ideas, thoughts, and
              experiences with the world through storytelling.
            </Typography>
            {/* Social icons */}
            <Stack direction="row" spacing={1} mt={2}>
              {[
                FacebookIcon,
                TwitterIcon,
                InstagramIcon,
                LinkedInIcon,
                YouTubeIcon,
                GitHubIcon,
              ].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  aria-label="social-link"
                  href="#"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: linkColor,
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: linkHoverColor,
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Subscribe to Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, mb: 1.5 }}>
              Get the latest updates and stories delivered to your inbox.
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubscribe();
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Your email address"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <GlassButton
                        size="small"
                        onClick={handleSubscribe}
                        disabled={subscribed}
                      >
                        {subscribed ? "Subscribed" : "Subscribe"}
                      </GlassButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1} mt={1}>
              {["Home", "Explore", "About", "Contact"].map((text) => {
                const to = text === "Home" ? "/" : `/${text.toLowerCase()}`;
                return (
                  <Link
                    key={text}
                    component={RouterLink}
                    to={to}
                    underline="none"
                    sx={{
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: linkColor,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: linkHoverColor,
                        pl: 1,
                      },
                    }}
                  >
                    {text}
                  </Link>
                );
              })}
            </Stack>
          </Grid>

          {/* Legal & Contact */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact & Legal
            </Typography>
            <Stack spacing={1.5} mt={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <EmailIcon sx={{ fontSize: 20, color: linkColor }} />
                <Typography variant="body2" sx={{ color: textColor }}>
                  info@yourstory.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <LocationOnIcon sx={{ fontSize: 20, color: linkColor }} />
                <Typography variant="body2" sx={{ color: textColor }}>
                  BSR Paradise Rd, Kaverappa Layout, Kadubeesanahalli,
                  Bengaluru, Karnataka 560103
                </Typography>
              </Box>
              <Box mt={2}>
                <Stack direction="row" spacing={2}>
                  <Link
                    component={RouterLink}
                    to="/privacy-policy"
                    underline="hover"
                    sx={{
                      fontSize: "0.9rem",
                      color: linkColor,
                      "&:hover": { color: linkHoverColor },
                    }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    component={RouterLink}
                    to="/terms-of-service"
                    underline="hover"
                    sx={{
                      fontSize: "0.9rem",
                      color: linkColor,
                      "&:hover": { color: linkHoverColor },
                    }}
                  >
                    Terms of Service
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box mt={8} textAlign="center" pb={2}>
          <Typography
            variant="caption"
            sx={{ color: isDark ? "#6b7280" : "#64748b" }}
          >
            © {new Date().getFullYear()} Tell Your Story. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
