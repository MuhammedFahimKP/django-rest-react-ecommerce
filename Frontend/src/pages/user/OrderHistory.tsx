import { useState, useEffect } from "react";
import { useData } from "../../hooks";
import { OrderFetchResponse, OrderItem as OrderItemProps } from "../../@types";
import { getDateAndDay, getDateAndTime } from "../../utils/other-utils";
import OrderStatus from "../../components/user/OrderStatus";

const OrderItem = ({ id, product, quantity }: OrderItemProps) => {
  return (
    <div className="relative  justify-between  rounded-lg bg-white  p-2 md:p-4  sm:flex sm:justify-start">
      <img
        src={product.product.img}
        alt={name + "-cart" + "-image"}
        className="w-full  h-80  md:w-44  md:h-44  overflow-hidden  rounded-lg "
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">
            {product.product.name}
          </h2>
          <p className="mt-1 text-xs text-gray-700">{product.product.brand}</p>
          <p className="mt-1 text-xs text-gray-700">
            {product.color} - {product.size}
          </p>

          <p className="mt-1 text-xs text-gray-700">No {quantity}</p>

          <p className="mt-1 text-xs text-gray-700">
            MRP {product.price} per pcs
          </p>
        </div>
      </div>
    </div>
  );
};

const Order = ({
  id,
  orders,
  total_amount,
  payment,
  status,
  created,
  expected_delivery,
}: OrderFetchResponse) => {
  const [expeted, setExpeted] = useState<[string, string] | null>(null);
  const [_created, setCreated] = useState<null | string>(null);

  useEffect(() => {
    const newDate = new Date(created);

    setCreated(
      newDate.toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 24-hour format
      })
    );
    expected_delivery && setExpeted(getDateAndDay(expected_delivery));
  }, [created, expected_delivery]);
  return (
    <div
      className={`w-full md:w-2/3 lg:1/2 rounded-lg border-2  border-gray-200 font-ubuntu  py-4 text-sm md:text-md ${
        status === "Cancelled" && "opacity-60"
      }`}
    >
      <div className="flex flex-col gap-4  lg:gap-2 ">
        <div className="flex flex-col md:items-center md:flex-row px-4 gap-2 lg:gap-0 md:justify-between ">
          <h1 className="">Order id</h1>
          <h1 className="">{id}</h1>
        </div>

        <div className="flex flex-col lg:items-center lg:flex-row gap-2 lg:gap-0  px-4 justify-between ">
          <OrderStatus
            expected_delivery={expected_delivery}
            expeted={expeted}
            status={status}
          />
          {_created && (
            <p className="text-sm">
              orderd on{" "}
              {_created?.split(",")[0] + " at " + _created?.split(",")[1]}
            </p>
          )}
        </div>

        <div className="flex   flex-col  px-4 justify-between  gap-2 lg:gap-0">
          <h1 className="">PAYMENT Mode {payment}</h1>
          <h1 className="">Total {total_amount}</h1>
        </div>

        {status === "Placed" && (
          <div className="px-4  text-red-500">Cancel </div>
        )}
      </div>

      <div className="flex flex-col border-t-2 border-t-gray-200 mt-4  items-center justify-center w-full p-2 md:p-0 ">
        <div className="w-full lg:w-3/4 flex flex-col items-center justify-center gap-4 ">
          {orders.map(({ id, product, quantity }: OrderItemProps) => (
            <OrderItem key={id} id={id} product={product} quantity={quantity} />
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderHistory = () => {
  const { data } = useData<OrderFetchResponse>("orders/");

  return (
    <div className="container mx-auto md:p-4">
      <h1 className="text-2xl font-bold mb-4">Order history</h1>
      <p className="mb-6">
        Check the status of recent orders, manage returns, and discover similar
        products
      </p>
      <div className="bg-white p-2 flex flex-col gap-4 items-center ">
        {/* Repeat similar structure for Nomad Shopping Tote */}
        {data.map(
          ({
            created,
            expected_delivery,
            id,
            orders,
            payment,
            payment_status,
            status,
            total_amount,
          }: OrderFetchResponse) => (
            <Order
              created={created}
              expected_delivery={expected_delivery}
              id={id}
              orders={orders}
              payment={payment}
              payment_status={payment_status}
              status={status}
              total_amount={total_amount}
            />
          )
        )}
      </div>
      {/* Repeat similar structure for the second order */}
    </div>
  );
};

export default OrderHistory;
export { Order };
