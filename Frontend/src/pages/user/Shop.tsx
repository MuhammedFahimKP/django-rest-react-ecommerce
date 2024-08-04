import { useEffect, useState } from "react";
import { useWindowDimensions } from "../../hooks";
import type { ProductResponseData } from "../../@types";

import ProductCard from "../../components/user/ProductCard";

import { useSearchParams } from "react-router-dom";

import Navbar from "../../components/user/Navbar";
import BottmNavbar from "../../components/user/BottmNavbar";
import FilterSideBar from "../../components/user/FilterSideBar";
import SearchBox from "../../components/user/SearchBox";
import PaginationBtn from "../../ui/user/PaginationBtn";
import { useStoreProduct } from "../../hooks";
import { getAllSearchParams } from "../../utils/other-utils";

// interface ShopParams {
//   name: string;
//   categoery: string | string[];
//   brand: string | string[];
//   size: string | string[];
//   color: string | string[];
// }

const Shop = () => {
  const [productFilterParams, setProductFilterParams] = useSearchParams({});
  const [showFilter, setShowFilter] = useState(false);

  const { width } = useWindowDimensions();
  const limit = 6;
  const { data, currentPage, pages, next, prev } = useStoreProduct(
    6,
    0,
    { params: getAllSearchParams(productFilterParams) },
    [productFilterParams]
  );

  useEffect(() => {
    if (width < 900) {
      setShowFilter(false);
    } else {
      setShowFilter(true);
    }
  }, [width]);

  const clearParams = (key: string) =>
    setProductFilterParams((prevParam: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParam);
      newParams.delete(key);

      return newParams;
    });

  const resetAll = () => {
    const newParams = new URLSearchParams();
    setProductFilterParams(newParams);
  };

  const setSearchValues = (value: string) => {
    setProductFilterParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (value === "") {
        if (newParams.has("search")) {
          newParams.delete("search");
        }
      } else {
        newParams.set("search", value);
      }

      return newParams;
    });
  };

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
      <div className="lg:h-20   h-16 bg-black mb-0  fixed top-0 z-50 w-full">
        <Navbar onOpen={() => false} />
      </div>
      <>
        {showFilter && (
          <aside
            id="default-sidebar"
            className="absolute  lg:fixed   top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
          >
            <FilterSideBar
              resetAll={resetAll}
              clearItem={clearParams}
              removeParams={removeFilterParams}
              setParams={setFilterParams}
              searchParams={productFilterParams}
            />
          </aside>
        )}
        <div className="lg:pl-2 lg:ml-64 mt-20">
          <div className="flex flex-col  w-full static     pt-14  px-2">
            <div className="bg-white flex flex-col-reverse items-start  mx-14 py-4 normal gap-4 ">
              <h1 className="pl-4 text-3xl font-pacifico">
                Results {pages * data.length}
              </h1>
              <SearchBox onChange={setSearchValues} />
            </div>

            <div className="my-2">
              <PaginationBtn
                currentPage={currentPage}
                onNext={next}
                onPrev={prev}
                totalPages={pages}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center  min-w-sm   md:mx-auto mb-5 mt-5 gap-2 lg:gap-5 ">
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
          </div>
        </div>
      </>

      <BottmNavbar />
    </div>
  );
};

export default Shop;
