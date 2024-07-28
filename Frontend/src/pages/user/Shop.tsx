import { useEffect } from "react";
import { useWindowDimensions } from "../../hooks";
import type { ProductResponseData } from "../../@types";

import ProductCard from "../../components/user/ProductCard";

import { useSearchParams } from "react-router-dom";

import Navbar from "../../components/user/Navbar";
import BottmNavbar from "../../components/user/BottmNavbar";
import FilterSideBar from "../../components/user/FilterSideBar";
import SearchBox from "../../components/user/SearchBox";
import PageButton from "../../components/user/PageButton";
import { useStoreProduct } from "../../hooks";

// interface ShopParams {
//   name: string;
//   categoery: string | string[];
//   brand: string | string[];
//   size: string | string[];
//   color: string | string[];
// }

const Shop = () => {
  const { data, currentPage, error, loading, pages, next, prev } =
    useStoreProduct(6);

  const [productFilterParams, setProductFilterParams] = useSearchParams({});

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
    <div className="h-[100vh]">
      <div className="lg:h-20  h-16 bg-black mb-0 sticky top-0 z-50 w-full">
        <Navbar onOpen={() => false} />
      </div>
      <>
        <aside
          id="default-sidebar"
          className="fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <FilterSideBar
            removeParams={removeFilterParams}
            setParams={setFilterParams}
            searchParams={productFilterParams}
          />
        </aside>
        <div className="pl-2 ml-64">
          <div className="flex flex-col  w-full static    bg-red-700  pt-14  px-2">
            <div className="bg-red-300 flex flex-col-reverse items-center  py-4 normal gap-2 ">
              <h1 className="text-3xl font-pacifico">Results </h1>
              <SearchBox />
            </div>

            <div className="grid grid-cols-2  lg:grid-cols-3 place-items-center bg-red-400  min-w-sm   mx-auto mb-5 mt-5 gap-2 lg:gap-5 ">
              {data.map((item: ProductResponseData) => (
                <ProductCard
                  key={`shop-product-${item.id}`}
                  id={item.id}
                  brand={item.brand}
                  categoery={item.categoery}
                  discription={item.discription}
                  colors={item.colors}
                  min_price={item.min_price}
                  name={item.name}
                  img={item.img}
                  slug={item.slug}
                />
              ))}
            </div>

            <div className="bg-blue-400 flex  justify-end">
              <PageButton />
            </div>
          </div>
        </div>
      </>

      <BottmNavbar />
    </div>
  );
};

export default Shop;
