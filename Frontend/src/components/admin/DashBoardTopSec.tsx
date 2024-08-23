import useSWR from "swr";
import { ApiClientError, fetcher } from "../../services/api-client";

import type { AdminDataCount } from "../../@types";

import DashBoardCard from "./DashBoardCard";
import { AiFillProduct } from "react-icons/ai";
import { PiPackageFill } from "react-icons/pi";
import { FaUserGroup } from "react-icons/fa6";
import { PiTrademark } from "react-icons/pi";

const DashBoardTopSec = () => {
  const { data } = useSWR<AdminDataCount, ApiClientError>(
    "admin/get-count/",
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4     gap-2   mt-10  ">
      <DashBoardCard
        icon={
          <AiFillProduct className="leading-none top-5 size-8 text-white" />
        }
        title="Products"
        count={data?.products || 0}
      />

      <DashBoardCard
        icon={<PiTrademark className="leading-none top-5 size-8 text-white" />}
        title="Brands"
        count={data?.brand_count || 0}
      />
      <DashBoardCard
        icon={
          <PiPackageFill className="leading-none top-5 size-8 text-white" />
        }
        title="Orders"
        count={data?.orders_count || 0}
      />

      <DashBoardCard
        icon={<FaUserGroup className="leading-none top-5 size-8 text-white" />}
        title="Users"
        count={data?.users || 0}
      />
    </div>
  );
};

export default DashBoardTopSec;
