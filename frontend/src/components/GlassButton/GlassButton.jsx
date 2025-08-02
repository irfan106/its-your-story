import { Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const GlassButton = ({
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  variant = "contained",
  size = "medium",
  sx = {},
  ...rest
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const primaryBlue = isDark
    ? "rgba(0, 122, 255, 0.2)"
    : "rgba(0, 122, 255, 0.12)";
  const hoverBlue = isDark
    ? "rgba(0, 122, 255, 0.35)"
    : "rgba(0, 122, 255, 0.2)";
  const borderColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)";

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      size={size}
      sx={{
        borderRadius: 2,
        py: 1.5,
        px: 2.5,
        fontWeight: 600,
        fontSize: "1rem",
        textTransform: "none",
        backdropFilter: "blur(10px)",
        backgroundColor: primaryBlue,
        color: isDark ? "#cce6ff" : "#003366",
        boxShadow: isDark
          ? "0 6px 20px rgba(0,0,0,0.4)"
          : "0 6px 16px rgba(0,122,255,0.1)",
        border: `1px solid ${borderColor}`,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          backgroundColor: hoverBlue,
          boxShadow: isDark
            ? "0 8px 24px rgba(0,0,0,0.5)"
            : "0 10px 24px rgba(0,122,255,0.15)",
        },
        ...sx,
      }}
      {...rest}
    >
      {loading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  );
};

export default GlassButton;
