import { useEffect, useState } from "react";
import { Order as Props } from "../../@types";
import { getDateAndDay } from "../../utils/other-utils";

const OrderItem = ({
  created,
  id,
  expected_delivery,
  payment,
  payment_status,
  status,
  total_amount,
}: Props) => {
  const [date, setDate] = useState<string | null>(null);
  const [expeted, setExpeted] = useState<[string, string] | null>(null);

  useEffect(() => {
    const newDate = new Date(created);

    setDate(
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
    <div className="bg-white  text-black border-2 border-gray-200   shadow-lg  rounded-lg p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 space-y-2 sm:space-y-0">
        <div>
          <span className="text-gray-400">Order ID: </span>
          <span className="font-semibold">#{id}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm">
            Cancel order
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded text-sm">
            Track order
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded text-sm">
            Order details
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between text-sm mb-2 space-y-1 sm:space-y-0">
        <span>
          Ordered at: {date?.split(",")[0] + " at" + date?.split(",")[1]}
        </span>
        <span>Email: name@example.com</span>
        <span>Payment method: {payment}</span>
      </div>
      {expeted && !["Cancelled", "Delivered"].includes(status) && (
        <div className="bg-black text-white text-sm p-2 rounded">
          Expected delivery on {expeted[0] + " " + expeted[1]}
        </div>
      )}
    </div>
  );
};

export default OrderItem;
