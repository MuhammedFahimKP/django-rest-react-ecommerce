import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import DropDownBtn from "../../ui/user/DropDownBtn";

import CategoryAddFrom from "../../ui/admin/category/CategoryAddFrom";

import ProductList from "../../components/admin/ProductList";

import UsersList from "../../components/admin/UserList";

import SearchBox from "../../ui/admin/SearchBox";
import { MdOutlineAdd } from "react-icons/md";

const User = () => {
  const [categeoryFilter, setCategoeryFilter] = useSearchParams({});
  const handleFilterClick = (key: string, value: string) => {
    setCategoeryFilter((prev: URLSearchParams) => {
      const newParams = new URLSearchParams(prev);

      if (newParams.has(key)) {
        newParams.delete(key);
      }
      newParams.set(key, value);

      return newParams;
    });
  };

  const [form, setShowForm] = useState(false);

  const handleForm = () => setShowForm(!form);

  const search = (value: string) => {
    setTimeout(() => {
      setCategoeryFilter((prevParams) => {
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
    }, 2000);
  };

  return (
    <div className="w-full   min-h-screen">
      <div className="flex flex-col   h-[35%]  lg:h-48  bg-[#f5f7fa] px-8 py-0 text-black ">
        <div className="mt-4 flex items-center justify-between lg:mt-8 h-fit   mb-10  ">
          <h1 className="font-ptsans font-bold text-4xl  lg:text-4xl">
            Category
          </h1>
          <button
            onClick={handleForm}
            className="bg-inherit text-black text-sm lg:text-sm  underline  transition-all   py-2 px-4 rounded-lg inline-flex items-center justify-between gap-2"
          >
            <MdOutlineAdd className="text-inherit" />
            <span>Add Category</span>
          </button>
        </div>
        {/* product count section  */}

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-4 lg:mb-0">
          <div className="flex items-center justify-center ">
            <SearchBox onSearch={(text: string) => search(text)} />
          </div>

          <DropDownBtn
            selectedItem={categeoryFilter.get("ordering")}
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("ordering", value)}
            title="Sort By:"
            menuItems={{
              "-created": "First Added ",
              updated: "First Update",
              "-updated": "Last Updated",
              created: "Last Added",
            }}
          />
          <DropDownBtn
            selectedItem={categeoryFilter.get("ordering")}
            showTitle={true}
            handleParamChange={(value) => handleFilterClick("ordering", value)}
            title="Sort By:"
            menuItems={{
              "-created": "First Added ",
              updated: "First Update",
              "-updated": "Last Updated",
              created: "Last Added",
            }}
          />
        </div>
      </div>
      <UsersList filterParams={categeoryFilter} />
    </div>
  );
};

export default User;
