import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { IoAddSharp } from "react-icons/io5";
import { useData } from "../../../hooks";

import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import apiClient, { ApiClientError } from "../../../services/api-client";

interface SizeVariationAddForm {
  size: string;
  price: number | string;
  stock: number;
}
const AddSizeCard = () => {
  const { id } = useSelector(
    (state: RootState) => state.adminProductVariationSlice
  );

  const initialValues: SizeVariationAddForm = {
    size: "",
    price: "0.0",
    stock: 0,
  };

  const sizeAddValidationSchema = Yup.object().shape({
    size: Yup.string().required("please select a size"),
    price: Yup.number()
      .required()
      .min(1000, "price range must between 10000 to 1000 ")
      .max(10000, "price must be under 10000"),

    stock: Yup.number()
      .integer()
      .required()
      .min(100, "stock must be minimum 100"),
  });

  const formike = useFormik({
    initialValues,
    onSubmit: handleSubmit,

    validationSchema: sizeAddValidationSchema,
  });

  function handleSubmit(values: SizeVariationAddForm, actions: any) {
    const data = { ...values, img: id };

    apiClient
      .post("admin/size-variation-create/", data)
      .then((res) => {
        res.status == 201 &&
          actions.resetForm({
            values: {
              size: "",
              price: "0.0",
              stock: 0,
            },
          });
      })
      .catch((err: ApiClientError) => {
        if (err.response?.status === 409) {
          formike.setErrors({ size: "size is already exist" });
        }
      });
  }

  const [form, setForm] = useState(false);
  const { data: size } = useData<{ id: string; name: string }>("admin/size/");

  return (
    <React.Fragment>
      <div
        className="max-w-xs mx-auto  bg-white shadow-lg border border-slate-200  mb-3 rounded-lg"
        onClick={() => setForm(!form)}
      >
        <div className="px-6 py-5 flex items-center  justify-center">
          <div className="rounded-full p-4  flex items-center justify-center overflow-hidden bg-gray-200 shadow-2xl">
            <IoAddSharp className="text-black size-4" />
          </div>
        </div>
      </div>
      <Dialog
        placeholder={"name"}
        open={form}
        handler={() => setForm(!form)}
        size="xs"
      >
        <DialogHeader placeholder={"dailogou"}>Add Size Variation</DialogHeader>
        <DialogBody placeholder={"hdjhfhjk"}>
          <form
            className="max-w-md text-indigo-100 flex  flex-col  gap-3"
            onSubmit={formike.handleSubmit}
          >
            <div>
              <label
                htmlFor="size"
                className="lg:text-lg black text-xs pl-2 text-slate-500"
              >
                Size
              </label>

              <select
                name="size"
                className="lg:text-lg text-black font-medium mt-1 block w-full py-2 font-bebas px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={formike.values.size}
                onChange={formike.handleChange}
              >
                <option value="">choose a size</option>

                {size.map((size: { id: string; name: string }) => (
                  <option className="font-bebas" value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>
              {formike.errors.size && formike.touched.size && (
                <p className="text-red-500">{formike.errors.size}</p>
              )}
            </div>
            <div className="">
              <label
                htmlFor="price"
                className="lg:text-lg black text-xs pl-2 text-slate-500"
              >
                Price (in INR)
              </label>

              <input
                className="lg:text-lg text-black font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                name="price"
                type="number"
                onChange={formike.handleChange}
                value={formike.values.price}
              />
              {formike.errors.price && formike.touched.price && (
                <p className="text-red-500">{formike.errors.price}</p>
              )}
            </div>

            <div className="">
              <label
                htmlFor="stock"
                className="lg:text-lg  black text-xs pl-2 text-slate-500"
              >
                Stocks
              </label>
              <input
                className="lg:text-lg  text-black font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                name="stock"
                type="number"
                onChange={formike.handleChange}
                value={formike.values.stock}
              />
              {formike.errors.stock && formike.touched.stock && (
                <p className="text-red-500">{formike.errors.stock}</p>
              )}
            </div>

            <DialogFooter placeholder={undefined}>
              <button
                className="bg-white hover:bg-red-50 text-red-500 font-bold py-2 px-4 rounded-md transition-all mr-2 "
                onClick={() => setForm(!form)}
                type="button"
              >
                Discard
              </button>
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded-md hover:opacity-65 transition-all "
                type="submit"
              >
                Save
              </button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </React.Fragment>
  );
};

export default AddSizeCard;
