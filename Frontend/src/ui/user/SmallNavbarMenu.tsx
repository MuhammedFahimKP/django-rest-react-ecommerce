import { motion } from "framer-motion";
import { navlinks } from "../../utils/constants";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import CartBtn from "./CartBtn";
import { TbChevronRight } from "react-icons/tb";

const SmallNavbarMenu = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ translateY: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        restSpeed: 1,
      }}
      className="w-full z-50   absolute top-10 bg-white text-lg  p-4 border-b-2 m-0    lg:hidden border-gray-300"
    >
      <nav className="block  lg:hidden relative">
        <ul className="flex flex-col items-start  ">
          {navlinks.map((link) => (
            <div className="w-5/12 flex justify-between items-center  px-1 md:w-1/6 mt-2 rounded-md bg-black">
              <Link className="text-white px-2 py-1 " to={link.to}>
                {link.text}
              </Link>
              <TbChevronRight className="text-white" />
            </div>
          ))}
        </ul>
        <div className="flex flex-row items-center gap-5 mt-2">
          <Link
            to="/"
            className="text-2xl p-1 hover:text-gray-500 duration-200 text-b"
          >
            <FaUser />
          </Link>
          <Link
            to="/"
            className="text-2xl p-1 hover:text-green-500 duration-200 text-red-700"
          >
            <IoMdHeart />
          </Link>

          <CartBtn />
        </div>
      </nav>
    </motion.div>
  );
};

export default SmallNavbarMenu;
