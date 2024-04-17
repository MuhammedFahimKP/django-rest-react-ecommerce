import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/e384cb32-690c-4ccf-a6cb-61df36960bb21651599573972-Workwear_Desk.jpg",
  "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/b54399f0-6ed5-44b3-84b0-e9d5c1657aaa1651599573991-CR7_Desk_Baner.jpg",
];

const ActiveSlider = () => {
  const paginater = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex items-center  relative justify-center flex-col h-[60wh] transition-transform ease-out duration-500 overflow-hidden  shadow-lg rounded-lg cursor-grab">
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          reverseDirection: false,
        }}
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
        }}
        pagination={{
          el: paginater?.current,
          type: "bullets",
          clickable: true,
          bulletClass: "bg-white bullets rounded-sm",
          bulletActiveClass: "active",
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-full"
      >
        {slides.map((item) => (
          <SwiperSlide className="w-full h-full " key={item}>
            <img src={item} className="object-cover z-0" alt="" />
          </SwiperSlide>
        ))}
        <div
          ref={paginater}
          className="flex absolute mx-auto left-0 right-0    z-50 overflow-hidden  justify-center   pr-5 items-center gap-2"
        ></div>
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
