import { useDispatch } from "react-redux";

import { updateCartItem } from "../../thunks";

import type { AppDispact } from "../../store";

import { CartItem as Props } from "../../@types";

import { FaIndianRupeeSign } from "react-icons/fa6";

import CheckoutItemQuantityBtn from "../../ui/user/CheckoutItemQuantityBtn";

const NewCheckoutItem = ({
  id,
  brand,
  color,
  img,
  name,
  quantity,
  price,
  size,

  subtotal,
}: Props) => {
  const dispatch = useDispatch<AppDispact>();

  const inCrement = () => {
    dispatch(updateCartItem({ id: id, quantity: quantity + 1 }));
  };

  const deCrement = () => {
    dispatch(updateCartItem({ id: id, quantity: quantity - 1 }));
  };

  return (
    <div className="relative flex  rounded-lg bg-white flex-col md:flex-row   bg-flex border-2 border-gray-200  shadow-lg">
      <img
        className="md:m-2 md:h-24 md:w-28 w-full    h-72 rounded-md border object-fill object-center"
        src={img}
        // src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt=""
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold ">{name}</span>
        <p className="float-right text-xs text-gray-400">{brand}</p>
        <span className="float-right text-sm text-gray-400">
          {color} - {size}
        </span>

        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 ">
            <p className="text-sm ">{price}</p>
            <CheckoutItemQuantityBtn
              quantity={quantity}
              onIncrement={() => inCrement()}
              onDecrment={() => deCrement()}
            />
          </div>
          <div className="text-lg font-bold flex items-center ">
            {" "}
            <FaIndianRupeeSign /> <p>{subtotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCheckoutItem;
