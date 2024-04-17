import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import ProductCard from "./ProductCard";

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
    axios.get("/latestArrivel.json").then((res: AxiosResponse) => {
      setLatestArrivals(res.data);
    });
  }, []);

  return (
    <>
      {/* title */}
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4">Latest Arrivals</h1>
        {/* <h1 className="text-3xl">Tailwind CSS</h1> */}
      </div>
      {/* ✅ Grid Section - Starts Here 👇 */}
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {latestArrivals.map((product: LatestArrival) => (
          <ProductCard
            name={product.name}
            img={product.img}
            brand={product.brand}
          />
        ))}
      </section>
      {/* 🛑 Grid Section - Ends Here */}
      {/* credit */}
      <div className="text-center py-20 px-10">
        <h2 className="font-bold text-2xl md:text-4xl mb-4">
          Thanks to{" "}
          <a
            href="https://unsplash.com/@nixcreative"
            className="underline font-black"
          >
            Tyler Nix
          </a>{" "}
          for those AMAZING product images!
        </h2>
      </div>
    </>
  );
};

export default LatestArrivals;
