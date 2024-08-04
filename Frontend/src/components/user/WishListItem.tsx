import { useState } from "react";

import { useDispatch } from "react-redux";

import { AppDispact } from "../../store";

import { deleteWishlistItem } from "../../thunks";

import { WishlistItem as Props } from "../../@types";

import toast from "react-hot-toast";

import SuccessAlert from "../../ui/alerts/SuccessAlert";
import apiClient from "../../services/api-client";
import NetworkErrorAlert from "../../ui/alerts/NetworkErrorAlert";

const WishListItem = ({ id, product }: Props) => {
  const [_quantity, setQuantity] = useState(1);

  const dispatch = useDispatch<AppDispact>();

  const deleteItem = (id: string) => {
    toast.custom((t) => (
      <SuccessAlert successText="Product Removed" toast={t} />
    ));
    dispatch(deleteWishlistItem(id));
  };

  const handleCart = () => {
    if (_quantity > 0) {
      apiClient
        .post("shop/cart/", {
          product: product.id,
          quantity: _quantity,
        })
        .then(() => {
          toast.custom((p) => (
            <SuccessAlert toast={p} successText="Product added To Cart " />
          )) && dispatch(deleteWishlistItem(id));
        })
        .catch((err) => {
          err?.message === "Network Error" &&
            toast.custom((t) => <NetworkErrorAlert toast={t} />);
        });
    }
  };

  const incrementCartItem = () => setQuantity(_quantity + 1);

  const decrementCartItem = () =>
    setQuantity((prev) => {
      prev - 1 === 0 && deleteItem(id);
      return prev - 1;
    });

  return (
    <div className="relative border-2 border-gray-200 justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={product.product.img}
        alt={name + "-cart" + "-image"}
        className="w-full h-80  md:w-44  md:h-44  overflow-clip  rounded-lg "
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">
            {product.product.name}
          </h2>
          <p className="mt-1 text-xs text-gray-700">{product.product.brand}</p>
          <p className="mt-1 text-xs text-gray-700">
            {product.color} - {product.size}
          </p>
          <p className="mt-1 text-xs text-gray-700">
            MRP {product.price} per pcs
          </p>

          <button
            onClick={handleCart}
            className="px-3  mt-10 text-sm py-1 bg-white text-text-black underline"
          >
            add to cart
          </button>
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
            <p className="text-sm">MRP {product.price * _quantity} </p>
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
      </div>
    </div>
  );
};

export default WishListItem;
