import { useData } from "../../hooks";

import { Link } from "react-router-dom";

import { AdminCategory } from "../../@types";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const Category = () => {
  const { data } = useData<AdminCategory>("shop/categoery/");

  return (
    <div className="flex items-center justify-center ">
      <Swiper
        autoplay={{
          delay: 1000,
          reverseDirection: false,
        }}
        modules={[Autoplay]}
        loop={true}
        breakpoints={{
          340: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          900: {
            slidesPerView: 5,
            spaceBetween: 15,
          },
        }}
        className="max-w-full "
      >
        {data.map((item: AdminCategory) => (
          <SwiperSlide key={item.name}>
            <Link
              to={`/shop/?category=${item.name}`}
              className="relative  flex flex-col items-center  w-full py-6 truncate "
            >
              <img
                src={item.img}
                className="md:h-[200px]  shadow-lg  lg:h-[300px]  rounded-lg "
                alt=""
              />
              <h1 className="font-pacifico mt-4 text-xs lg:text-5xl text-black  ">
                {item.name}
              </h1>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
