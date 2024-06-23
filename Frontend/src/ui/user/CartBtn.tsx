import { useDispatch } from "react-redux";

import { showCartAlert } from "../../slices/alertSlice";
import { BsCart4 } from "react-icons/bs";

const CartBtn = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(showCartAlert())}>
      <BsCart4 className="text-2xl" />
    </button>
  );
};

export default CartBtn;
