import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { RootState } from "../../store";

import { TotalAmount } from "../../@types";
import apiClient from "../../services/api-client";

const CartSubTotal = () => {
  const { cart_items } = useSelector((state: RootState) => state.cartSlice);

  const [total, setTotal] = useState<TotalAmount>({
    gst: 0,
    orginal: 0,
    shipping: 0,
    total: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<TotalAmount>("orders/total/", { signal: controller.signal })
      .then((res) => {
        setTotal({
          total: res.data.total,
          gst: res.data.gst,
          orginal: res.data.orginal,
          shipping: res.data.shipping,
        });
      });

    return () => controller.abort();
  }, [cart_items]);

  return (
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Subtotal</p>
        <p className="text-gray-700">MRP {total.orginal}</p>
      </div>
      <div className="mb-2 flex justify-between">
        <p className="text-gray-700">Shipping</p>
        <p className="text-gray-700">MRP {total.shipping}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700">GST</p>
        <p className="text-gray-700">MRP {total.gst}</p>
      </div>

      <hr className="my-4" />
      <div className="flex justify-between">
        <p className="text-lg font-bold">Total</p>
        <div className="">
          <p className="mb-1 text-lg font-bold">{total.total}</p>
        </div>
      </div>
      <button className="mt-6 w-full rounded-md bg-black py-1.5 font-medium text-white hover:opacity-65">
        Check out
      </button>
    </div>
  );
};

export default CartSubTotal;
