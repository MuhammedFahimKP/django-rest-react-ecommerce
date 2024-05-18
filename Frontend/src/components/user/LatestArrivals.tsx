import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import apiClient from "../../services/api-client";

export interface LatestArrival {
  name: string;
  img: string;
  brand: string;
}

function LatestCard({ name, img, brand }: LatestArrival) {
  return (
    <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 overflow-hidden w-40 md:w-72 rounded-md">
      <a href="#">
        <img
          src={img}
          alt="Product image"
          className="h-44 md:h-80 w-40  md:w-72 object-cover object-top"
        />
      </a>
      <div className="px-4 py-3 w-40 md:w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
        <p className="text-sm  md:text-lg font-bold text-black truncate block capitalize">
          {name}
        </p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">
            $149
          </p>
          <del>
            <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
          </del>
          <div className="ml-auto">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
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

      <div className="grid grid-cols-2  lg:grid-cols-3 place-items-center bg-red-400  min-w-sm   mx-auto mb-5 mt-5 gap-2 lg:gap-5 ">
        {latestArrivals.map((item: LatestArrival) => (
          <LatestCard brand={item.brand} img={item.img} name={item.name} />
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
