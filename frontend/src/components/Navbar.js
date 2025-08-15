import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Tooltip,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import lightLogo from "../assets/light-logo.png";
import darkLogo from "../assets/dark-logo.png";
import { NavButton } from "./NavButton";
import { useAppContext } from "../context/AppContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import GlassButton from "./GlassButton/GlassButton";

const Navbar = () => {
  const { user, setUser, setActive, active } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };
  const userId = user?.uid;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { mode, toggleTheme } = useThemeMode();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const navItems = [
    { label: "Home", path: "/", key: "home" },
    { label: "Explore", path: "/explore", key: "explore" },
    ...(userId ? [{ label: "Create", path: "/create", key: "create" }] : []),
    ...(userId
      ? [{ label: "My Stories", path: "/my-stories", key: "mystories" }]
      : []),
    { label: "About", path: "/about", key: "about" },
    { label: "Contact", path: "/contact", key: "contact" },
  ];

  const gradientTextStyle = (theme) => {
    const isDark = theme.palette.mode === "dark";
    const gradient = isDark
      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
      : "linear-gradient(135deg, #3b82f6, #06b6d4)";

    return {
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textFillColor: "transparent",
    };
  };

  const renderNavButtons = () =>
    navItems.map((item) => {
      return (
        <NavButton
          key={item.key}
          component={Link}
          to={item.path}
          onClick={() => setActive(item.key)}
          disableRipple
          active={active === item.key ? 1 : 0}
        >
          {item.label}
        </NavButton>
      );
    });

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor: "transparent",
        borderBottom: `1px solid ${
          theme.palette.mode === "dark" ? "#333" : "#ddd"
        }`,
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component={Link}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src={mode === "dark" ? darkLogo : lightLogo}
              alt="Logo"
              style={{
                width: 130,
                height: 70,
                objectFit: "contain",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </Box>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: "2rem" }}>
              {renderNavButtons()}
            </Box>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip
            title={
              mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            <IconButton
              onClick={toggleTheme}
              sx={{
                bgcolor: "transparent",
                transition: "all 0.3s ease",
                "& svg": {
                  background:
                    mode === "dark"
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  transition: "all 0.3s ease",
                },
                "&:hover": {
                  bgcolor: theme.palette.primary.main + "15",
                  "& svg": {
                    filter: "brightness(1.2)",
                  },
                },
              }}
            >
              {mode === "dark" ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>

          {userId ? (
            <>
              <Box
                onClick={handleMenuOpen}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  cursor: "pointer",
                  px: 1,
                  py: 0.5,
                  borderRadius: "999px",
                  transition: "background 0.2s",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <Tooltip title="Account Settings">
                  <Avatar
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={user.displayName || "Profile"}
                    sx={{
                      width: 36,
                      height: 36,
                      transition: "all 0.3s ease",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 0 0 2px #444"
                          : "0 0 0 2px #ccc",
                      "&:hover": {
                        boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
                      },
                    }}
                  />
                </Tooltip>

                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    maxWidth: 120,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    letterSpacing: 0.2,
                    ...gradientTextStyle(theme), // Apply gradient here!
                  }}
                >
                  {user.displayName}
                </Typography>
              </Box>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    minWidth: 170,
                    bgcolor: "transparent",
                    p: 0,
                    backdropFilter: "blur(10px)",
                  },
                }}
              >
                {/* Profile header */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 2.5,
                    py: 1.5,
                    borderBottom: (theme) =>
                      `2px solid ${theme.palette.divider}`,
                  }}
                >
                  <Avatar
                    src={
                      user.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt={user.displayName || "Profile"}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography
                    variant="subtitle1"
                    noWrap
                    sx={{
                      fontWeight: 600,
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                          : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textFillColor: "transparent",
                    }}
                  >
                    {user.displayName || "User"}
                  </Typography>
                </Box>

                {/* Dashboard */}
                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={() => {
                    handleMenuClose();
                    setActive("dashboard");
                  }}
                  sx={{
                    px: 3,
                    py: 1.25,
                    fontWeight: 600,
                    color:
                      active === "dashboard" ? "transparent" : "text.primary",
                    background:
                      active === "dashboard"
                        ? theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                          : "linear-gradient(135deg, #3b82f6, #06b6d4)"
                        : "none",
                    WebkitBackgroundClip:
                      active === "dashboard" ? "text" : "unset",
                    WebkitTextFillColor:
                      active === "dashboard" ? "transparent" : "unset",
                    backgroundClip: active === "dashboard" ? "text" : "unset",
                    textFillColor:
                      active === "dashboard" ? "transparent" : "unset",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "transparent",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                          : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textFillColor: "transparent",
                    },
                  }}
                >
                  Dashboard
                </MenuItem>

                {/* Logout */}
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                  sx={{
                    px: 3,
                    py: 1.25,
                    fontWeight: 600,
                    color: theme.palette.error.main,
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                      filter: "brightness(1.1)",
                    },
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <GlassButton
              component={Link}
              to="/auth"
              onClick={() => setActive("login")}
              sx={{
                ...gradientTextStyle(theme), // Apply gradient here too!
                backgroundColor: "transparent", // keep glassy
                "&:hover": {
                  backgroundColor: "transparent", // no bg on hover
                  textDecoration: "underline",
                  textDecorationColor:
                    theme.palette.mode === "dark" ? "#8b5cf6" : "#06b6d4",
                },
              }}
            >
              Login
            </GlassButton>
          )}

          {isMobile && (
            <IconButton edge="end" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 270,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #121212, #1f1f1f)"
                : "linear-gradient(135deg, #fdfdfd, #f3f3f3)",
            borderLeft: `1px solid ${
              theme.palette.mode === "dark" ? "#333" : "#ddd"
            }`,
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={(e) => e.stopPropagation()}
        >
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.key}
                component={Link}
                to={item.path}
                onClick={() => {
                  setActive(item.key);
                  setDrawerOpen(false);
                }}
                selected={active === item.key}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  mb: 1,
                  "&.Mui-selected": {
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(107, 114, 255, 0.3)"
                        : "rgba(99, 102, 241, 0.3)",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
