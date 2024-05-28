import { useDispatch } from "react-redux";

import type { CartItem as Props } from "../../types";
import QuantityBtn from "./QuantityBtn";
import { toast } from "react-hot-toast";
import ErrorAlert from "../alerts/ErrorAlert";
import { updateCartItem, deletCartItem } from "../../store/cartSlice";
import { AppDispact } from "../../store";

const NewCartItem = ({
  id,
  color,
  img,
  name,
  brand,
  quantity,
  stock,
  size,
  subtotal,
}: Props) => {
  const dispatch = useDispatch<AppDispact>();
  const increament = (quntity: number) => {
    if (quntity > stock) {
      toast.custom((toastObj) => (
        <ErrorAlert toast={toastObj} errorText="errorText" />
      ));

      return;
    }

    dispatch(updateCartItem({ id: id, quantity: quntity + 1 }));
  };

  const decreament = (quntity: number) => {
    dispatch(updateCartItem({ id: id, quantity: quntity - 1 }));
  };

  return (
    <div className="flex my-1 h-44  items-center  border-2 rounded-md pr-4  ">
      <div className="h-full w-[100x] flex-shrink-0 overflow-hidden rounded-l-md border border-gray-200">
        <img
          src={img}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-fill"
        />
      </div>

      <div className="ml-4 flex py-4 px-4  flex-col overflow-hidden truncat text-ellipsise ">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900  overflow-hidden ">
            <h3 className="text-sm  md:text-md font-ubuntu font-bold text-black truncate block ">
              <a href="#">{name}</a>
            </h3>
            <p className="ml-4">{subtotal}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 font-ubuntu">{brand}</p>
          <p className="mt-1 text-sm text-gray-500 font-ubuntu">{color}</p>
          <p className="mt-1 text-sm text-gray-500 font-ubuntu ">{size}</p>
        </div>

        <div className="flex flex-1 mt-4 items-center justify-between text-sm">
          <QuantityBtn
            value={quantity}
            onIncrement={increament}
            onDecrement={decreament}
          />

          <div className="flex">
            <button
              type="button"
              onClick={() => dispatch(deletCartItem(id))}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCartItem;
