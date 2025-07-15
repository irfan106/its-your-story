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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useThemeMode } from "../context/ThemeContext";
import lightLogo from "../assets/light-logo.png";
import darkLogo from "../assets/dark-logo.png";
import { NavButton } from "./NavButton";
import { CustomAuthButton } from "./CustomAuthButton";
import { useAppContext } from "../context/AppContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

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

  const renderNavButtons = () =>
    navItems.map((item) => (
      <NavButton
        key={item.key}
        component={Link}
        to={item.path}
        onClick={() => setActive(item.key)}
        active={active === item.key ? 1 : 0}
        disableRipple
      >
        {item.label}
      </NavButton>
    ));

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        mb: 3,
        backdropFilter: "blur(12px)",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(18,18,18,0.8)"
            : "rgba(255,255,255,0.6)",
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
            <IconButton onClick={toggleTheme}>
              {mode === "dark" ? (
                <LightModeOutlinedIcon
                  sx={{ color: theme.palette.warning.main }}
                />
              ) : (
                <DarkModeOutlinedIcon sx={{ color: theme.palette.grey[800] }} />
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
                    color: "text.primary",
                    letterSpacing: 0.2,
                  }}
                >
                  {user.displayName}
                </Typography>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <CustomAuthButton
              component={Link}
              to="/auth"
              onClick={() => setActive("login")}
            >
              Login
            </CustomAuthButton>
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
          onClick={(e) => e.stopPropagation()} // prevent click from triggering backdrop close immediately
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
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    color: active === item.key ? "primary" : "textPrimary",
                  }}
                />
              </ListItem>
            ))}

            {userId ? (
              <ListItem
                button
                onClick={() => {
                  handleLogout();
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem
                button
                component={Link}
                to="/auth"
                onClick={() => {
                  setActive("login");
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
            )}

            <ListItem
              button
              onClick={() => {
                toggleTheme();
                setDrawerOpen(false);
              }}
            >
              <ListItemText
                primary={mode === "dark" ? "Light Mode" : "Dark Mode"}
              />
              <IconButton edge="end" color="inherit">
                {mode === "dark" ? (
                  <LightModeOutlinedIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </IconButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
