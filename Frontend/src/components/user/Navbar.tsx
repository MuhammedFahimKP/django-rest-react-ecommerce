// import LgMenu from "../ui/LgMenu";

import Logo from "../../assets/whiteLogo.svg";
import { FiUser } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";

// import NavbarLink from "../ui/NavbarLink";
// import { navlinks } from "../utils/constants";

// import SmallNavbarMenu from "../ui/SmallNavbarMenu";
import { RiMenu5Fill } from "react-icons/ri";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { useWindowDimensions } from "../../hooks/useWindow";
import { useState } from "react";

interface Props {
  onOpen: () => void;
}

const Navbar = ({ onOpen }: Props) => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  function openMobileMenu() {
    if (width > 900) return;
    console.log(open);
    setOpen(!open);
  }

  return (
    <>
      {" "}
      <nav className="h-16  absolute top-0   w-full z-50 border-gray-50  flex items-center justify-between  px-10 lg:px-32 lg:py-4 ">
        <button
          className="flex  size-8 text-lg  overflow-hidden items-center justify-cente"
          onClick={() => openMobileMenu()}
        >
          <RiMenu5Fill className="text-white text-2xl md:text-3xl  lg:text-4xl" />{" "}
        </button>

        <h1 className="flex items-center justify-center  text-4xl text-white ">
          <a href="" className="flex items-center justify-center pb-2">
            <img
              src={Logo}
              className="h-auto w-24 lg:w-40 hover:text-green-500 duration-200"
            />
          </a>
        </h1>

        <div className=" flex justify-between items-center  gap-3">
          <button className="text-white text-3xl hidden lg:block">
            <FiUser />
          </button>

          <button className="relative  text-white text-3xl hidden  lg:flex">
            <CiHeart className="relative" />
            <span className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-black border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              0
            </span>
          </button>

          <button className="text-white text-3xl " onClick={onOpen}>
            <HiOutlineShoppingBag />
          </button>
        </div>

        {/* <div className="hidden flex-1 lg:flex justify-end px-3">
          <LgMenu />
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;
