import React from "react";
import { Box, Container, Paper, Typography, useTheme } from "@mui/material";

export default function TermsOfService() {
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
            Terms of Service
          </Typography>

          <Typography variant="body1" paragraph>
            Welcome to <strong>It’s Your Story</strong>. By using our platform,
            you agree to these Terms of Service, which govern your access and
            use of our services. Please read them carefully.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            1. Acceptance of Terms
          </Typography>
          <Typography variant="body1" paragraph>
            By accessing or using our site, you agree to comply with these terms
            and all applicable laws and regulations.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            2. User Accounts
          </Typography>
          <Typography variant="body1" paragraph>
            You may need to create an account to publish stories, comment, or
            subscribe. You are responsible for maintaining the confidentiality
            of your account credentials and for all activities under your
            account.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            3. Content Ownership and Responsibility
          </Typography>
          <Typography variant="body1" paragraph>
            You retain ownership of the stories and content you create. However,
            by publishing on our platform, you grant us a non-exclusive,
            worldwide, royalty-free license to display, distribute, and promote
            your content. You are solely responsible for your content and ensure
            it does not violate laws or third-party rights.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            4. Prohibited Conduct
          </Typography>
          <Typography variant="body1" paragraph>
            You agree not to:
            <ul>
              <li>Post unlawful, harmful, or offensive content.</li>
              <li>Impersonate others or provide false information.</li>
              <li>Use our platform to spam or harass others.</li>
              <li>
                Engage in any activity that disrupts or harms the platform.
              </li>
            </ul>
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            5. Termination
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to suspend or terminate your account if you
            violate these Terms or engage in harmful behavior.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            6. Disclaimer of Warranties
          </Typography>
          <Typography variant="body1" paragraph>
            The platform is provided “as is” without warranties of any kind. We
            do not guarantee the accuracy, reliability, or availability of the
            service.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            7. Limitation of Liability
          </Typography>
          <Typography variant="body1" paragraph>
            We are not liable for any damages arising from your use of the
            platform.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            8. Changes to Terms
          </Typography>
          <Typography variant="body1" paragraph>
            We may update these Terms occasionally. Continued use of the
            platform constitutes acceptance of the updated terms.
          </Typography>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            9. Contact Information
          </Typography>
          <Typography variant="body1" paragraph>
            For questions about these Terms, please contact us at{" "}
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
