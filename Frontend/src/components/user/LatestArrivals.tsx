import { useEffect, useState } from "react";

import apiClient, { type ApiClientResponse } from "../../services/api-client";
import type { LatestArrival } from "../../@types";

import LatestCard from "./LatestCard";

const LatestArrivals = () => {
  const [latestArrivals, setLatestArrivals] = useState<LatestArrival[] | []>(
    []
  );

  useEffect(() => {
    apiClient
      .get("shop/product-latest/")
      .then((res: ApiClientResponse) => {
        setLatestArrivals(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* title */}
      <div className="text-center p-10">
        <h1 className=" text-3xl lg:text-6xl  mb-4 font-pacifico">
          Latest Arrivals
        </h1>
        {/* <h1 className="text-3xl">Tailwind CSS</h1> */}
      </div>

      <div className="grid grid-cols-2  lg:grid-cols-3 place-items-center   min-w-sm   mx-auto mb-5 mt-5 gap-2 lg:gap-5 ">
        {latestArrivals.map((item: LatestArrival) => (
          <LatestCard
            id={item.id}
            brand={item.brand}
            img={item.img}
            name={item.name}
            slug={item.slug}
            color={item.color}
          />
        ))}
      </div>
    </>
  );
};

export default LatestArrivals;
