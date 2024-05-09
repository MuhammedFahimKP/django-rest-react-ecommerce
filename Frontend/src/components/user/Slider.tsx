import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const slides = [
  "https://espanshe.com/cdn/shop/files/Canvas_acd48fd9-0078-4912-9c63-8d9f7b3957aa.png?v=1686303486&width=1800",
  "https://espanshe.com/cdn/shop/files/Canvas_1_47165fe4-9b57-47d3-8c49-08d918abb33c.png?v=1686043542&width=1800",
];

const ActiveSlider = () => {
  const paginater = useRef<HTMLDivElement | null>(null);
  console.log(paginater);

  return (
    <div className="flex relative mb-2 lg:mb-8 items-center z-10  justify-center flex-col h-[60wh] transition-transform ease-out duration-500 overflow-hidden  cursor-grab">
      <Swiper
        effect={"cube"}
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
          bulletClass: "z-50 bg-white w-3 h-3 rounded-sm",
          bulletActiveClass: "active",
        }}
        modules={[Pagination, Autoplay]}
        className="max-w-full"
      >
        {slides.map((item) => (
          <SwiperSlide className="w-full h-full" key={item}>
            <img
              src={item}
              className="object-contain relative z-0 brightness-75"
              alt=""
            />
            <div className="absolute flex flex-col   gap-2 bottom-0 z-50 top-[65%] left-[10%]  mx-auto">
              <h1 className="font-pacifico text-7xl  text-white  ">
                Mens Fashion
              </h1>
              <div className="mr-[20%] bg-red-500">
                <button className="border-white border-2 rounded-full   py-2 px-4 text-white font-medium">
                  <p>Shop Now</p>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div
          ref={paginater}
          id="paginater"
          className="flex  absolute mx-auto left-0 right-0  z-50 overflow-hidden  justify-center   pr-5 items-center gap-2"
        ></div>
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
