import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

const CommonBackground = ({ children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        background: isDark
          ? "linear-gradient(135deg, #0a0a0a, #111827)"
          : "linear-gradient(135deg, #e8f1ff, #ffffff)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",

        "&::before": {
          content: '""',
          position: "absolute",
          top: "-180px",
          left: "-120px",
          width: "600px",
          height: "600px",
          background: isDark
            ? "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)"
            : "radial-gradient(circle, #bfdbfe, transparent 70%)",
          borderRadius: "50%",
          opacity: 0.2,
          zIndex: 0,
        },

        "&::after": {
          content: '""',
          position: "absolute",
          bottom: "-200px",
          right: "-130px",
          width: "500px",
          height: "500px",
          background: isDark
            ? "radial-gradient(circle, rgba(14,165,233,0.1), transparent 70%)"
            : "radial-gradient(circle, #93c5fd, transparent 70%)",
          borderRadius: "50%",
          opacity: 0.15,
          zIndex: 0,
        },
      }}
    >
      {/* Elliptical radial glow in center */}
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "200px",
          background: isDark
            ? "radial-gradient(ellipse, rgba(59,130,246,0.08), transparent 70%)"
            : "radial-gradient(ellipse, rgba(147,197,253,0.25), transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      {/* Abstract blob 1 */}
      <Box
        sx={{
          position: "absolute",
          top: "18%",
          left: "8%",
          width: "250px",
          height: "250px",
          background: isDark
            ? "rgba(59,130,246,0.06)"
            : "rgba(147,197,253,0.18)",
          filter: "blur(80px)",
          borderRadius: "50% 40% 30% 60% / 60% 30% 40% 50%",
          animation: "float1 10s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* Abstract blob 2 */}
      <Box
        sx={{
          position: "absolute",
          bottom: "8%",
          right: "12%",
          width: "280px",
          height: "280px",
          background: isDark
            ? "rgba(14,165,233,0.06)"
            : "rgba(125,211,252,0.15)",
          filter: "blur(90px)",
          borderRadius: "60% 40% 30% 70% / 50% 60% 40% 50%",
          animation: "float2 12s ease-in-out infinite",
          zIndex: 0,
        }}
      />

      {/* Animations */}
      <style>
        {`
          @keyframes float1 {
            0% { transform: translateY(0); }
            50% { transform: translateY(-30px); }
            100% { transform: translateY(0); }
          }
          @keyframes float2 {
            0% { transform: translateY(0); }
            50% { transform: translateY(20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      {/* Main content */}
      <Box sx={{ position: "relative", zIndex: 1 }}>{children}</Box>
    </Box>
  );
};

export default CommonBackground;
