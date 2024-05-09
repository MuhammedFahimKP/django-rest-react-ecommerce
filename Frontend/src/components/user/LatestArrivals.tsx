import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import ProductCard from "./ProductCard";
import apiClient from "../../services/api-client";

export interface LatestArrival {
  name: string;
  img: string;
  brand: string;
}

const LatestArrivals = () => {
  const [latestArrivals, setLatestArrivals] = useState<LatestArrival[] | []>(
    []
  );

  useEffect(() => {
    apiClient
      .get("shop/product-latest/")
      .then((res: AxiosResponse) => {
        setLatestArrivals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(latestArrivals);

  return (
    <>
      {/* title */}
      <div className="text-center p-10">
        <h1 className=" text-3xl lg:text-6xl  mb-4 font-pacifico">
          Latest Arrivals
        </h1>
        {/* <h1 className="text-3xl">Tailwind CSS</h1> */}
      </div>

      <div className="grid grid-flow-row  lg:gap-8 px-2  lg:px-56  bg-blue-400 text-neutral-600 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
        {latestArrivals.map((item: LatestArrival) => (
          <div className="my-8 rounded hover:-translate-y-1 bg-red-500 p-0 w-40 lg:w-80 text-ellipsis ">
            <a href="link" className="cursor-pointer">
              <figure>
                {/* Image */}
                <img
                  src={item.img}
                  className="rounded-t h-40 lg:h-80 w-full object-cover"
                />
                <figcaption className="p-4">
                  {item.name}
                  <p
                    className="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300"
                    x-text="post.title"
                  >
                    {/* Post Title */}
                  </p>
                  {/* Description */}
                  <small
                    className="leading-5 text-gray-500 dark:text-gray-400"
                    x-text="post.description"
                  >
                    {item.brand}
                  </small>
                </figcaption>
              </figure>
            </a>
          </div>
        ))}
      </div>

      <div className="flex items-center  justify-center bg-red-500 align-baseline ">
        {latestArrivals.map((product: LatestArrival) => (
          <div
            className="max-w-xs bg-white 
                      rounded-lg overflow-hidden
                      shadow-lg card card4"
          >
            <img className="w-full" src={product.img} alt="Product Image" />
            <div className="p-4">
              <h3
                className="text-xl font-semibold
                             text-gray-800"
              >
                Product Name 4
              </h3>
              <p className="text-gray-600 mt-2">
                here content goes for the card 4
              </p>
              <p className="text-gray-700 font-bold mt-2">$49.99</p>
              <button
                className="bg-blue-500 text-white 
                             font-semibold py-2 px-4 mt-4 
                             rounded-lg hover:bg-blue-600
                             transition-all duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
