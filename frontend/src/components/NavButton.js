import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const NavButton = styled(Button)(({ theme, active }) => {
  const isDark = theme.palette.mode === "dark";
  const primaryColor = theme.palette.primary.main;
  const underlineColor = isDark ? theme.palette.primary.light : primaryColor;

  return {
    color: active ? primaryColor : theme.palette.text.primary,
    fontWeight: active ? 700 : 500,
    textTransform: "none",
    fontSize: "18px",
    backgroundColor: "transparent",
    position: "relative",
    overflow: "hidden",
    padding: "6px 12px",
    transition: "color 0.2s ease",
    "&:hover": {
      backgroundColor: "transparent",
      color: primaryColor,
      transform: "translateY(-1px)",
    },
    transition: "color 0.2s ease, transform 0.2s ease",

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%) scaleX(0)",
      width: "70%",
      height: "2px",
      backgroundColor: underlineColor,
      transformOrigin: "center",
      transition: "transform 0.3s ease",
    },

    "&:hover::after": {
      transform: "translateX(-50%) scaleX(1)",
    },
  };
});
