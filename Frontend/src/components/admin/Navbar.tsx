import Logo from "../../assets/blackLogo.svg";
import { TbMenu2 } from "react-icons/tb";
import { MdHomeFilled } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-20 w-full  flex  items-center  align-baseline justify-start  px-3 gap-4   md:justify-between   md:px-36 border-b-[1px]">
      <div className="flex items-center justify-center mt-3">
        <button className="">
          <TbMenu2 className="size-8" />
        </button>
      </div>
      <div className="flex items-center justify-center align-middle">
        <img src={Logo} className="h-32  w-32 object-fill align-middle" />
      </div>
      <div className="md:flex items-center  gap-4 hidden ">
        <button className="flex items-center justify-center ">
          <FaUser className="size-5 " />
        </button>

        <button className="flex items-center justify-center ">
          <MdHomeFilled className="size-5 " />
        </button>

        <button className="flex items-center justify-center ">
          <FaUser className="size-5 " />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
