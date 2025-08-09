import React from "react";
import { Box, Container, Paper, Typography, useTheme } from "@mui/material";

export default function PrivacyPolicy() {
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
            background: "transparent",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
            boxShadow: isDark
              ? "0 0 20px rgba(255, 255, 255, 0.05)"
              : "0 0 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Privacy Policy
          </Typography>

          <Typography variant="body1" paragraph>
            At <strong>It’s Your Story</strong>, your privacy is important to
            us. We are committed to protecting your personal information and
            being transparent about how we collect, use, and share it.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Information We Collect
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information you provide directly when you create an
            account, publish a story, comment, or subscribe to newsletters. This
            includes your name, email address, and any content you submit.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            How We Use Your Information
          </Typography>
          <Typography variant="body1" paragraph>
            Your information helps us:
            <ul>
              <li>Provide, maintain, and improve our platform and services.</li>
              <li>
                Personalize your experience and deliver content tailored to your
                interests.
              </li>
              <li>Communicate with you, including newsletters and updates.</li>
              <li>Monitor and analyze usage to enhance functionality.</li>
            </ul>
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Sharing and Disclosure
          </Typography>
          <Typography variant="body1" paragraph>
            We do not sell your personal information. We may share your data:
            <ul>
              <li>
                With trusted third-party service providers who assist us in
                operating our platform.
              </li>
              <li>
                If required by law or to protect the rights and safety of our
                community.
              </li>
            </ul>
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Your Choices
          </Typography>
          <Typography variant="body1" paragraph>
            You control what you share. You can:
            <ul>
              <li>Update or delete your account information at any time.</li>
              <li>
                Opt out of receiving marketing emails by following the
                unsubscribe link.
              </li>
            </ul>
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Data Security
          </Typography>
          <Typography variant="body1" paragraph>
            We implement industry-standard security measures to protect your
            information from unauthorized access, alteration, or disclosure.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Children’s Privacy
          </Typography>
          <Typography variant="body1" paragraph>
            Our platform is not intended for children under 13. We do not
            knowingly collect personal information from children under this age.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Changes to This Policy
          </Typography>
          <Typography variant="body1" paragraph>
            We may update this privacy policy occasionally. When we do, we will
            revise the date at the bottom and notify users if necessary.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions about this policy or your personal data,
            please contact us at{" "}
            <a href="mailto:info@yourstory.com" style={{ color: "inherit" }}>
              info@yourstory.com
            </a>
            .
          </Typography>

          <Typography
            variant="caption"
            display="block"
            mt={6}
            color="text.secondary"
          >
            Last updated: August 2025
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
