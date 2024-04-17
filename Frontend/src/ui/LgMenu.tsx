import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import CartBtn from "./CartBtn";
const LgMenu = () => {
  return (
    <div className="flex flex-row-reverse items-center gap-5 mt-2">
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
  );
};

export default LgMenu;
