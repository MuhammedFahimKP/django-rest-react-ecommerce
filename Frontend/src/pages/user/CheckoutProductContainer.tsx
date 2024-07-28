import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// import useRazorpay, { RazorpayOptions } from "react-razorpay";

import { useSingleData } from "../../hooks";

import type { RootState, AppDispact } from "../../store";

import { getCartItems } from "../../thunks/cartThunks";

import type { CartItem } from "../../@types";

import type { TotalAmount } from "../../@types";

import createOrderService from "../../services/order-service";

import Accordian from "../../ui/user/Accordian";

import NewCheckoutItem from "../../components/user/NewCheckoutItem";

import createPaymentService from "../../services/payment-services";

// import { useCallback } from "react";
// import useRazorpay, { type RazorpayOptions } from "react-razorpay";

// function App() {
//   const [Razorpay, isLoaded] = useRazorpay();

//   const createOrder = async () => {
//     return await apiClient.post("");
//   };

//   return (
//     <div>
//       <button className="bg-red-400" onClick={handlePayment}>
//         Click
//       </button>
//     </div>
//   );
// }

interface Props {
  opener: boolean;
}

const CheckoutProductContainer = ({ opener }: Props) => {
  const dispatch = useDispatch<AppDispact>();

  // const [Razorpay] = useRazorpay();

  // const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

  const { cart_items } = useSelector((state: RootState) => state.cartSlice);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const { data: total } = useSingleData<TotalAmount>(
    "orders/total/",
    undefined,
    undefined,
    [cart_items]
  );

  const orderServiceInstance = createOrderService();

  // const handlePayment = useCallback(
  //   (amount: number) => {
  //     const options: RazorpayOptions = {
  //       key: RAZORPAY_KEY,
  //       amount: amount.toString(),
  //       currency: "INR",
  //       name: "Wild FAB",
  //       description: "Checkout Payment",
  //       image: Logo,
  //       order_id: payment_id,
  //       handler: (res) => {
  //         orderServiceInstance.verifyRazorPayOrder(res);
  //       },

  //       callback_url: `${BASE_URL}orders/check/`,

  //       modal: {
  //         ondismiss() {
  //           orderServiceInstance.removeOrder();
  //         },
  //       },

  //       notes: {
  //         address: "WildFab PVLTD ",
  //       },
  //       theme: {
  //         color: "#3399cc",
  //       },
  //     };

  //     const rzpay = new Razorpay(options);
  //     rzpay.open();
  //     rzpay.on("payment_failed", () => {
  //       alert("failed");
  //     });
  //   },
  //   [Razorpay, payment_id]
  // );

  const handleClick = () => {
    const paymentInstance = createPaymentService();

    const { error } = orderServiceInstance.createOrder(
      paymentInstance.handlePayment
    );

    if (error) {
      alert(error);
    }
  };

  return (
    <>
      <Accordian title="Items" opener={opener}>
        {cart_items?.map(
          ({
            id,
            brand,
            color,
            img,
            name,
            price,
            quantity,
            size,
            stock,
            subtotal,
          }: CartItem) => (
            <NewCheckoutItem
              key={id}
              id={id}
              name={name}
              img={img}
              brand={brand}
              color={color}
              price={price}
              quantity={quantity}
              size={size}
              stock={stock}
              subtotal={subtotal}
            />
          )
        )}

        <div className="bg-inherit border-2 border-gray-200 shadow-lg text-black  p-4 rounded-lg">
          <h1 className="text-lg md:text-2xl  mb-4 font-bold">
            Order Summary{" "}
          </h1>
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col md:flex-row  items-center justify-between">
              <p className="text-sm md:text-lg font-medium">Orginal Price</p>
              <p className="text-sm md:text-lg font-medium">
                MRP {total?.orginal}
              </p>
            </div>
            <div className="flex flex-col md:flex-row  items-center justify-between">
              <p className="text-sm md:text-lg">GST(12%)</p>
              <p className="text-sm md:text-lg">MRP {total?.gst}</p>
            </div>
            <div className="flex flex-col md:flex-row  items-center justify-between">
              <p className="text-sm md:text-lg">
                Total( orginal + gst + shiping)
              </p>
              <p className="text-sm md:text-lg">MRP {total?.total}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleClick()}
          className="px-4 py-2 bg-black text-white mx-auto rounded-md"
        >
          Place The Order
        </button>
      </Accordian>
    </>
  );
};

export default CheckoutProductContainer;
