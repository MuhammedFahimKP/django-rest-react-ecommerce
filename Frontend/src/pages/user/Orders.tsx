import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllOrders } from "../../thunks/orderThunks";

import { AppDispact, RootState } from "../../store";
import type { OrderFetchResponse } from "../../@types";

import { Order } from "./OrderHistory";

const Orders = () => {
  const { orders } = useSelector((state: RootState) => state.orderSlice);

  const dispatch = useDispatch<AppDispact>();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getAllOrders({ signal: controller.signal }));

    return () => controller.abort();
  }, []);

  return (
    <div className="w-full lg:w-3/4">
      <div className="flex flex-col md:flex-row  justify-between items-start md:items-center mb-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-auto">
          <div className="relative border-2 rounded-lg overflow-hidden border-gray-200 shadow-lg"></div>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <select className="bg-gray-700 rounded px-4 py-2 w-full sm:w-auto">
            <option>Filter by: Completed</option>
          </select>
          <select className="bg-gray-700 rounded px-4 py-2 w-full sm:w-auto">
            <option>Last 7 days</option>
          </select>
        </div>
      </div>
      {/* Order Cards */}
      <div className="space-y-4">
        {/* Repeat this structure for each order */}
        {orders.map((item: OrderFetchResponse) => (
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
