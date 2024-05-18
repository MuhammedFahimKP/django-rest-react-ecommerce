import { FaStar } from "react-icons/fa6";
import Navbar from "../../components/user/Navbar";
import BottmNavbar from "../../components/user/BottmNavbar";
const ProductsData = [
  {
    id: 1,
    img: "https://assets.ajio.com/medias/sys_master/root/20230907/4uo0/64f9b904afa4cf41f5cf1a1f/performax_black_regular_fit_zip-front_hooded_track_jacket.jpg",
    title: "Women Ethnic",
    rating: 5.0,
    color: "white",
    aosDelay: "0",
  },
  {
    id: 2,
    img: "https://assets.ajio.com/medias/sys_master/root/20220729/jadt/62e3ed78aeb26921afac2bf0/kotty_blue_button-down_jacket_with_buttoned_flap_pockets.jpg",
    title: "Women western",
    rating: 4.5,
    color: "Red",
    aosDelay: "200",
  },
  {
    id: 3,
    img: "https://assets.ajio.com/medias/sys_master/root/20240118/gaBx/65a90be08cdf1e0df5be3c0c/performax_white_%26_blue_men_active_lifestyle_jacket.jpg",
    title: "Goggles",
    rating: 4.7,
    color: "brown",
    aosDelay: "400",
  },
  {
    id: 4,
    img: "https://assets.ajio.com/medias/sys_master/root/20230109/2cFA/63bc4c64f997dd708ef683b4/performax_lime_green_hooded_running_jacket_with_raglan_sleeves.jpg",
    title: "Printed T-Shirt",
    rating: 4.4,
    color: "Yellow",
    aosDelay: "600",
  },
  {
    id: 5,
    img: "https://assets.ajio.com/medias/sys_master/root/20230922/X3MK/650da9aaafa4cf41f5fec9d3/performax_blue_running_regular_fit_sporty_jacket.jpg",
    title: "Fashin T-Shirt",
    rating: 4.5,
    color: "Pink",
    aosDelay: "800",
  },
];

const Products = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary">
            Top Selling Products for you
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold">
            Products
          </h1>
          <p data-aos="fade-up" className="text-xs text-gray-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
            asperiores modi Sit asperiores modi
          </p>
        </div>
        {/* Body section */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* card section */}
            {ProductsData.map((data: any) => (
              <div
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id}
                className="space-y-3"
              >
                <img
                  src={data.img}
                  alt=""
                  className="h-[220px] w-[150px] object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-gray-600">{data.color}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{data.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* view all button */}
          <div className="flex justify-center">
            <button className="text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md">
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  return (
    <>
      <div className="lg:h-20 h-16 bg-black">
        <Navbar onOpen={() => false} />
      </div>
      <div className="bg-red-700 w-full h-36 ">
        <h1>Shop</h1>
        <div className="bg-gray-600 w-full  h-full flex items-center justify-normal">
          <div className="">
            <div className="px-6  bg-red-400">
              <input
                type="text"
                name=""
                id=""
                className="bg-white rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="">
          <></>
        </div>
      </div>
      <BottmNavbar />
    </>
  );
};

export default Shop;
