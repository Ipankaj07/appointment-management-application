import React from "react";
import "./swiper.css";

import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const data = [
  {
    id: 1,
    img: "https://tinyurl.com/2f5v2cs9",
  },
  {
    id: 2,
    img: "https://tinyurl.com/4dmhfu7m",
  },
  {
    id: 3,
    img: "https://tinyurl.com/5xdh2b67",
  },
  {
    id: 4,
    img: "https://tinyurl.com/2p8p85we",
  },
  {
    id: 5,
    img: "https://tinyurl.com/3x9d3uwk",
  },
];

const SwiperPic = () => {
  return (
    <>
      <div className="container swiper-div">
        <div className="left-bg">q</div>
        <Swiper
          className="swiper-container"
          modules={[Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          {data.map(({ id, img }) => {
            return (
              <SwiperSlide key={id} className="swipe_img-container">
                <div className="swipe_image">
                  <img src={img} alt=".." />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="left-bg">q</div>
      </div>

      <div className="top_H-image container">
        <img
          src="https://cdn.askapollo.com/live/assets/images/surgicalprocedure.webp"
          alt=""
        />
      </div>
    </>
  );
}

export default SwiperPic;
