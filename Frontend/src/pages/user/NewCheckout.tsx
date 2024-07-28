import { useEffect } from "react";
import { useSelector } from "react-redux";

import { dispatch, type RootState } from "../../store";

import { getCartItems } from "../../thunks";

import Lottie from "lottie-react";

import emptyCartAnimation from "../../assets/lotties/emptyCartLottie.json";

import Navbar from "../../components/user/Navbar";
import ShippingAdressContainer from "../../components/user/ShippingAdressContainer";
import PaymentOption from "../../components/user/PaymentOption";
import CheckoutProductContainer from "./CheckoutProductContainer";

import DelayComponent from "../../components/DelayComponent";

const NewCheckout = () => {
  const { show } = useSelector((state: RootState) => state.checkoutSlice);

  const { cart_items, error, loading } = useSelector(
    (state: RootState) => state.cartSlice
  );

  useEffect(() => {
    dispatch(getCartItems());
    console.log(error, loading);
  }, []);

  return (
    <div className="no-scrollbar font-ubuntu">
      <div className="lg:h-20 bg-black h-16 mb-0 sticky top-0 z-50 w-full   ">
        <Navbar onOpen={() => false} />
      </div>
      {cart_items?.length === 0 && error === null && loading === false ? (
        <div className="w-full mt-36 mx-auto  flex flex-col items-center ">
          <Lottie className="size-72 " animationData={emptyCartAnimation} />
          <h1 className="text-2xl mt-4  font-pacifico">Shop Bag is Empty </h1>
        </div>
      ) : (
        <DelayComponent delay={2000}>
          <div className="bg-white text-black  ">
            <h1 className="mb-2 ml-6 mt-4 text-2xl font-ubuntu">Checkout</h1>
            <div className="flex flex-col items-center gap-8  ">
              {/* Left Column: Billing and Delivery */}
              {/* Billing Address */}
              {/* Delivery Address */}

              <div className="rounded-lg">
                {/* Delivery options */}

                <ShippingAdressContainer opener={show.address_show} />
                <PaymentOption opener={show.payment_show} />
                <CheckoutProductContainer opener={show.items_show} />

                {/* Payment Details */}
              </div>
              {/* Right Column: Order Summary */}
            </div>
          </div>
        </DelayComponent>
      )}
    </div>
  );
};

export default NewCheckout;
