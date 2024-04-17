import { useState } from "react";

const images: { url: string }[] = [
  {
    url: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
  },
  {
    url: "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg",
  },
  //   {
  //     url: "hjk",
  //   },
  //   {
  //     url: "hrx",
  //   },
];

export default function () {
  const [currentSlid, setCurrentSlide] = useState(0);

  setInterval(() => {
    const isLastSlide = currentSlid === images.length - 1;
    const nexSlide = isLastSlide ? 0 : currentSlid + 1;
    setCurrentSlide(nexSlide);
  }, 3000);

  return (
    <div className="banners-section-2 container mx-auto my-5 px-2 sm:px-8">
      <div className="grid grid-cols-12 gap-5">
        <div className="group relative col-span-12 h-[140px]   md:h-[300px] overflow-hidden rounded-lg sm:col-span-6">
          <div className="absolute z-[1] h-full w-full bg-gradient-to-t from-transparent to-black/70" />
          <img
            className="h-full w-full object-cover transition-all duration-300 hover:transform group-hover:scale-110"
            src="https://basicslife.com/cdn/shop/files/Home_PAGE_47ca3fcc-a8f3-4fc3-a1ae-686b676fdd08.png?v=1708681092&width=1600"
            alt="banner-img"
          />
        </div>
        <div className="group relative col-span-12 h-[140px]   md:h-[300px] overflow-hidden rounded-lg sm:col-span-6">
          <div className="absolute z-[1] h-full w-full bg-gradient-to-t from-transparent to-black/70" />
          <img
            className=" object-cover  w-full h-full  transition-all duration-300 hover:transform group-hover:scale-110"
            src="https://s7ap1.scene7.com/is/image/adityabirlafashion/LP_D_HB_175_Jeans?resMode=sharp2&wid=1366&hei=544"
            alt="banner-img"
          />
        </div>
      </div>
    </div>
  );
}
