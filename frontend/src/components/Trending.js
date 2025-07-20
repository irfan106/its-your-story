import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  IconButton,
  useTheme,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { getRandomDefaultImg } from "../utility/general.utils";

const Trending = ({ blogs }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative", mb: 6 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(to right, #f3f4f6, #d1d5db)"
              : "linear-gradient(to right, #1f2937, #4b5563)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Trending
      </Typography>

      <Box sx={{ position: "relative" }}>
        <IconButton
          ref={prevRef}
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color:
              theme.palette.mode === "dark"
                ? "#fff"
                : theme.palette.text.primary,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : theme.palette.grey[300],
              color:
                theme.palette.mode === "dark"
                  ? "#000"
                  : theme.palette.text.primary,
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <IconButton
          ref={nextRef}
          sx={{
            position: "absolute",
            top: "50%",
            right: 8,
            transform: "translateY(-50%)",
            zIndex: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color:
              theme.palette.mode === "dark"
                ? "#fff"
                : theme.palette.text.primary,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : theme.palette.grey[300],
              color:
                theme.palette.mode === "dark"
                  ? "#000"
                  : theme.palette.text.primary,
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          onInit={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {blogs?.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                sx={{
                  height: "100%",
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "box-shadow 0.4s ease, transform 0.3s ease",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(255, 255, 255, 0.4)",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 12px rgba(255, 255, 255, 0.05)"
                      : "0 2px 8px rgba(0, 0, 0, 0.08)",
                  "&:hover": {
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 0 20px rgba(255, 255, 255, 0.15)"
                        : "0 6px 18px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Link
                  to={`/detail/${item.id}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    height: "100%",
                  }}
                >
                  <Box sx={{ position: "relative", height: "100%" }}>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 200,
                        backgroundImage: `url(${
                          item.imgUrl || getRandomDefaultImg()
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        backgroundColor: "rgba(0,0,0,0.45)",
                        color: "white",
                        px: 2,
                        py: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        noWrap
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "#fff",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.title.length > 28
                          ? item.title.slice(0, 28) + "..."
                          : item.title}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {item.author} —{" "}
                        {new Date(item.timestamp).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default Trending;
