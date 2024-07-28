import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispact } from "../../store";

import { updateCartItem, deletCartItem } from "../../thunks";

import { CartItem as Props } from "../../@types";

import toast from "react-hot-toast";

import ErrorText from "../../ui/user/ErrorText";
import SuccessAlert from "../../ui/alerts/SuccessAlert";

const CartItem = ({
  id,
  brand,
  color,
  img,
  name,
  price,
  quantity,
  size,
  subtotal,
}: Props) => {
  const { itemErrors } = useSelector((state: RootState) => state.cartSlice);
  const [_quantity, setQuantity] = useState(0);

  const dispatch = useDispatch<AppDispact>();

  useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);

  const deleteItem = (id: string) => {
    toast.custom((t) => <SuccessAlert successText="Item Removed" toast={t} />);
    dispatch(deletCartItem(id));
  };

  const handleUpdatedQuantity = (qunt: number) => {
    if (qunt === 0) {
      deleteItem(id);
      return;
    }

    dispatch(updateCartItem({ id, quantity: qunt }));
  };

  const incrementCartItem = () => handleUpdatedQuantity(_quantity + 1);

  const decrementCartItem = () => handleUpdatedQuantity(_quantity - 1);

  return (
    <div className="relative border-2 border-gray-200 justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={img}
        alt={name + "-cart" + "-image"}
        className="w-full h-80  md:w-44  md:h-44  overflow-clip  rounded-lg "
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{name}</h2>
          <p className="mt-1 text-xs text-gray-700">{brand}</p>
          <p className="mt-1 text-xs text-gray-700">
            {color} - {size}
          </p>
          <p className="mt-1 text-xs text-gray-700">MRP {price} per pcs</p>
        </div>
        <div className="mt-4 flex justify-between text-sm sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-black hover:text-white"
              onClick={decrementCartItem}
            >
              {" "}
              -{" "}
            </span>
            <div className="h-7 w-7 border bg-white flex justify-center items-center outline-none">
              {_quantity}
            </div>
            <span
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-black hover:text-white"
              onClick={incrementCartItem}
            >
              {" "}
              +{" "}
            </span>
          </div>

          <div className="md:absolute md:bottom-5 md:right-5  flex items-center space-x-4">
            <p className="text-sm">MRP {subtotal} </p>
            <svg
              onClick={() => deleteItem(id)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        {itemErrors[id] && (
          <div className="md:absolute   md:bottom-10 md:right-5 mt-2  flex items-center space-x-4">
            <ErrorText>{itemErrors[id]} </ErrorText>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
