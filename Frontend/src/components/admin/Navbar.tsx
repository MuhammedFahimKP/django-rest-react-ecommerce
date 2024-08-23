import Logo from "../../assets/blackLogo.svg";
import { TbMenu2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="h-20 w-full fixed bg-white   flex  items-center z-50  align-baseline  px-3 gap-4   justify-start  md:justify-between   md:px-36 border-b-[1px]">
      <div className="flex items-center justify-center mt-3">
        <button className=" lg:invisible " onClick={() => alert("hai")}>
          <TbMenu2 className="size-8" />
        </button>
      </div>
      <div className="flex items-center justify-center align-middle">
        <img src={Logo} className="h-32  w-32 object-fill align-middle" />
      </div>
      <div className="flex items-center  gap-4  md:mr-0  md:ml-0  mr-0 ml-auto ">
        <button className="mt-2">
          <FaUser className="size-6 " />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
