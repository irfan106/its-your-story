import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NavButton = styled(Button)(({ theme, active }) => {
  const isDark = theme.palette.mode === "dark";

  const gradient = isDark
    ? "linear-gradient(135deg, #6366f1, #8b5cf6)" // Indigo → Purple dark
    : "linear-gradient(135deg, #3b82f6, #06b6d4)"; // Blue → Cyan light

  // Helper style for gradient text
  const gradientTextStyle = {
    background: gradient,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textFillColor: "transparent",
  };

  return {
    fontWeight: active ? 600 : 500,
    fontSize: 16,
    textTransform: "none",
    backgroundColor: "transparent",
    padding: "6px 10px",
    borderRadius: 0,
    minWidth: "auto",
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    color: theme.palette.text.primary,
    transition: "color 0.3s ease",

    // Apply gradient text on active
    ...(active && {
      ...gradientTextStyle,
    }),

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "10%",
      right: "10%",
      height: "3px",
      borderRadius: "2px",
      background: active ? gradient : "transparent",
      transformOrigin: "center",
      transform: active ? "scaleX(1)" : "scaleX(0)",
      transition: "transform 0.3s ease, background 0.3s ease",
    },

    // On hover, gradient text and underline
    "&:hover": {
      ...gradientTextStyle,
      backgroundColor: "transparent",
      "&::after": {
        background: gradient,
        transform: "scaleX(1)",
      },
    },

    "&:focus-visible": {
      outline: `2px solid transparent`,
      boxShadow: `0 0 0 3px ${gradient}`,
      outlineOffset: 2,
    },
  };
});
