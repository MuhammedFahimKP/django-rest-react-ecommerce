import React, { useState } from "react";
import { useFormik } from "formik";
import { AiOutlineStock } from "react-icons/ai";
import { LuIndianRupee } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DynamicObj } from "../../@types";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { updateSizeVariation } from "../../slices/admin/producVarationSlice";
import { useDispatch } from "react-redux";
import apiClient from "../../services/api-client";
import { type SizeVariation as Props } from "../../@types";
import { AppDispact } from "../../store";

const SizeCard = ({ id, size, price, stock }: Props) => {
  const dispatch = useDispatch<AppDispact>();
  const [form, setForm] = useState(false);

  const sizeEditFromValidationSechama = Yup.object().shape({
    price: Yup.number()
      .required()
      .min(1000, "price range must between 10000 to 1000 ")
      .max(10000, "price must be under 10000"),

    stock: Yup.number()
      .integer()
      .required()
      .min(100, "stock must be minimum 100"),
  });

  interface SizeEditForm {
    price?: number | string;
    stock?: number;
  }

  const initialValues: SizeEditForm = {
    price: price,
    stock: stock,
  };

  function handleSubmit(values: SizeEditForm, action: any) {
    const data: DynamicObj = {};
    if (price !== values.price) {
      const priceToConvert = values?.price ? values.price : 0;
      const floatPrice = parseFloat(priceToConvert.toString()).toFixed(2);
      data.price = floatPrice;
    }

    if (stock !== values.stock) {
      data.stock = values.stock;
    }

    formike.setValues({ ...formike.values, ...data });

    apiClient
      .patch(`admin/varation/sizes/${id}/`, formike.values)
      .then((res) => {
        res.status == 200 &&
          dispatch(updateSizeVariation(res.data)) &&
          setForm(false);
      });
  }

  const formike = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: sizeEditFromValidationSechama,
  });
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setForm(!form);
  };
  const handleOpen = () => setForm(!form);
  console.log(formike.errors);
  console.log(formike.touched);

  return (
    <React.Fragment>
      <div className="max-w-sm mx-auto mb-3  bg-white shadow-lg border border-slate-200  rounded-lg">
        <div className="px-6 py-5">
          <div className="flex items-start">
            {/* Icon */}

            {/* Card content */}
            <div className="flex-grow truncate">
              {/* Card header */}
              <div className="w-full sm:flex justify-between items-center mb-3">
                {/* Title */}
                <h2
                  className="text-2xl leading-snug font-extrabold font-bebas text-black truncate mb-1 sm:mb-0"
                  onClick={(e: any) => handleClick(e)}
                >
                  {size}
                </h2>
                {/* Like and comment buttons */}
                <div className="flex-shrink-0 flex items-center space-x-3 sm:ml-2">
                  <button className="flex items-center text-left text-sm font-mediu  hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                    <LuIndianRupee className="w-4 h-4 flex-shrink-0 mr-2 fill-current  group-hover:text-gray-200" />
                    <span>
                      {price} <span className="sr-only">comments</span>
                    </span>
                  </button>
                  <button className="flex items-center text-left text-sm font-mediu  hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100">
                    <AiOutlineStock className="w-4 h-4 flex-shrink-0 mr-2 fill-current  group-hover:text-gray-200" />
                    <span>
                      {stock} <span className="sr-only">comments</span>
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      apiClient
                        .delete(`admin/varation/sizes/${id}/`)
                        .then((res) => console.log("deleted"))
                        .catch((err) => console.log(err));
                    }}
                    className="flex items-center text-left text-sm font-medium text-red-600 group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
              {/* Card body */}
              <div className="">
                {/* Paragraph */}

                {/* More link */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog placeholder={"name"} open={form} handler={handleOpen} size="xs">
        <DialogHeader placeholder={"dailogou"}>
          Edit Size Variation{" "}
        </DialogHeader>
        <DialogBody placeholder={"hdjhfhjk"}>
          <form
            className="max-w-md text-indigo-100 flex  flex-col  gap-3 "
            onSubmit={formike.handleSubmit}
          >
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
                onClick={handleOpen}
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

export default SizeCard;
