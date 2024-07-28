import { useEffect, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispact } from "../../store";

import { WishlistItem } from "../../@types";
import { getWishlist } from "../../thunks";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import WishListItem from "../../components/user/WishListItem";

const WishList = () => {
  const { items } = useSelector((state: RootState) => state.wishlistSlice);
  const dispatch = useDispatch<AppDispact>();

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  return (
    <Fragment>
      <div className="lg:h-20  h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => false} />
      </div>
      <section className="py-24 relative font-ubuntu">
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
            WishList
          </h2>
          {items.map((whishlistItem: WishlistItem) => (
            <WishListItem
              key={whishlistItem.id}
              id={whishlistItem.id}
              product={whishlistItem.product}
            />
          ))}

          <div className="flex flex-col md:flex-row items-center md:items-center justify-between lg:px-6 pb-6 border-b border-gray-200 max-lg:max-w-lg max-lg:mx-auto">
            <h5 className="text-gray-900 font-manrope font-semibold text-2xl leading-9 w-full max-md:text-center max-md:mb-4">
              Subtotal
            </h5>
            <div className="flex items-center justify-between gap-5 ">
              <button className="rounded-full py-2.5 px-3 bg-indigo-50 text-indigo-600 font-semibold text-xs text-center whitespace-nowrap transition-all duration-500 hover:bg-indigo-100">
                Promo Code?
              </button>
              <h6 className="font-manrope font-bold text-3xl lead-10 text-indigo-600">
                $440
              </h6>
            </div>
          </div>
          <div className="max-lg:max-w-lg max-lg:mx-auto">
            <p className="font-normal text-base leading-7 text-gray-500 text-center mb-5 mt-6">
              Shipping taxes, and discounts calculated at checkout
            </p>
            <button className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700 ">
              Checkout
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default WishList;
