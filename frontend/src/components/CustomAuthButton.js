import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomAuthButton = styled(Button)(({ theme }) => {
  const isDark = theme.palette.mode === "dark";

  return {
    variant: isDark ? "outlined" : "contained",
    fontSize: "16px",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 8,
    padding: "6px 16px",
    color: isDark ? theme.palette.primary.light : theme.palette.common.white,
    backgroundColor: isDark ? "transparent" : theme.palette.primary.main,
    border: isDark ? `1px solid ${theme.palette.primary.light}` : "none",
    transition: "all 0.3s ease",

    "&:hover": {
      backgroundColor: isDark
        ? theme.palette.action.hover
        : theme.palette.primary.dark,
      color: isDark ? theme.palette.primary.main : theme.palette.common.white,
      borderColor: isDark ? theme.palette.primary.main : undefined,
    },
  };
});
