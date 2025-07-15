import React from "react";
import { Box, Container, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 10 }}>
      <Box>
        <img
          src="/images/404.jpg"
          alt="Page not found"
          style={{ width: "100%", maxWidth: 500 }}
        />
        <Typography variant="h4" color="text.primary" mt={4}>
          Oops! Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={2}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
