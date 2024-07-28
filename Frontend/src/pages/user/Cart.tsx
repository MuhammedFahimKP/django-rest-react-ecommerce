import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispact } from "../../store";

import type { CartItem as Item } from "../../@types";

import { getCartItems } from "../../thunks";

import { makeArrayFromRange } from "../../utils/other-utils";

import Navbar from "../../components/user/Navbar";

import Footer from "../../components/user/Footer";

import CartItem from "../../components/user/CartItem";

import CartItemSkeleton from "../../components/skeletons/CartItemSkeleton";

import CartSubTotal from "../../components/user/CartSubTotal";

import CartSubTotalSkeleton from "../../components/skeletons/CartSubTotalSkeleton";

import EmpytBag from "../../ui/user/EmpytBag";

const Cart = () => {
  const dispatch = useDispatch<AppDispact>();

  const { cart_items, loading, error } = useSelector(
    (state: RootState) => state.cartSlice
  );
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const skeletonArray = makeArrayFromRange(4);

  return (
    <>
      <div className="lg:h-[72px] h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => null} />
      </div>
      <div className="min-h-screen font-ubuntu pt-5">
        <h1 className="mb-5  ml-6 text-2xl ">Cart </h1>
        {error === null && loading === false && cart_items.length === 0 && (
          <EmpytBag context="Cart Is Empty" />
        )}
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {loading &&
              skeletonArray.map((_, index) => (
                <CartItemSkeleton key={"sekelton-" + index + "-cart-item"} />
              ))}

            {cart_items.map((item: Item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.img}
                price={item.price}
                brand={item.brand}
                color={item.color}
                quantity={item.quantity}
                size={item.size}
                stock={item.stock}
                subtotal={item.subtotal}
              />
            ))}
          </div>
          {/* Sub total */}
          {loading ? (
            <CartSubTotalSkeleton />
          ) : (
            cart_items.length !== 0 && <CartSubTotal />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
