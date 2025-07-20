import React from "react";
import { Box, Typography, Paper, useTheme, Stack, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccessTime as TimeIcon } from "@mui/icons-material";
import { getRandomDefaultImg } from "../utility/general.utils";

const MostPopular = ({ blogs }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 700,
          background: isDark
            ? "linear-gradient(to right, #f4f4f5, #e5e7eb)"
            : "linear-gradient(to right, #1f2937, #4b5563)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        🔥 Most Popular
      </Typography>

      {blogs?.map((item) => (
        <Paper
          key={item.id}
          onClick={() => navigate(`/detail/${item.id}`)}
          elevation={0}
          sx={{
            mb: 3,
            p: 2,
            px: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 4,
            cursor: "pointer",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            backgroundColor: isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(255,255,255,0.55)",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.07)"
              : "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: isDark
              ? "0 8px 30px rgba(255, 255, 255, 0.05)"
              : "0 8px 20px rgba(0, 0, 0, 0.1)",
            transition: "all 0.35s ease",
            "&:hover": {
              transform: "translateY(-2px) scale(1.01)",
              boxShadow: isDark
                ? "0 12px 35px rgba(255, 255, 255, 0.1)"
                : "0 12px 25px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Avatar
            variant="rounded"
            src={item.imgUrl || getRandomDefaultImg()}
            sx={{
              width: 100,
              height: 70,
              borderRadius: 3,
              flexShrink: 0,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                mb: 0.5,
                lineHeight: 1.3,
              }}
            >
              {item.title.length > 60
                ? item.title.slice(0, 57) + "..."
                : item.title}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1}>
              <TimeIcon fontSize="small" color="action" />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                {new Date(item.timestamp).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            </Stack>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default MostPopular;
