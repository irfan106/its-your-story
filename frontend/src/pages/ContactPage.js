import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import CommonBackground from "../components/CommonBackground";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

const ContactPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    };

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxaBuvZaUkvPOARhnEYclWU2gjS4wxCQLNl5LYYHnD7FdJq5h3WtlKm3ELYmx95I4G5/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result.result === "success") {
        alert("✅ Message sent successfully!");
        e.target.reset();
      } else {
        alert("⚠️ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("❌ Failed to submit the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommonBackground>
      <Container maxWidth="md" sx={{ py: 10 }}>
        <MotionPaper
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          elevation={6}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background: isDark
              ? "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(50,50,50,0.85))"
              : "linear-gradient(135deg, rgba(255,255,255,0.85), rgba(240,240,240,0.85))",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow: isDark
              ? "0 10px 40px rgba(0,0,0,0.6)"
              : "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            textAlign="center"
          >
            Get in Touch
          </Typography>
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ mb: 5, color: "text.secondary" }}
          >
            We'd love to hear from you. Whether it's feedback, a question, or
            just to say hello!
          </Typography>

          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                <TextField
                  label="Your Name"
                  name="name"
                  required
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    sx: {
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: `0 0 0 2px ${
                          isDark ? "#90caf9" : "#1976d2"
                        }20`,
                      },
                      "&.Mui-focused": {
                        boxShadow: `0 0 0 2px ${
                          isDark ? "#90caf9" : "#1976d2"
                        }40`,
                      },
                    },
                  }}
                />
                <TextField
                  label="Email Address"
                  name="email"
                  required
                  fullWidth
                  type="email"
                  variant="outlined"
                  InputProps={{
                    sx: {
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: `0 0 0 2px ${
                          isDark ? "#90caf9" : "#1976d2"
                        }20`,
                      },
                      "&.Mui-focused": {
                        boxShadow: `0 0 0 2px ${
                          isDark ? "#90caf9" : "#1976d2"
                        }40`,
                      },
                    },
                  }}
                />
                <TextField
                  label="Your Message"
                  name="message"
                  required
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  InputProps={{
                    sx: {
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: `0 0 0 2px ${
                          isDark ? "#90caf9" : "#1976d2"
                        }20`,
                      },
                      "&.Mui-focused": {
                        boxShadow: `0 0 0 2px ${
                          isDark ? "#90caf9" : "#1976d2"
                        }40`,
                      },
                    },
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                    sx={{
                      py: 1.5,
                      fontWeight: "bold",
                      borderRadius: 99,
                      textTransform: "none",
                      background: "linear-gradient(45deg, #2196f3, #21cbf3)",
                      boxShadow: "0 8px 20px rgba(33, 203, 243, 0.25)",
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>
            </Grid>

            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <EmailIcon color="primary" />
                  <Typography variant="body1">
                    contact@itsyourstory.com
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </MotionPaper>
      </Container>
    </CommonBackground>
  );
};

export default ContactPage;
