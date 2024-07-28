import { useFormik } from "formik";
import { useData } from "../../hooks";

import * as Yup from "yup";

import ImageUploader from "../../ui/admin/ImageUploader";
import axios from "axios";
import { useSelector } from "react-redux";
import type { ProductForm, AdminBrand, AdminCategory } from "../../@types";
import { RootState } from "../../store";
import { ChangeEvent, useState } from "react";

const AddProduct = () => {
  type image = {
    img: "" | Blob;
  };

  const [file, setFile] = useState<image>({
    img: "",
  });

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Too Short")
      .max(50, "Too Long")
      .required("Please Provide a Prouduct Name"),

    img: Yup.string().required("please provide product product image"),
    categoery: Yup.string().required("Please Provide a choose a Category"),
    brand: Yup.string().required("Please Provide a choose a Brand"),
  });

  const { access } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const initialValues: ProductForm = {
    name: "",
    categoery: "",
    discription: "",
    brand: "",
    is_active: false,
    img: null,
  };

  const formike = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  });

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      setFile({ ...file, img: e.target.files[0] });
      formike.setValues({ ...formike.values, img: e.target.files[0] });
    }
  };

  function handleSubmit(value: ProductForm, action: any) {
    console.log(value);
    let formData = new FormData();

    Object.entries(value).forEach(([key, data]) => {
      formData.append(key, data);
    });

    console.log(formData.entries());
    for (var key of formData.entries()) {
      console.log(key);
    }

    formData.append("img", file.img);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + access,
      },
    };

    axios
      .post("http://127.0.0.1:8000/admin/product/", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  const { data: brand } = useData<AdminBrand>("admin/brand/");
  const { data: category } = useData<AdminCategory>("admin/categoery/");

  return (
    <div className="flex items-center justify-center w-5/6">
      <div className="flex item h-screen bg-gray-100 w-[100vw]">
        <div className="m-auto">
          <div>
            <div className="mt-5 w-[40vw] bg-white rounded-lg shadow">
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <h1 className="inline text-2xl font-semibold leading-none">
                    Add Product
                  </h1>
                </div>
              </div>
              <form
                className="px-5 pb-5"
                onSubmit={formike.handleSubmit}
                encType="multipart/form-data"
              >
                <input
                  id="name"
                  placeholder="Name"
                  value={formike.values.name}
                  onChange={(e) => formike.handleChange(e)}
                  className="mb-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />

                <ImageUploader
                  value={formike.values.img}
                  name="img"
                  onChange={imageChange}
                />

                <select
                  name="brand"
                  onChange={formike.handleChange}
                  value={formike.values.brand}
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-4 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                >
                  <option value="">Choose a Brand</option>
                  {brand.map((item: AdminBrand) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>

                <select
                  name="categoery"
                  onChange={formike.handleChange}
                  value={formike.values.categoery}
                  className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                >
                  <option value="">Choose a Category</option>
                  {category.map((item: AdminCategory) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>

                <div className="flex items-center pt-3">
                  <input
                    name="is_active"
                    value={formike.values.is_active}
                    onChange={formike.handleChange}
                    type="checkbox"
                    className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent"
                  />
                  <label
                    htmlFor="safeAdress"
                    className="block ml-2 text-sm text-gray-900"
                  >
                    publish
                  </label>
                </div>
                <hr className="mt-4" />
                <div className="flex flex-row-reverse p-3">
                  <div className="flex-initial pl-3">
                    <button
                      type="submit"
                      className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#FFFFFF"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path
                          d="M5 5v14h14V7.83L16.17 5H5zm7 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-8H6V6h9v4z"
                          opacity=".3"
                        />
                        <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
                      </svg>
                      <span className="pl-2 mx-1">Save</span>
                    </button>
                  </div>
                  <div className="flex-initial">
                    <button
                      type="button"
                      className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M8 9h8v10H8z" opacity=".3" />
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" />
                      </svg>
                      <span className="pl-2 mx-1">Delete</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
