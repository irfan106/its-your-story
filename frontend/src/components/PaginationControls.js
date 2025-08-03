import React from "react";
import { Box, Button, useTheme } from "@mui/material";

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = currentPage === index + 1;

        return (
          <Button
            key={index}
            onClick={() => onPageChange(index + 1)}
            variant="outlined"
            sx={{
              mx: 0.6,
              textTransform: "none",
              borderRadius: 3,
              px: 2.5,
              py: 1,
              fontWeight: 500,
              fontSize: "0.9rem",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              backgroundColor: isActive
                ? isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.6)"
                : isDark
                ? "rgba(255, 255, 255, 0.03)"
                : "rgba(255, 255, 255, 0.25)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.08)"
                : "1px solid rgba(0, 0, 0, 0.08)",
              color: isDark
                ? isActive
                  ? "#fff"
                  : "#ddd"
                : isActive
                ? "#111827"
                : "#333",
              boxShadow: isActive
                ? isDark
                  ? "0 4px 12px rgba(255,255,255,0.08)"
                  : "0 4px 12px rgba(0,0,0,0.12)"
                : "none",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(255, 255, 255, 0.5)",
                boxShadow: isDark
                  ? "0 6px 18px rgba(255,255,255,0.1)"
                  : "0 6px 18px rgba(0,0,0,0.15)",
                color: isDark ? "#fff" : "#111827",
              },
            }}
          >
            {index + 1}
          </Button>
        );
      })}
    </Box>
  );
};

export default PaginationControls;
