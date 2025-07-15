import React from "react";
import { CircularProgress, Box, useTheme } from "@mui/material";

const Spinner = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: isDark ? "#90caf9" : "#1976d2",
        }}
      />
    </Box>
  );
};

export default Spinner;
