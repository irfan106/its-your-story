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
  ...rest
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const primaryBlue = isDark
    ? "rgba(0, 122, 255, 0.16)"
    : "rgba(0, 122, 255, 0.10)";
  const hoverBlue = isDark
    ? "rgba(0, 122, 255, 0.3)"
    : "rgba(0, 122, 255, 0.18)";
  const borderColor = isDark
    ? "rgba(255, 255, 255, 0.15)"
    : "rgba(0, 0, 0, 0.1)";
  const textColor = isDark ? "#cce6ff" : "#003366";

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
      sx={{
        borderRadius: 2,
        px: 2.5,
        fontWeight: 600,
        fontSize: "1rem",
        textTransform: "none",
        backdropFilter: "blur(12px)",
        backgroundColor: primaryBlue,
        color: textColor,
        boxShadow: isDark
          ? "0 4px 20px rgba(0,0,0,0.4)"
          : "0 4px 12px rgba(0,122,255,0.08)",
        border: `1px solid ${borderColor}`,
        transition: "all 0.25s ease",
        textDecoration: "none", // ✅ Remove underline
        "&:hover": {
          transform: "scale(1.015)",
          backgroundColor: hoverBlue,
          boxShadow: isDark
            ? "0 6px 24px rgba(0,0,0,0.45)"
            : "0 8px 20px rgba(0,122,255,0.15)",
          textDecoration: "none", // ✅ Prevent link styling
        },
        "&:disabled": {
          opacity: 0.6,
          cursor: "not-allowed",
          transform: "none",
        },
        "&:visited": {
          color: textColor, // ✅ Override visited link color
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
};

export default GlassButton;
