import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { genrateImageUrl } from "../../utils/image";

import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import apiClient, { ApiClientError } from "../../services/api-client";

import { Select, Option, Tooltip } from "@material-tailwind/react";

import { useData } from "../../hooks";
import { FaPlus } from "react-icons/fa";
import type { AdminColor, AdminProduct, ColorVariation } from "../../@types";

import { FILE_REQUEST_CONFIG } from "../../utils/constants";

import NotFound from "../../components/NotFound";
import DelayComponent from "../../components/DelayComponent";
import AddColorForm from "../../components/admin/AddColorForm";
import ImageUploaderWithImage from "../../components/admin/ImageUploaderWithImage";

import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const successToast = () =>
  toast.custom((t) => (
    <div
      id="toast-success"
      className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">
        color variation added successfully.
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
          onClick={() => toast.dismiss(t.id)}
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  ));

const AddVaraitonPage = () => {
  const variationValidationSchema = Yup.object().shape({
    img_1: Yup.mixed().required("please provide a image"),
    img_2: Yup.mixed().required("please provide a image"),
    img_3: Yup.mixed().required("please provide a image"),
    color: Yup.string().required("please choose a color"),
  });
  const { pid } = useParams();

  const [product, setProduct] = useState<AdminProduct>({
    id: "",
    img: "",
    name: "",
    slug: "",
    brand: "",
    created: "",
    updated: "",
    categoery: "",
    is_active: false,
  });

  const [images, setImages] = useState({
    img_1:
      "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp",
    img_2:
      "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp",
    img_3:
      "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp",
  });

  interface Values {
    img_1: File | string;
    img_2: File | string;
    img_3: File | string;
    color: string;
    product: string;
  }

  const initialValues: Values = {
    color: "",
    img_1: "",
    img_2: "",
    img_3: "",
    product: "",
  };

  const { data: color, setData: setColor } =
    useData<AdminColor>("admin/color/");

  const formike = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: variationValidationSchema,
  });

  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get<AdminProduct>(`admin/product/${pid}/`)
      .then((res) => {
        setProduct({ ...product, ...res.data });
        formike.setValues({ ...formike.values, product: res.data.id });
      })
      .catch((err) => err);
  }, []);

  const [form, setForm] = useState(false);

  function handleImg(e: ChangeEvent<HTMLInputElement>, key: string) {
    if (e.target?.files && e.target.files.length === 1) {
      const img = e.target.files[0];
      const data = { ...images };

      console.log(key);

      if (data.hasOwnProperty(key)) {
        data[key as keyof typeof images] = genrateImageUrl(img);
        console.log("hai..................................................");
        console.log(key);
        console.log(data);
        console.log(".....................................................");
        setImages({ ...data });
        if (formike.values.hasOwnProperty(key)) {
          const values = { ...formike.values };
          values[key as keyof typeof images] = img;
          formike.setValues({ ...values });
        }
      }
    }
  }

  function handleSubmit(values: Values) {
    const data = { ...values, product: product.id };

    apiClient

      .post<ColorVariation>("admin/color-variation/", data, FILE_REQUEST_CONFIG)
      .then((res) => {
        if (res.status == 201) {
          successToast();
          setTimeout(() => {
            navigate(`/admin/product/varaition/${res.data.id}/`);
          }, 1500);
        }
      })
      .catch((err: ApiClientError) => {
        if (err.response?.status == 409) {
          formike.setErrors({ color: "color already exist for the product" });
        }
      });
  }

  function handleSelectChange(value: string) {
    formike.setValues({ ...formike.values, color: value });
  }

  console.log(formike.errors);

  return product.id == "" ? (
    <DelayComponent delay={1000}>
      <NotFound />
    </DelayComponent>
  ) : (
    <>
      <section className="container mx-auto px-4 md:px-6 py-8">
        <form
          className="flex flex-col  gap-6  "
          onSubmit={formike.handleSubmit}
        >
          <h1 className="text-3xl">Add Color</h1>
          <h1 className="text-xl">for {product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="w-72">
              <Select
                placeholder={undefined}
                label="Choose a Color"
                name="color"
                value={color.length !== 0 ? color[0].id : ""}
                onChange={(value: any) => handleSelectChange(value)}
              >
                {color.map((clr: AdminColor) => (
                  <Option value={clr.id}>{clr.name}</Option>
                ))}
              </Select>

              {formike.touched.color && formike.errors.color && (
                <p className="text-sm  text-red-500 mt-2 ml-2">
                  {formike.errors.color}
                </p>
              )}
            </div>

            <Tooltip content="Add  new color" placement="bottom">
              <button
                className="bg-black py-[6px] px-5 rounded-md"
                onClick={() => setForm(!form)}
                type="button"
              >
                <FaPlus className="text-2xl text-white" />
              </button>
            </Tooltip>
          </div>

          <div className=" overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-2  ">
            {Object.entries(images).map(([key, value], index) => (
              <React.Fragment key={index}>
                <ImageUploaderWithImage
                  src={value}
                  className="rounded-md object-fill bg-clip-border w-96 aspect-[300px]  lg:aspect-[600px] "
                  name={key}
                  handleChange={(e: any) => handleImg(e, key)}
                  error={
                    formike.touched[key as keyof typeof images]
                      ? formike.errors[key as keyof typeof images]
                      : undefined
                  }
                />
              </React.Fragment>
            ))}
          </div>
          <div>
            <button
              className="px-6  bg-black text-white py-2 font-bebas  rounded-md"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
        <AddColorForm
          form={form}
          setForm={(value: boolean) => setForm(value)}
          colors={color}
          setColor={setColor}
        />
        <div className="flex items-center justify-center">
          <div
            className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4  w-72"
            role="alert"
          >
            <span className="font-bold">Note</span>
            <br />
            You Need to add Sizes to display the Color Variant
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default AddVaraitonPage;
