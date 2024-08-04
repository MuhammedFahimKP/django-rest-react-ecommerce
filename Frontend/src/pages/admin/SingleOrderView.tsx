import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleData } from "../../hooks";

import type { AdminSingleOrderModel } from "../../@types";

import { NotFoundContext } from "../../context";

import ShippingAddressCard from "../../components/admin/ShippingAddressCard";
import { useEffect } from "react";

import OrderItem from "../../components/admin/OrderItem";
import {
  getDateAndDay,
  getDateTimeFromTimeStamp,
} from "../../utils/other-utils";
import OrderStatus from "../../components/user/OrderStatus";

import DeliveredBtn from "../../components/admin/DeliveredBtn";
import apiClient from "../../services/api-client";

import toast from "react-hot-toast";

import SuccessAlert from "../../ui/alerts/SuccessAlert";
import NetworkErrorAlert from "../../ui/alerts/NetworkErrorAlert";

const SingleOrderView = () => {
  const { id } = useParams<string>();

  const notFoundContext = useContext(NotFoundContext);
  const [changed, setChanged] = useState(false);

  const { data, error } = useSingleData<AdminSingleOrderModel>(
    `admin/orders/${id}/`,
    0,
    undefined,
    [changed]
  );

  useEffect(() => {
    if (error && error === "Request failed with status code 404") {
      notFoundContext?.emitError();
    }

    return () => notFoundContext?.removeError();
  }, [error]);

  const handleDelivered = () => {
    apiClient
      .patch(`admin/orders/${id}/`, {
        status: "Delivered",
      })
      .then((res) => {
        res.status === 200 &&
          toast.custom((t) => (
            <SuccessAlert toast={t} successText={"Delivered"} />
          )) &&
          setChanged(!changed);
      })
      .catch(
        (err) =>
          err.message === "Network Error" &&
          toast.custom((t) => <NetworkErrorAlert toast={t} />)
      );
  };

  const handleCancel = () => {
    if (data?.status === "Cancelled") return;
    apiClient
      .patch(`admin/orders/${id}/`, {
        status: "Cancelled",
      })
      .then((res) => {
        res.status === 202 &&
          toast.custom((t) => (
            <SuccessAlert toast={t} successText={"Canceled"} />
          )) &&
          setChanged(!changed);
      })
      .catch(
        (err) =>
          err.message === "Network Error" &&
          toast.custom((t) => <NetworkErrorAlert toast={t} />)
      );
  };

  return (
    <section className="pt-5 mx-auto">
      <div className={`w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto`}>
        <div
          className={
            "main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full" +
            ` ${data?.status === "Cancelled" && " opacity-55"}`
          }
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
            <div className="data">
              <p className="font-semibold text-base leading-7 text-black">
                Order Id:{" "}
                <span className="text-indigo-600 font-medium">{data?.id}</span>
              </p>
              <p className="text-base text-black mt-4">
                Ordered on :{" "}
                <span className="text-gray-400 font-medium">
                  {" "}
                  {data?.created &&
                    getDateTimeFromTimeStamp(data?.created)?.split(",")[0] +
                      " at " +
                      getDateTimeFromTimeStamp(data?.created)?.split(",")[1]}
                </span>
              </p>
              <p className="text-base leading-7 text-black mt-4">
                {data?.expected_delivery && data?.status && (
                  <OrderStatus
                    status={data?.status}
                    expected_delivery={data?.expected_delivery}
                    expeted={getDateAndDay(data?.expected_delivery)}
                  />
                )}
              </p>
            </div>
            {data?.payment && data?.payment_status && data?.status && (
              <DeliveredBtn
                onClick={handleDelivered}
                payment={data?.payment}
                paymment_status={data?.payment_status}
                status={data?.status}
              />
            )}
          </div>
          <div className="w-full px-3 min-[400px]:px-6">
            {data?.orders.map((item) => (
              <OrderItem item={item} />
            ))}
          </div>
          {data && (
            <ShippingAddressCard
              alter_phone_no={data.address.alter_phone_no}
              city={data.address.city}
              id={data.address.id}
              landmark={data.address.landmark}
              phone_no={data.address.phone_no}
              pin_code={data.address.pin_code}
              place={data.address.place}
              state={data.address.state}
            />
          )}
          <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
            <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
              <button
                onClick={handleCancel}
                className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center  group text-md text-black bg-white transition-all duration-500 hover:text-red-600"
              >
                <svg
                  className={
                    `stroke-black transition-all duration-500 ` +
                    ` ${
                      data?.status != "Cancelled" &&
                      " group-hover:stroke-red-600"
                    }`
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width={22}
                  height={22}
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <path
                    d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                    stroke=""
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Cancel Order
              </button>
              <p className=" text-md text-gray-900 pl-6 py-3 max-lg:text-center">
                {data?.payment && data?.payment_status === "Paid"
                  ? `Paid Using ${data?.payment}`
                  : `Payment Pending  ${data?.payment} `}
              </p>
            </div>
            <p className=" text-md text-black py-6">
              Total Price:{" "}
              <span className="text-indigo-600"> MRP {data?.total_amount}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleOrderView;
