import { Carousel, IconButton } from "@material-tailwind/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
export default function CarouselTransition() {
  const images = [
    "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
    "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/31/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.jpg",
    "https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/e384cb32-690c-4ccf-a6cb-61df36960bb21651599573972-Workwear_Desk.jpg",
  ];
  return (
    <>
      <Carousel
        placeholder={"skdj"}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={"text-black" + "bg-red-400"}
        autoplay={true}
        loop={true}
        prevArrow={({ handlePrev }) => (
          <IconButton
            variant="text"
            placeholder={"prev"}
            onClick={handlePrev}
            className="!absolute top-2/4 left-4 -translate-y-2/4 text-gray-900 text-lg"
          >
            <FaCaretLeft />
          </IconButton>
        )}
        nextArrow={({ handleNext }) => (
          <IconButton
            variant="text"
            placeholder={"next"}
            onClick={handleNext}
            className="!absolute top-2/4 right-4 -translate-y-2/4 text-gray-900 text-lg "
          >
            <FaCaretRight />
          </IconButton>
        )}
      >
        {images.map((img, index) => (
          <img
            src={img}
            key={index}
            alt="image 1"
            className="lg:object-contain object-cover  object-right bg-gray-200"
          />
        ))}
      </Carousel>
      <div className="text-red-700">hai</div>
    </>
  );
}
// import { Carousel, Typography, Button } from "@material-tailwind/react";

// export default function CarouselWithContent() {
//   return (
//     <>
//       <Carousel
//         placeholder={"hai"}
//         transition={{ duration: 2 }}
//         className="rounded-xl"
//       >
//         <img
//           src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
//           alt="image 1"
//           className="h-full w-full object-cover"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
//           alt="image 2"
//           className="h-full w-full object-cover"
//         />
//         <img
//           src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//           alt="image 3"
//           className="h-full w-full object-cover"
//         />
//       </Carousel>
//       <div className="text-red-500 text-4xl">Hai</div>
//     </>
//   );
// }
