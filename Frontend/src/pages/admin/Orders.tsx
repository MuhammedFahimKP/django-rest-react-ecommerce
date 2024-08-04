import { useOutlet, useSearchParams } from "react-router-dom";

import DropDownBtn from "../../ui/user/DropDownBtn";

import { MdOutlineAdd } from "react-icons/md";

import OrdersList from "../../components/admin/OrdersList";
import { useState, useEffect } from "react";
import { usePaginatedOrder } from "../../hooks";
import {
  makeObjFromArray,
  generateYearsFromStart,
  getAllSearchParams,
} from "../../utils/other-utils";

const Orders = () => {
  const outlet = useOutlet();

  if (outlet) {
    return outlet;
  }

  const [orderFilters, setOrderFilters] = useSearchParams({});
  const [dateRangeFilterValues] = useState(
    makeObjFromArray<number>(generateYearsFromStart(2022))
  );

  useEffect(
    () =>
      setOrderFilters({
        payment: "RAZOR PAY",
        ordering: "-created",
        status: "Placed",
        created: "past_3_months",
      }),
    []
  );

  const handleFilterClick = (key: string, value: string) => {
    setOrderFilters((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);

      if (newParams.has(key)) {
        newParams.delete(key);
      }
      newParams.set(key, value);

      return newParams;
    });
  };

  return (
    <div className="w-5/6 bg-red-500 min-h-screen">
      <div className="flex flex-col   h-[35%]  lg:h-48  bg-[#f5f7fa] px-8 py-0 text-black ">
        <div className="mt-4 flex items-center justify-between lg:mt-8 h-fit   mb-10  ">
          <h1 className="font-ptsans font-bold text-xl  lg:text-4xl">Orders</h1>
        </div>
        {/* product count section  */}

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <DropDownBtn
            showTitle={true}
            selectedItem={orderFilters.get("payment")}
            handleParamChange={(value) => handleFilterClick("payment", value)}
            title="Payment Mode:"
            menuItems={{
              "RAZOR PAY": "RAZOR PAY",
              COD: "Cash On Delivery",
            }}
          />
          <DropDownBtn
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("status", value)}
            selectedItem={orderFilters.get("status")}
            title="Status:"
            menuItems={{
              Cancelled: "Cancelled",
              Delivered: "Delivered",
              Placed: "Placed",
            }}
          />

          <DropDownBtn
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("created", value)}
            selectedItem={orderFilters.get("created")}
            title=""
            menuItems={{
              ...dateRangeFilterValues,
              ...{ ["past_3_months"]: "Past 3 months" },
            }}
          />

          <DropDownBtn
            selectedItem={orderFilters.get("ordering")}
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("ordering", value)}
            title="Sort By:"
            menuItems={{
              "-created": "First Ordered ",
              status: "Status",
              "-status": "Status Reverse",
              payment: "Payment Type",
              "-payment": "Payment Type Reverse",
              created: "Last Ordered",
            }}
          />
        </div>
      </div>
      <OrdersList filteringParams={orderFilters} />
    </div>
  );
};

export default Orders;
