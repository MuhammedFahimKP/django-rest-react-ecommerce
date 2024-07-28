import { useState } from "react";

import { useDispatch } from "react-redux";

import type { AppDispact } from "../../store";

import { paymentOptionSelected } from "../../slices/checkoutSlice";

import type { PaymentOptions } from "../../@types";

import { Radio } from "@material-tailwind/react";

import RazorPayLogo from "../../assets/logo/razorpay.svg";
import CODLogo from "../../assets/logo/cash-on-delivery_12463342.png";

import Accordian from "../../ui/user/Accordian";

interface Props {
  opener: boolean;
}

const PaymentOption = ({ opener }: Props) => {
  const PAY_OPTIONS: { [key: string]: PaymentOptions } = {
    RAZORPAY: "RAZOR PAY",
    COD: "COD",
  };
  const [selectedPAYOption, setSelectedPAYOption] = useState(
    PAY_OPTIONS.RAZORPAY
  );

  const dispatch = useDispatch<AppDispact>();

  return (
    <Accordian title="Payment Options" opener={opener}>
      <div className="flex flex-col md:flex-row   px-6 gap-5">
        <div
          className="relative flex-1  flex items-center gap-8 p-4  shadow-lg rounded-md  border-2  border-gray-200 "
          onClick={() => {
            selectedPAYOption !== PAY_OPTIONS.RAZORPAY &&
              setSelectedPAYOption(PAY_OPTIONS.RAZORPAY);
          }}
        >
          <Radio
            placeholder="payment_radio_1"
            name="payment"
            crossOrigin={undefined}
            color="blue"
            checked={selectedPAYOption === PAY_OPTIONS.RAZORPAY}
          />
          <img src={RazorPayLogo} className="overflow-hidden h-6" />
        </div>
        <div
          className="relative flex-1 flex  items-center p-4  shadow-lg rounded-md border-2  border-gray-200 "
          onClick={() => {
            selectedPAYOption !== PAY_OPTIONS.COD &&
              setSelectedPAYOption(PAY_OPTIONS.COD);
          }}
        >
          <Radio
            placeholder="payment_radio_1"
            name="payment"
            crossOrigin={undefined}
            color="blue"
            checked={selectedPAYOption === PAY_OPTIONS.COD}
          />
          <img src={CODLogo} className="overflow-hidden h-10 " />

          <p className="text-xl "> Cash On Delivery </p>
        </div>
      </div>

      {selectedPAYOption == PAY_OPTIONS.COD && (
        <div className="bg-red-100 mx-10 text-sm p-4 rounded-md text-black mt-4">
          <p className="text-medium ">
            Pay now and save the trouble of paying when the Delivery Associate
            arrives. You can ask the DA to leave the order at your doorstep/hand
            it over to a family member/ neighbor
          </p>
        </div>
      )}
      {selectedPAYOption && (
        <div className="px-7 ">
          <button
            className="bg-black px-4   rounded-md text-sm  py-1 text-white"
            onClick={() => {
              dispatch(paymentOptionSelected(selectedPAYOption));
            }}
          >
            use this payment option
          </button>
        </div>
      )}
    </Accordian>
  );
};

export default PaymentOption;
