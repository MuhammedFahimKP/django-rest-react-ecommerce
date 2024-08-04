import { useEffect, Fragment } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispact } from "../../store";

import { WishlistItem } from "../../@types";
import { getWishlist } from "../../thunks";
import Navbar from "../../components/user/Navbar";
import Footer from "../../components/user/Footer";
import CartItemSkeleton from "../../components/skeletons/CartItemSkeleton";
import WishListItem from "../../components/user/WishListItem";
import EmpytBag from "../../ui/user/EmpytBag";
import { makeArrayFromRange } from "../../utils/other-utils";

const WishList = () => {
  const { items, error, loading } = useSelector(
    (state: RootState) => state.wishlistSlice
  );
  const dispatch = useDispatch<AppDispact>();

  const skeletonArray = makeArrayFromRange(5);

  useEffect(() => {
    dispatch(getWishlist());
  }, []);

  return (
    <Fragment>
      <div className="lg:h-[72px] h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => null} />
      </div>
      <div className="min-h-screen font-ubuntu pt-5">
        <h1 className="mb-5  ml-6 text-2xl ">Wishlist </h1>
        {error === null && loading === false && items.length === 0 && (
          <EmpytBag context="Wishlist Is Empty" />
        )}
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {loading &&
              skeletonArray.map((_, index) => (
                <CartItemSkeleton key={"sekelton-" + index + "-cart-item"} />
              ))}

            {items.map((item: WishlistItem) => (
              <WishListItem id={item.id} product={item.product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default WishList;
