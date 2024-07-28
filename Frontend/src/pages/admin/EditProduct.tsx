import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import type { ProductForm, AdminBrand, AdminCategory } from "../../@types";

import apiClient, { ApiClientError } from "../../services/api-client";
import ImageUploader from "../../ui/admin/ImageUploader";
import { useData } from "../../hooks";

const EditProduct = () => {
  const [product, setProduct] = useState<ProductForm | null>(null);

  const { id } = useParams();
  useEffect(() => {
    apiClient
      .get("admin/product/" + id + "/")
      .then((res) => setProduct(res.data))
      .catch((err) => {
        if ((err as ApiClientError).status) {
          if (err.status == 404) {
            console.log(err);
          }
        }
      });
  }, []);

  const Values: ProductForm = {
    name: "",
    categoery: "",
    brand: "",
    discription: "",
    is_active: false,
    img: "",
  };

  const formike = useFormik({
    initialValues: product ? product : Values,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values: ProductForm, action: any) {
    apiClient
      .patch("admin/product/" + id + "/", values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files) {
      formike.setValues({ ...formike.values, img: e.target.files[0] });
    }
  };

  const { data: brand } = useData<AdminBrand>("admin/brand/");
  const { data: category } = useData<AdminCategory>("admin/categoery/");

  const changeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    apiClient.post("admin/product/slug");
  };

  return (
    <div className="flex items-center justify-center w-5/6">
      <div className="flex item h-screen bg-gray-100 w-[100vw]">
        <div className="m-auto">
          <div>
            <div className="mt-5 w-[40vw] bg-white rounded-lg shadow">
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <h1 className="inline text-2xl font-semibold leading-none">
                    Add Edit
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
                  value={product?.name}
                  onChange={(e) => formike.handleChange(e)}
                  className="mb-2 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />

                <ImageUploader
                  value={product?.img}
                  name="img"
                  onChange={imageChange}
                />

                <select
                  name="brand"
                  onChange={formike.handleChange}
                  value={product?.brand}
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
                  value={product?.categoery}
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
                    value={product?.is_active}
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

export default EditProduct;
