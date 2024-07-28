import { useDispatch } from "react-redux";

import type { CartItem as Props } from "../../@types";
import QuantityBtn from "./QuantityBtn";
import { toast } from "react-hot-toast";
import ErrorAlert from "../alerts/ErrorAlert";
import { updateCartItem, deletCartItem } from "../../slices/cartSlice";
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
    <div className="flex my-1 mb-1 h-44  items-center   rounded-lg pr-4  border shadow-md border-gray-200  ">
      <div className=" w-[120px] h-40 p-[1px]  flex-shrink-0 overflow-hidden  border rounded-lg   ml-2  border-gray-200 border-spacing-4">
        <img
          src={img}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-cover bg-red-300 rounded-lg"
        />
      </div>

      <div className="ml-4 flex py-4 px-4  flex-col overflow-hidden truncat text-ellipsise ">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900  overflow-hidden ">
            <h3 className="text-sm  md:text-md  font-bold text-black truncate block ">
              <a href="#">{name}</a>
            </h3>
            <p className="ml-4">{subtotal}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 ">{brand}</p>
          <p className="mt-1 text-sm text-gray-500 ">{color}</p>
          <p className="mt-1 text-sm text-gray-500  ">{size}</p>
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
