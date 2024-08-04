import { useEffect, useState } from "react";

import { usePaginatedOrder } from "../../hooks";

import type { OrderFetchResponse } from "../../@types";

import { Order } from "./OrderHistory";
import DropDownBtn from "../../ui/user/DropDownBtn";

import { useSearchParams } from "react-router-dom";
import {
  getAllSearchParams,
  generateYearsFromStart,
  makeObjFromArray,
} from "../../utils/other-utils";

import PaginationBtn from "../../ui/user/PaginationBtn";

const Orders = () => {
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

  const { data, pages, next, currentPage, prev } = usePaginatedOrder(
    2,
    0,
    {
      params: getAllSearchParams(orderFilters),
    },
    [orderFilters]
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
    <div className="w-full lg:w-3/4">
      <div className="flex flex-col md:flex-row  justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          <div className="relative border-2 rounded-lg overflow-hidden border-gray-200 shadow-lg"></div>
        </div>
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
      {/* Order Cards */}
      <div className="space-y-4">
        {/* Repeat this structure for each order */}
        <PaginationBtn
          onNext={next}
          onPrev={prev}
          currentPage={currentPage}
          totalPages={pages}
        />
        {data?.map((item: OrderFetchResponse) => (
          <Order
            orders={item.orders}
            created={item.created}
            expected_delivery={item.expected_delivery}
            id={item.id}
            payment={item.payment}
            payment_status={item.payment_status}
            status={item.status}
            total_amount={item.total_amount}
            key={item.id}
          />
        ))}

        {/* Repeat for other orders */}
      </div>
    </div>
  );
};

export default Orders;
