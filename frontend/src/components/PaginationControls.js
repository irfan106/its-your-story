import React from "react";
import { Box, Button, useTheme } from "@mui/material";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          onClick={() => onPageChange(index + 1)}
          variant={currentPage === index + 1 ? "contained" : "outlined"}
          sx={{
            mx: 0.6,
            textTransform: "none",
            borderRadius: 2,
            px: 2.5,
            py: 1,
            fontWeight: 500,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            backgroundColor:
              currentPage === index + 1
                ? isDark
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(0,0,0,0.1)"
                : "transparent",
            border: isDark
              ? "1px solid rgba(255,255,255,0.15)"
              : "1px solid rgba(0,0,0,0.15)",
            color: isDark ? "#fff" : "#111827",
            "&:hover": {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.08)",
              boxShadow: isDark
                ? "0 0 8px rgba(255,255,255,0.1)"
                : "0 4px 12px rgba(0,0,0,0.12)",
            },
          }}
        >
          {index + 1}
        </Button>
      ))}
    </Box>
  );
};

export default PaginationControls;
