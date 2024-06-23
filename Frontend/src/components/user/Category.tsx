import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

interface Categoery {
  name: string;
  img: string;
}

const Category = () => {
  const [categories] = useState<Categoery[]>([
    {
      name: "Shirts",
      img: "https://espanshe.com/cdn/shop/collections/Category_-_Shirt_copy_large.png?v=1704469163",
    },
    {
      name: "T-Shirt",
      img: "https://espanshe.com/cdn/shop/collections/Category_-_T-shirt_copy_large.png?v=1704469317",
    },
    {
      name: "Baggy",
      img: "https://i5.walmartimages.com/asr/66d9fd97-7bde-477d-b825-9e839fa149c7.a45fa778c634856733f826f9298a76a3.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    },
    {
      name: "Cargo",
      img: "https://espanshe.com/cdn/shop/collections/Category_-_Cargo_copy_large.png?v=1707294293",
    },
    {
      name: "Jeans",
      img: "https://espanshe.com/cdn/shop/collections/Category_-_Jeans_copy_large.png?v=1707298101",
    },
    {
      name: "Formal Pants",
      img: "https://espanshe.com/cdn/shop/collections/Category_-_Trouser_copy_large.png?v=1707297999",
    },
    {
      name: "Hoodies",
      img: "https://espanshe.com/cdn/shop/collections/Category_-_Hoodies_sweatshirt_copy_large.jpg?v=1687420892",
    },
    {
      name: "Jackets",
      img: "https://img.freepik.com/premium-photo/fashion-men-jacket-coat-dark-brown-color_800563-3287.jpg",
    },
  ]);

  console.log(categories);
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
        {categories.map((item: Categoery) => (
          <SwiperSlide key={item.name}>
            <a
              href="#"
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
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Category;
