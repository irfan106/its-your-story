import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navItems = [
    { label: "Its Your Story", path: "/", key: "home" },
    { label: "Create", path: "/create", key: "create" },
    { label: "About", path: "/about", key: "about" },
  ];

  return (
    <AppBar position="static" color="default" sx={{ mb: 3 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left navigation */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.key}
              component={Link}
              to={item.path}
              color={active === item.key ? "primary" : "inherit"}
              onClick={() => setActive(item.key)}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right side: Login/Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {userId ? (
            <>
              <Avatar
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="profile"
                sx={{ width: 32, height: 32, cursor: "pointer" }}
                onClick={handleMenuOpen}
              />
              <Typography variant="body2">{user?.displayName}</Typography>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
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
            <Button
              component={Link}
              to="/auth"
              color={active === "login" ? "primary" : "inherit"}
              onClick={() => setActive("login")}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
