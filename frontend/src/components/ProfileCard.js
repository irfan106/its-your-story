import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Paper,
  useTheme,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile, isDark }) => {
  const theme = useTheme();

  // Theme-aware default banner
  const defaultBanner = isDark
    ? "linear-gradient(135deg, #0f172a, #1e293b, #312e81)"
    : "linear-gradient(135deg, #a5f3fc, #93c5fd, #c4b5fd)";

  return (
    <Paper
      sx={{
        overflow: "hidden",
        borderRadius: 4,
        p: 0,
        border: isDark
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          height: { xs: 120, sm: 180 },
          background: profile.bannerURL || defaultBanner,
          position: "relative",
        }}
      >
        {/* Edit button */}
        <Tooltip title="Edit Profile">
          <IconButton
            component={Link}
            to="/edit-profile"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "background.default" },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Avatar + Details */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ p: { xs: 2, sm: 3 }, alignItems: { sm: "center" } }}
      >
        <Avatar
          src={
            profile.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={profile.displayName || "User"}
          sx={{
            width: { xs: 96, sm: 120 },
            height: { xs: 96, sm: 120 },
            border: `3px solid ${theme.palette.background.paper}`,
            mt: { xs: -6, sm: -8 },
          }}
        />

        <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Typography variant="h6" fontWeight="bold">
            {profile.displayName || "No Name"}
          </Typography>
          {profile.username && (
            <Typography variant="body2" color="text.secondary">
              @{profile.username}
            </Typography>
          )}
          {profile.bio && (
            <Typography
              variant="body2"
              sx={{ mt: 1, maxWidth: 500, mx: { xs: "auto", sm: 0 } }}
            >
              {profile.bio}
            </Typography>
          )}

          {/* Followers / Following */}
          <Stack
            direction="row"
            justifyContent={{ xs: "center", sm: "flex-start" }}
            spacing={3}
            sx={{ mt: 2 }}
          >
            <Typography variant="body2" display="flex" alignItems="center">
              <Box component="span" fontWeight="bold" mr={0.8}>
                {profile.followers || 0}
              </Box>
              Followers
            </Typography>
            <Typography variant="body2" display="flex" alignItems="center">
              <Box component="span" fontWeight="bold" mr={0.8}>
                {profile.following || 0}
              </Box>
              Following
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProfileCard;
