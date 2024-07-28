import { useEffect, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

interface Props {
  quantity: number;
  onIncrement: () => void;
  onDecrment: () => void;
}

const CheckoutItemQuantityBtn = ({
  quantity,
  onIncrement,
  onDecrment,
}: Props) => {
  const [_quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);

  const onIncrease = () => {
    setQuantity(quantity + 1);
    onIncrement(_quantity);
  };
  const onDecrease = () => {
    if (_quantity == 1) {
      return;
    }
    setQuantity(_quantity - 1);
    onDecrment(_quantity);
  };

  return (
    <div className="relative flex items-center">
      <button
        type="button"
        onClick={() => onDecrease()}
        data-input-counter-decrement="counter-input"
        className="flex-shrink-0 bg-black text-white hover:opacity-60 transition-all duration-1000 inline-flex items-center justify-center  rounded-md h-5 w-5 "
      >
        <FiMinus className="w-2.5 h-2.5" />
      </button>
      <input
        type="text"
        id="counter-input"
        data-input-counter=""
        className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
        placeholder=""
        value={_quantity}
        required={false}
        disabled
      />
      <button
        type="button"
        id="increment-button"
        onClick={() => onIncrease()}
        data-input-counter-increment="counter-input"
        className="flex-shrink-0 bg-black text-white hover:opacity-60 transition-all duration-1000 inline-flex items-center justify-center  rounded-md h-5 w-5 "
      >
        <FiPlus className="w-2.5 h-2.5" />
      </button>
    </div>
  );
};

export default CheckoutItemQuantityBtn;
