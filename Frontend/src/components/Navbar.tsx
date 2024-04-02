import LgMenu from "../ui/LgMenu";
import Logo from "../assets/Logo.svg";
import NavbarLink from "../ui/NavbarLink";
import { navlinks } from "../utils/constants";
import SmallNavbarMenu from "../ui/SmallNavbarMenu";
import { RiMenu5Fill } from "react-icons/ri";
import { useWindowDimensions } from "../hooks/useWindow";
import { useState } from "react";
import { ImCross } from "react-icons/im";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);

  console.log(open);
  console.log(width);

  function openMobileMenu() {
    if (width > 900) return;
    console.log(open);
    setOpen(!open);
  }

  return (
    <>
      {" "}
      <header className=" h-28  border-b-2  border-gray-50   shadow-md flex items-center justify-between px-8 lg:py-4 py-2">
        <h1 className="w-3/12 ">
          <a href="">
            <img
              src={Logo}
              className="h-6 w-auto hover:text-green-500 duration-200"
            />
          </a>
        </h1>

        <nav className="nav text-lg hidden lg:block ">
          <ul className="flex items-center ">
            {navlinks.map((link) => (
              <NavbarLink to={link.to}>{link.text}</NavbarLink>
            ))}
          </ul>
        </nav>

        <div className="w-3/12 hidden lg:flex justify-end px-3">
          <LgMenu />
        </div>

        <div className="w-3/12 flex lg:hidden justify-end px-3 md:justify-end">
          <button
            className="flex size-8 text-lg  overflow-hidden items-center justify-center"
            onClick={() => openMobileMenu()}
          >
            {open ? (
              <ImCross className="text-md text-red-600" />
            ) : (
              <RiMenu5Fill className="text-2xl" />
            )}
          </button>
        </div>
      </header>
      {open && <SmallNavbarMenu />}
    </>
  );
};

export default Navbar;
