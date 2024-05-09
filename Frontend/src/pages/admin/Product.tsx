import { useEffect, useState } from "react";
import { useOutlet } from "react-router-dom";

import DropDownList from "../../ui/admin/DropDownList";
import SearchBox from "../../ui/admin/SearchBox";
import apiClient from "../../services/api-client";
import ProductList from "../../components/admin/ProductList";
import {
  setBrand,
  setCategory,
  setName,
} from "../../store/admin/productSearchSlice";
import { useDispatch } from "react-redux";
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
  const [brands, setBrands] = useState<AdminBrandResponse[] | []>([]);
  const [category, setCategoery] = useState<AdminCategoeryResponse[] | []>([]);
  const dispatch = useDispatch();

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

  return outlet ? (
    outlet
  ) : (
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
            <SearchBox onSearch={(text: string) => dispatch(setName(text))} />
          </div>
          <div className="flex items-center justify-normal gap-5">
            <DropDownList
              title="Brand"
              dispatcher={(brandText: string) => dispatch(setBrand(brandText))}
            >
              {brands.length > 0 &&
                brands.map((brand: AdminBrandResponse) => (
                  <option value={brand.name}>{brand.name}</option>
                ))}
            </DropDownList>
            <DropDownList
              title="Category"
              dispatcher={(categoryText: string) =>
                dispatch(setCategory(categoryText))
              }
            >
              {category.map((category: AdminCategoeryResponse) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </DropDownList>
            <DropDownList
              title="Sort By"
              dispatcher={(categoryText: string) => console.log(categoryText)}
            >
              {category.map((category: AdminCategoeryResponse) => (
                <option value={category.name}>{category.name}</option>
              ))}
            </DropDownList>
          </div>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default Product;
