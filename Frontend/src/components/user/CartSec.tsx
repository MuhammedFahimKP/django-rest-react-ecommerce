import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getCartItems } from "../../store/cartSlice";

import CartCard from "../../ui/user/CartCard";

import { RootState } from "../../store";

import { CartItem } from "../../types";

interface Props {
  onClose: () => void;
}

const CartSec = ({ onClose }: Props) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const { items, totalprice } = useSelector(
    (state: RootState) => state.cartSlice
  );

  console.log(items);

  return (
    <div className="fixed inset-0 w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] font-[sans-serif] ">
      <div className="w-full max-w-md bg-white shadow-lg relative ml-auto h-screen">
        <div className="overflow-scroll no-scrollbar   p-6 h-[calc(100vh-135px)]">
          <div className="flex items-center gap-4 text-gray-800">
            <h3 className="text-2xl font-bold flex-1">Shopping cart</h3>
            <button onClick={() => onClose()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 ml-2 cursor-pointer shrink-0 fill-black hover:fill-red-500"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                />
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                />
              </svg>
            </button>
          </div>

          {items.length > 0 &&
            items.map((item: CartItem) => (
              <CartCard
                id={item.id}
                color={item.color}
                size={item.size}
                img={item.img}
                brand={item.brand}
                quantity={item.quantity}
                name={item.name}
                price={item.price}
                stock={item.stock}
                sub_total={item.sub_total}
              />
            ))}
        </div>
        <div className="p-6 absolute bottom-0 w-full border-t bg-white">
          <ul className="text-[#333] divide-y">
            <li className="flex flex-wrap gap-4 text-md font-bold">
              Total <span className="ml-auto"> {totalprice}</span>
            </li>
          </ul>
          <button
            type="button"
            className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSec;
