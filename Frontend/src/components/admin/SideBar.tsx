import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useWindowDimensions } from "../../hooks";

import { HiOutlineChartBar } from "react-icons/hi";
import DropDownBtn from "../../ui/admin/DropDownBtn";
import { FaShopify } from "react-icons/fa";
import {
  PiTrademark,
  PiPantsFill,
  PiTShirtLight,
  PiPackageFill,
} from "react-icons/pi";
import { AiFillProduct } from "react-icons/ai";

import { CgColorPicker } from "react-icons/cg";

import { FaUserGroup } from "react-icons/fa6";

const SideBar = () => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  if (width < 900) {
    alert(width);
    return null;
  }

  return (
    <div className="w-64  lg:w-1/6 min-h-screen fixed mt-20    bg-white   z-50  my-4  flex flex-col items-center gap-4  py-4  border-r-[1px]">
      <div
        onClick={() => navigate("/admin/")}
        className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
      >
        <HiOutlineChartBar className="" />
        Home
      </div>

      <DropDownBtn title="Store" icon={<FaShopify className="text-lg" />}>
        <div
          onClick={() => navigate("product/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <AiFillProduct className="" />
          Product
        </div>
        <div
          onClick={() => navigate("brand/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <PiTrademark className="" />
          Brands
        </div>

        <div
          onClick={() => navigate("category/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <PiPantsFill className="" />
          Categories
        </div>

        <div
          onClick={() => navigate("color/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <CgColorPicker className="" />
          Colors
        </div>

        <div
          onClick={() => navigate("size/")}
          className="flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
        >
          <div className="flex items-center gap-1">
            <PiTShirtLight className="h-5 w-4" />
            <PiTShirtLight className="h-3 w-4" />
          </div>
          Sizes
        </div>
      </DropDownBtn>

      <div
        onClick={() => navigate("user/")}
        className=" flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
      >
        <FaUserGroup className="" />
        Users
      </div>

      <div
        onClick={() => navigate("orders/")}
        className=" flex flex-row  md:hover:bg-gray-200  hover:cursor-pointer gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto"
      >
        <PiPackageFill className="" />
        Orders
      </div>
    </div>
  );
};

export default SideBar;
