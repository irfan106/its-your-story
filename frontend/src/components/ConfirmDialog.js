import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import GlassButton from "./GlassButton/GlassButton";

const ConfirmDialog = ({
  open,
  title,
  description,
  subject = "item", // ✅ new: makes dialog contextual
  onClose,
  onConfirm,
  confirmText,
  cancelText = "Cancel",
  loading = false,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // ✅ Default texts if not provided
  const defaultTitle = `Delete ${subject}?`;
  const defaultDescription = `Are you sure you want to permanently delete this ${subject}? This action cannot be undone.`;
  const defaultConfirm = `Yes, delete ${subject}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          bgcolor: isDark ? "transparent" : "rgba(255, 255, 255, 0.45)",
          backdropFilter: "blur(16px)",
          boxShadow: isDark
            ? "0 8px 40px rgba(0,0,0,0.6)"
            : "0 8px 40px rgba(0,0,0,0.25)",
        },
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
          color: "text.secondary",
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Header */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.25rem",
          mb: 1,
        }}
      >
        <WarningAmberRoundedIcon
          sx={{ fontSize: 40, color: theme.palette.error.main, mb: 1 }}
        />
        {title || defaultTitle}
      </DialogTitle>

      {/* Description */}
      <DialogContent>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {description || defaultDescription}
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 2 }}>
        <GlassButton onClick={onClose} sx={{ minWidth: 120 }}>
          {cancelText}
        </GlassButton>
        <GlassButton
          color="error"
          onClick={onConfirm}
          loading={loading}
          sx={{ minWidth: 160 }}
        >
          {confirmText || defaultConfirm}
        </GlassButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
