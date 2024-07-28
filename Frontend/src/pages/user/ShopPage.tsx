import { useState, useEffect } from "react";
import { ProductResponseData } from "../../@types";
import { useStoreProduct } from "../../hooks";
import Navbar from "../../components/user/Navbar";
import FilterSideBar from "../../components/user/FilterSideBar";
import Footer from "../../components/user/Footer";

import { AiOutlineClose } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { getAllSearchParams } from "../../utils/other-utils";

const ProductCard = ({
  id,
  brand,
  categoery,
  colors,
  img,
  name,
  slug,
}: ProductResponseData) => {
  return (
    <div className="bg-white border overflow-hidden rounded-lg group  duration-200s cursor-pointer hover:border-black transition-all relative">
      <div className="bg-gray-50  h-[350px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 ">
        <img
          src={img}
          alt={name}
          className="h-full w-full object-cover object-top "
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg md:truncate group-hover:text-pretty ">{name}</h3>
        <h3 className="text-sm mt-2 text-gray-400 ">{brand}</h3>
        <h3 className="text-sm mt-2 ">{categoery}</h3>
        <h3 className="text-lg  ">{}</h3>
        <div className="z-50 w-full flex items-center justify-center px-4  gap-2 ">
          {colors.slice(0, 5).map((color) => (
            <span
              className="size-6 rounded-md"
              style={{ backgroundColor: `${color}` }}
            ></span>
          ))}
          {colors.length > 5 && (
            <h1 className="text-md underline decoration-blue-500 ">more ...</h1>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="w-10 h-10  bg-gray-100 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              className="fill-gray-800 inline-block"
              viewBox="0 0 64 64"
            >
              <path
                d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                data-original="#000000"
              />
            </svg>
          </div>
          <h4 className="text-lg ">starting 2500</h4>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  const { data, updateFilters } = useStoreProduct(100);

  const [showFilter, setShowFilter] = useState(false);
  const [productFilterParams, setProductFilterParams] = useSearchParams({});

  useEffect(() => {
    updateFilters(getAllSearchParams(productFilterParams));
  }, [productFilterParams]);

  const setFilterParams = (key: string, value: string) =>
    setProductFilterParams((prevParam: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParam);

      if (newParams.has(key)) {
        // If the key exists, append the new value with a comma
        const existingValue = newParams.get(key);
        newParams.set(key, `${existingValue},${value}`);
      } else {
        // If the key does not exist, add the key-value pair
        newParams.set(key, value);
      }

      return newParams;
    });

  const removeFilterParams = (key: string, value: string) =>
    setProductFilterParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (newParams.has(key)) {
        // Get the existing values for the key
        const existingValue = newParams.get(key);
        const valuesArray = existingValue?.split(",");

        // Remove the specified value
        const newValuesArray = valuesArray
          ? valuesArray.filter((param) => param !== value)
          : null;

        // If the new array is empty, remove the key; otherwise, update it
        if (newValuesArray && newValuesArray.length > 0) {
          newParams.set(key, newValuesArray.join(","));
        } else {
          newParams.delete(key);
        }
      }

      return newParams;
    });

  return (
    <>
      <div className="lg:h-20  h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => false} />
      </div>{" "}
      <div className="relative">
        <div className=" p-4 font-ubuntu  mx-auto lg:max-w-5xl md:max-w-3xl max-w-lg">
          <h2 className="text-4xl  mb-12">Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 mx-auto min-h-[80vh] ">
            {data.map(
              ({
                id,
                brand,
                categoery,
                colors,
                discription,
                img,
                name,
                slug,
              }: ProductResponseData) => (
                <ProductCard
                  id={id}
                  brand={brand}
                  colors={colors}
                  categoery={categoery}
                  discription={discription}
                  img={img}
                  name={name}
                  slug={slug}
                  key={id + "product"}
                />
              )
            )}
          </div>
        </div>

        <button
          onClick={() => setShowFilter(!showFilter)}
          className="absolute top-14  md:top-28  bg-white left-3  md:left-8 text-black shadow-xl border-2 border-gray-200 px-6 py-2 rounded-lg opacity-30 hover:opacity-100 lg:opacity-100"
        >
          Filters
        </button>
        {showFilter && (
          <div
            className="fixed min-h-screen overflow-scroll top-20 left-0  backdrop-brightness-50  w-full py-8  flex items-start justify-center"
            onClick={() => {
              showFilter && setShowFilter(false);
            }}
          >
            <FilterSideBar
              searchParams={productFilterParams}
              removeParams={removeFilterParams}
              setParams={setFilterParams}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
