import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const Trending = ({ blogs }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 400,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Trending
      </Typography>
      <Slider {...settings}>
        {blogs?.map((item) => (
          <Box key={item.id} px={1}>
            <Card sx={{ position: "relative" }}>
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
                  <Typography variant="subtitle1">{item.title}</Typography>
                  <Typography variant="caption">
                    {item.author} — {item.timestamp.toDate().toDateString()}
                  </Typography>
                </Box>
              </Link>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Trending;
