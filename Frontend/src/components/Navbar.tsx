import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import NavbarLink from "../ui/NavbarLink";
import { BsCart4 } from "react-icons/bs";
import { IoMdHeart } from "react-icons/io";
import { FaUser } from "react-icons/fa";

interface LinkType {
  to: string;
  text: string;
}

const navlinks: LinkType[] = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/signup",
    text: "Collections",
  },
  {
    to: "/signin",
    text: "About",
  },
  {
    to: "/signin",
    text: "SignIn",
  },
];

const Navbar = () => {
  return (
    <header className=" h-30 z-50  shadow-md flex items-center justify-between px-8 lg:py-4 py-2">
      <h1 className="w-3/12 ">
        <a href="">
          <img
            src={Logo}
            className="h-6 w-auto hover:text-green-500 duration-200"
          />
        </a>
      </h1>

      <nav className="nav text-lg hidden lg:block">
        <ul className="flex items-center ">
          {navlinks.map((link) => (
            <NavbarLink to={link.to}>{link.text}</NavbarLink>
          ))}
        </ul>
      </nav>

      <div className="w-3/12 flex  justify-end px-3 md:justify-start">
        <Link to="/" className="text-2xl p-1 hover:text-green-500 duration-200">
          <FaUser />
        </Link>
        <Link
          to="/"
          className="text-2xl p-1 hover:text-green-500 duration-200 text-red-700"
        >
          <IoMdHeart />
        </Link>

        <Link to="/" className="text-2xl p-1 hover:text-green-500 duration-200">
          <BsCart4 />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
