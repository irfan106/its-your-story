import React, { useRef, useState } from "react";
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

const Trending = ({ blogs }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const theme = useTheme();

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <Box sx={{ position: "relative", mb: 6 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Trending
      </Typography>

      <Box
        sx={{
          position: "relative",
        }}
      >
        {/* Left Arrow */}
        <IconButton
          ref={prevRef}
          sx={{
            position: "absolute",
            top: "50%",
            left: 8,
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: isBeginning
              ? theme.palette.action.disabledBackground
              : theme.palette.background.paper,
            color: isBeginning
              ? theme.palette.action.disabled
              : theme.palette.text.primary,
            boxShadow: 2,
            pointerEvents: isBeginning ? "none" : "auto",
            "&:hover": {
              backgroundColor: !isBeginning && theme.palette.primary.main,
              color: !isBeginning && "#fff",
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
            backgroundColor: isEnd
              ? theme.palette.action.disabledBackground
              : theme.palette.background.paper,
            color: isEnd
              ? theme.palette.action.disabled
              : theme.palette.text.primary,
            boxShadow: 2,
            pointerEvents: isEnd ? "none" : "auto",
            "&:hover": {
              backgroundColor: !isEnd && theme.palette.primary.main,
              color: !isEnd && "#fff",
            },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          onInit={(swiper) => {
            swiperRef.current = swiper;
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {blogs?.map((item) => (
            <SwiperSlide key={item.id}>
              <Card sx={{ height: "100%", position: "relative" }}>
                <Link
                  to={`/detail/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={item.imgUrl}
                    alt={item.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      bgcolor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      px: 2,
                      py: 1,
                    }}
                  >
                    <Typography variant="subtitle1" noWrap>
                      {item.title.length > 25
                        ? item.title.slice(0, 25) + "..."
                        : item.title}
                    </Typography>
                    <Typography variant="caption">
                      {item.author} — {new Date(item.timestamp).toDateString()}
                    </Typography>
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
