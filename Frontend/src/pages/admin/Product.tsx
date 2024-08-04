import { useEffect, useState } from "react";
import { useOutlet, useSearchParams } from "react-router-dom";

import { MenuItem, Checkbox, Typography } from "@material-tailwind/react";

import DropDownMenu from "../../ui/admin/DropDownMenu";
import SearchBox from "../../ui/admin/SearchBox";
import apiClient from "../../services/api-client";
import ProductList from "../../components/admin/ProductList";
import SortSelector from "../../ui/admin/SortSelector";

import { AdminProductSortData } from "../../utils/constants";

import { MdOutlineAdd } from "react-icons/md";

interface AdminBrandResponse {
  id: string;
  name: string;
  is_active: boolean;
  created: Date;
  updated: Date;
}

interface AdminCategoeryResponse {
  id: string;
  name: string;
  img: string;
  is_active: boolean;
  created: Date;
  updated: Date;
}

const Product = () => {
  const outlet = useOutlet();

  if (outlet) return outlet;

  const [brands, setBrands] = useState<AdminBrandResponse[] | []>([]);
  const [category, setCategoery] = useState<AdminCategoeryResponse[] | []>([]);

  const [productFIlterParams, setProductFilterParams] = useSearchParams();

  const search = (searchQuery: string) => {
    const QUERY_PARAM = "name";

    setProductFilterParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);
      const param = newParams.get(QUERY_PARAM);

      if (param?.length === 0 && searchQuery.length === 0) {
        newParams.delete(QUERY_PARAM);
      }

      const value = param ? searchQuery : param + searchQuery;
      newParams.set(QUERY_PARAM, value);

      return newParams;
    });
  };

  const setCurrentFilter = (queryParam: string, value: string) => {
    console.log(productFIlterParams.entries());
    setProductFilterParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);

      const existingValue = newParams.get(queryParam) || "";

      // Append the new value, separated by a comma
      const updatedValue = existingValue ? `${existingValue},${value}` : value;

      newParams.set(queryParam, updatedValue);

      return newParams;
    });
  };

  const removeCurrentFilter = (queryParam: string, value: string) => {
    setProductFilterParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);

      const param = newParams.get(queryParam)?.split(",");

      const paramIndex = param?.includes(value) ? param?.indexOf(value) : -1;

      if (param?.length === 1) {
        newParams.delete(queryParam);
      } else {
        paramIndex !== -1 &&
          param?.splice(paramIndex, 1) &&
          newParams.set(queryParam, param.join(","));
      }

      return newParams;
    });

    alert(productFIlterParams.entries());
  };
  const updateSortFilter = (prevValue: string, newValue: string) =>
    setProductFilterParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (newParams.has("ordering")) {
        newParams.delete("ordering", prevValue);
      }

      newValue !== "" && newParams.append("ordering", newValue);

      return newParams;
    });

  const resetSortFilter = () =>
    setProductFilterParams((prevParams: URLSearchParams) => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete("ordering");

      return newParams;
    });

  useEffect(() => {
    apiClient
      .get("admin/brand/")
      .then((res) => setBrands(res.data))
      .catch((err) => console.log(err));
    apiClient
      .get("admin/categoery/")
      .then((res) => setCategoery(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-5/6 bg-red-500 h-full">
      <div className="flex flex-col   h-[35%]  lg:h-48  bg-[#f5f7fa] px-8 py-0 text-black ">
        <div className="mt-4 flex items-center justify-between lg:mt-8 h-fit     ">
          <h1 className="font-ptsans font-bold text-xl  lg:text-4xl">
            Products
          </h1>
          <button className="bg-black text-white font-bold  hover:opacity-70 transition-all   py-2 px-4 rounded inline-flex items-center justify-between">
            <MdOutlineAdd className="size-5 mb-1 mr-2" />
            <span>Download</span>
          </button>
        </div>
        {/* product count section  */}
        <div className="mt-4 lg:mt-8 flex items-center gap-2 lg:gap-8 ">
          <div className="nav-item">
            <a role="button" className=" py-1 " tabIndex={0} href="#">
              All <span className="">(68817)</span>
            </a>
          </div>
          <div className="">
            <a
              role="button"
              className=" py-1 text-blue-600"
              tabIndex={0}
              href="#"
            >
              Published <span className="">(70348)</span>
            </a>
          </div>

          <div className="">
            <a className="py-1 text-blue-600" tabIndex={0} href="#">
              UnPublished <span className="">(70348)</span>
            </a>
          </div>
        </div>

        {/* product filter section  and search section  */}
        <div className="flex flex-col lg:flex-row items-center mt-3 lg:gap-16 ">
          <div className="flex items-center justify-center ">
            <SearchBox onSearch={(text: string) => search(text)} />
          </div>
          <div className="flex items-center justify-normal gap-5">
            <DropDownMenu title="Brand">
              {brands.map((brand: AdminBrandResponse) => (
                <MenuItem
                  placeholder={undefined}
                  className="flex gap-3"
                  key={brand.id}
                >
                  <Checkbox
                    crossOrigin={undefined}
                    id={`brand-checkbox${brand.id}`}
                    label={
                      <Typography
                        placeholder={undefined}
                        color="blue-gray"
                        className="font-medium  ml-2"
                      >
                        {brand.name}
                      </Typography>
                    }
                    ripple={false}
                    onChange={() => {
                      productFIlterParams
                        .get("brand")
                        ?.split(",")
                        .includes(brand.name)
                        ? removeCurrentFilter("brand", brand.name)
                        : setCurrentFilter("brand", brand.name);
                    }}
                    checked={
                      productFIlterParams
                        .get("brand")
                        ?.split(",")
                        .includes(brand.name)
                        ? true
                        : false
                    }
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </MenuItem>
              ))}
            </DropDownMenu>

            <DropDownMenu title="Category">
              {category.map((category: AdminBrandResponse) => (
                <MenuItem
                  placeholder={undefined}
                  className="flex gap-3"
                  key={category.id}
                >
                  <Checkbox
                    crossOrigin={undefined}
                    id={`category-checkbox${category.id}`}
                    label={
                      <Typography
                        placeholder={undefined}
                        color="blue-gray"
                        className="font-medium  ml-2"
                      >
                        {category.name}
                      </Typography>
                    }
                    ripple={false}
                    onChange={() => {
                      productFIlterParams
                        .getAll("category")
                        .includes(category.name)
                        ? removeCurrentFilter("category", category.name)
                        : setCurrentFilter("category", category.name);
                    }}
                    checked={
                      productFIlterParams
                        .getAll("category")
                        .includes(category.name)
                        ? true
                        : false
                    }
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </MenuItem>
              ))}
            </DropDownMenu>
            <SortSelector
              sortChangeHandler={(prevValue: string, newValue: string) =>
                updateSortFilter(prevValue, newValue)
              }
              onReset={() => resetSortFilter()}
              sortFileds={AdminProductSortData}
            />
          </div>
        </div>
      </div>
      <ProductList filterParams={productFIlterParams} />
    </div>
  );
};

export default Product;
