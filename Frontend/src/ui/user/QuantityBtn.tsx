import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface Props {
  value: number;
  onIncrement: (value: number) => void;
  onDecrement: (value: number) => void;
}

const QuantityBtn = ({ value, onIncrement, onDecrement }: Props) => {
  const [quantity, setQuantit] = useState(value);
  console.log(quantity);
  const onIncrease = () => {
    setQuantit(quantity + 1);
    onIncrement(quantity);
  };
  const onDecrease = () => {
    if (quantity == 1) {
      return;
    }
    setQuantit(quantity - 1);
    onDecrement(quantity);
  };

  return (
    <div className="custom-number-input h-8 w-32">
      <label
        htmlFor="custom-input-number"
        className="w-full text-gray-700 text-sm font-semibold"
      ></label>
      <div className="flex flex-row h-8 w-full rounded-lg relative bg-transparent mt-1">
        <button
          data-action="decrement"
          onClick={() => onDecrease()}
          className="bg-white text-black  font-bold text-lg font-bebas  flex items-center justify-center  w-20 rounded-l-full border-2  border-r-0 border-black cursor-pointer"
        >
          <MinusIcon className="h-5 w-5 text-black" />
        </button>
        <input
          type="text"
          className="focus:outline-none text-center w-full cursor-pointer bg-white border-y-2  border-black font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
          name="custom-input-number"
          value={quantity}
          disabled={true}
        />
        <button
          data-action="increment"
          onClick={() => onIncrease()}
          className="bg-white text-black  font-bold text-lg font-bebas flex items-center justify-center  w-20 rounded-r-full border-2 border-l-0  border-black cursor-pointer"
        >
          <PlusIcon className="h-5 w-5  text-black" />
        </button>
      </div>
    </div>
  );
};

export default QuantityBtn;
