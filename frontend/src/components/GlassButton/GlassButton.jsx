import { Button, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";

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
  href,
  to,
  component,
  color = "primary", // 🔹 default, add error support
  ...rest
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // 🔹 Different colors if it's "error"
  const primaryBlue = isDark
    ? "rgba(0, 122, 255, 0.16)"
    : "rgba(0, 122, 255, 0.10)";
  const hoverBlue = isDark
    ? "rgba(0, 122, 255, 0.3)"
    : "rgba(0, 122, 255, 0.18)";
  const textBlue = isDark ? "#cce6ff" : "#003366";

  const primaryRed = isDark
    ? "rgba(255, 50, 50, 0.18)"
    : "rgba(255, 0, 0, 0.12)";
  const hoverRed = isDark ? "rgba(255, 50, 50, 0.35)" : "rgba(255, 0, 0, 0.2)";
  const textRed = isDark ? "#ffcccc" : "#b71c1c";

  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.15)"
    : "rgba(0, 0, 0, 0.1)";

  // 🔹 Choose palette
  const bgColor = color === "error" ? primaryRed : primaryBlue;
  const hoverColor = color === "error" ? hoverRed : hoverBlue;
  const textColor = color === "error" ? textRed : textBlue;

  return (
    <Button
      component={component || (href ? "a" : to ? "a" : "button")}
      href={href}
      to={to}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      size={size}
      color={color}
      sx={{
        borderRadius: 2,
        px: 2.5,
        fontWeight: 600,
        fontSize: "1rem",
        textTransform: "none",
        backdropFilter: "blur(12px)",
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,0.4)"
          : "0 4px 12px rgba(0,122,255,0.08)",
        border: `1px solid ${borderColor}`,
        transition: "all 0.25s ease",
        textDecoration: "none",
        "&:hover": {
          transform: "scale(1.015)",
          backgroundColor: hoverColor,
          boxShadow: isDark
            ? "0 6px 24px rgba(0,0,0,0.45)"
            : "0 8px 20px rgba(0,122,255,0.15)",
          textDecoration: "none",
          color: textColor,
        },
        "&:disabled": {
          opacity: 0.6,
          cursor: "not-allowed",
          transform: "none",
        },
        "&:visited": {
          color: textColor,
        },
        ...sx,
      }}
      {...rest}
    >
      {loading ? <CircularProgress size={22} color="inherit" /> : children}
    </Button>
  );
};

GlassButton.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  size: PropTypes.string,
  sx: PropTypes.object,
  href: PropTypes.string,
  to: PropTypes.string,
  component: PropTypes.elementType,
  color: PropTypes.oneOf(["primary", "error"]), // ✅ add error support
};

export default GlassButton;
