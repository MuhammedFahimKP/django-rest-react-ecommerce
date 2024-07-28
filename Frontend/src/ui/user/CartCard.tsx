import type { CartItem as Props } from "../../@types";
import { ImBin } from "react-icons/im";
import { updateCartItem } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";

const CartCard = ({
  id,
  color,
  img,
  name,
  brand,
  quantity,
  size,
  subtotal,
}: Props) => {
  const dispatch = useDispatch<any>();
  return (
    <div className="divide-y mt-4">
      <div className="flex items-start justify-between gap-4 py-8">
        <div className="flex max-sm:flex-col gap-6">
          <div className="h-40 bg-gray-100 border-2 w-40   overflow-hidden shadow-2xl rounded ">
            <img src={img} className="w-full h-full object-fill shrink-0" />
          </div>
          <div>
            <p className="text-md font-bold text-[#333]">{name}</p>
            <p className="text-gray-400 text-xs mt-1">{brand}</p>
            <h4 className="text-lg  text-[#333] mt-1">{size}</h4>
            <h4 className="text-lg  text-[#333] mt-1">{color}</h4>
            <h4 className="text-xl font-bold text-[#333] mt-1">{subtotal}</h4>
            <div className="mt-6 flex  justify-center items-center font-bold text-2xl">
              <button
                className="size-9 rounded-l-full   border-[1px] border-r-0 border-black "
                onClick={() =>
                  dispatch(updateCartItem({ id, quantity: quantity - 1 }))
                }
              >
                &minus;
              </button>
              <span className="size-9 flex justify-center items-center border-[1px] border-x-0 border-black">
                {quantity}
              </span>
              <button
                className="size-9  rounded-r-full  border-[1px] border-l-0 border-black"
                onClick={() =>
                  dispatch(updateCartItem({ id, quantity: quantity + 1 }))
                }
              >
                &#43;
              </button>
            </div>
          </div>
        </div>

        <button className="text-black text-2xl">
          <ImBin />
        </button>
      </div>
      <hr />
    </div>
  );
};

export default CartCard;
