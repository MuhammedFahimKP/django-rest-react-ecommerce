import { HiOutlineChartBar } from "react-icons/hi";
import DropDownBtn from "../../ui/admin/DropDownBtn";
import { FaShopify } from "react-icons/fa";

const sidebar = () => {
  return (
    <div className="w-1/6 min-h-screen   my-4 mt-0 flex flex-col items-center gap-4  py-4  border-r-[1px]">
      <div className="flex flex-row  md:hover:bg-gray-200  gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto">
        <HiOutlineChartBar className="" />
        Home
      </div>

      <DropDownBtn title="Store" icon={<FaShopify className="text-lg" />}>
        <div className="flex flex-row  md:hover:bg-gray-200  gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto">
          <HiOutlineChartBar className="" />
          Home
        </div>
        <div className="flex flex-row  md:hover:bg-gray-200  gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto">
          <HiOutlineChartBar className="" />
          Home
        </div>
      </DropDownBtn>

      <div className=" flex flex-row  md:hover:bg-gray-200  gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto">
        <HiOutlineChartBar className="" />
        Home
      </div>

      <div className=" flex flex-row  md:hover:bg-gray-200  gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto">
        <HiOutlineChartBar className="" />
        Home
      </div>

      <div className=" flex flex-row  md:hover:bg-gray-200  gap-2 items-center w-[95%]    rounded-lg text-slate-500 text-lg  pl-2 py-[1px] mx-auto">
        <HiOutlineChartBar className="" />
        Home
      </div>
    </div>
  );
};

export default sidebar;
