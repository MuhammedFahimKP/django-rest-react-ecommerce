import { useState, useEffect } from "react";
import type { ProductResponseData } from "../../types";

import apiClient, { ApiClientResponse } from "../../services/api-client";

import ProductCard from "../../components/user/ProductCard";

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
  const [product, setProduct] = useState<ProductResponseData[] | []>([]);

  const { data, currentPage, error, loding, pages } = useStoreProduct(6);

  console.log(data);
  console.log(error);
  console.log(loding);
  console.log(pages);
  console.log(currentPage);

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<ProductResponseData[]>("shop/product/", {
        signal: controller.signal,
      })
      .then((res: ApiClientResponse) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    return () => controller.abort();
  }, []);

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
          <FilterSideBar />
        </aside>
        <div className="pl-2 ml-64">
          <div className="flex flex-col  w-full static h-[100vh]    bg-red-700  pt-14  px-2">
            <div className="bg-red-300 flex items-center normal gap-14 ">
              <h1 className="text-3xl font-pacifico">Results </h1>
              <SearchBox />
            </div>

            <div className="grid grid-cols-2  lg:grid-cols-3 place-items-center bg-red-400  min-w-sm   mx-auto mb-5 mt-5 gap-2 lg:gap-5 ">
              {product.map((item: ProductResponseData, index) => (
                <ProductCard
                  key={`shop-product-${index}`}
                  brand={item.brand}
                  categoery={item.categoery}
                  discription={item.discription}
                  variants={item.variants}
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
