import { useEffect, useState, type ChangeEvent } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import type { AdminBrand, AdminCategory, ProductForm } from "../../@types";
import apiClient, {
  ApiClientError,
  ApiClientResponse,
} from "../../services/api-client";
import { FaSave } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useData } from "../../hooks";

import { genrateImageUrl } from "../../utils/image";
import { RootState } from "../../store";
import toast, { Toaster } from "react-hot-toast";
import ErrorText from "../../ui/user/ErrorText";
import * as Yup from "yup";

import SuccessAlert from "../../ui/alerts/SuccessAlert";
import ErrorAlert from "../../ui/alerts/ErrorAlert";
import ImageUploaderWithImage from "../../components/admin/ImageUploaderWithImage";
import { setProduct } from "../../slices/currentProductSlice";

// interface Varation {
//   id: string;
//   img_1: string;
//   color: string;
// }

// function Varations({ id, img_1, color }: Varation) {
//   return (
//     <div className="relative  bg-red-400 h-96 w-72 grid  flex-col items-end justify-center overflow-hidden rounded-xl   text-center text-gray-700">
//       <Link
//         to={`/product/varaition/${id}/`}
//         className={
//           "absolute inset-0 m-0 overflow-hidden rounded-none " +
//           `bg-[url('${img_1}')]` +
//           " bg-transparent " +
//           " bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
//         }
//         style={{ backgroundImage: "url(" + img_1 + ")" }}
//       ></Link>
//       <div className="relative p-6 px-6 py-14 md:px-12">
//         <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
//           {color}
//         </h2>
//         <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400"></h5>
//       </div>
//     </div>
//   );
// }

const CreateProduct = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("please select provide name")
      .min(3, "name must be more than 3 characters")
      .max(100, "name must be less than 100 characters"),
    img: Yup.mixed().required("please provide a image"),
    brand: Yup.string().required("please select a brand"),
    categoery: Yup.string().required("please select a categoery"),
    discription: Yup.string()
      .required("please provide discription")
      .min(50, "discription must be 50 characters"),
  });

  const initialValues: ProductForm = {
    name: "",
    img: "",
    brand: "",

    categoery: "",
    discription: "",
    is_active: "",
  };

  const formike = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
    enableReinitialize: true,
  });
  const navigate = useNavigate();

  const [img, setImg] = useState(
    "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp"
  );

  const { data: brands } = useData<AdminBrand>("admin/brand/");
  const { data: categoery } = useData<AdminCategory>("admin/categoery/");

  const { access } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const requestConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + access,
    },
  };

  function handleSubmit(values: ProductForm, actions: any) {
    apiClient
      .post(`admin/product/`, values, requestConfig)
      .then((res) => {
        formike.setValues(initialValues);
        res.status === 201 &&
          toast((t) => (
            <SuccessAlert successText="Product Create " toast={t} />
          ));
        actions.resetForm({
          values: initialValues,
        });
        setImg("");
      })
      .catch((err: ApiClientError) => {
        err.response?.status === 409 &&
          formike.setErrors({ ...formike.errors, name: "already exist" });
      });
  }

  function handleImg(event: ChangeEvent<HTMLInputElement>) {
    if (event.target?.files) {
      const img = event.target.files[0];
      const proccessed_img = genrateImageUrl(img);
      setImg(proccessed_img);

      formike.setValues({ ...formike.values, img: img });
    }
  }

  return (
    <>
      <section className="container mx-auto px-4 md:px-6 py-8">
        <form
          className="flex flex-col lg:flex-row lg:items-center gap-6  "
          onSubmit={formike.handleSubmit}
        >
          <div className=" overflow-hidden flex-1 grid place-content-center">
            <ImageUploaderWithImage
              name="img"
              src={img}
              error={
                formike.errors.img &&
                formike.touched.img &&
                typeof formike.errors.img === "string"
                  ? formike.errors.img
                  : ""
              }
              className="rounded-lg object-cover object-top w-full bg-clip aspect-square"
              handleChange={(e: any) => handleImg(e)}
            />
          </div>

          <div className="lg:px-20 flex-1">
            <div className="border border-slate-200 px-4 py-8  rounded-lg">
              <div>
                <label
                  htmlFor="name"
                  className="lg:text-lg black text-xs pl-2 text-slate-500"
                >
                  Name
                </label>
                <input
                  className="lg:text-lg  mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value={formike.values.name}
                  name="name"
                  placeholder="Name"
                  onChange={formike.handleChange}
                  type="text"
                />
                {formike.errors.name && formike.touched.name && (
                  <ErrorText>{formike.errors.name}</ErrorText>
                )}
              </div>

              <div className="mt-3">
                <label
                  htmlFor="discription"
                  className="lg:text-lg text-xs  pl-2 text-slate-500"
                >
                  Discription
                </label>

                <textarea
                  rows={4}
                  name="discription"
                  className="block w-full  py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value={formike.values.discription}
                  onChange={formike.handleChange}
                />
                {formike.errors.discription && formike.touched.discription && (
                  <ErrorText>{formike.errors.discription}</ErrorText>
                )}
              </div>

              <div className="mt-3">
                <label
                  htmlFor="brand"
                  className="lg:text-lg text-xs  pl-2 text-slate-500"
                >
                  Brand
                </label>
                <select
                  name="brand"
                  onChange={formike.handleChange}
                  className=" mt-1 block w-full py-2 px-3 border border-gray-300  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  {brands.map((item: AdminBrand) => (
                    <option
                      value={item.id}
                      selected={item.name == formike.values.brand}
                      className=" appearance-none font-bold mt-1 block w-full py-8 px-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                {formike.errors.brand && formike.touched.brand && (
                  <ErrorText>{formike.errors.brand}</ErrorText>
                )}
              </div>

              <div className="mt-3">
                <label
                  htmlFor="categoery"
                  className="lg:text-lg text-xs  pl-2 text-slate-500"
                >
                  Categoery
                </label>
                <select
                  name="categoery"
                  className=" mt-1 block w-full py-2 px-3 border border-gray-300  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  onChange={formike.handleChange}
                >
                  {categoery.map((item: AdminCategory) => (
                    <option
                      value={item.id}
                      selected={item.name == formike.values.categoery}
                      className=" appearance-none font-bold mt-1 block w-full py-8 px-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
                {formike.errors.categoery && formike.touched.categoery && (
                  <ErrorText>{formike.errors.categoery}</ErrorText>
                )}
              </div>

              <div className="flex  items-center gap-2 mt-10">
                <button
                  type={"submit"}
                  className="bg-black text-white border flex items-center gap-3  justify-center  rounded-md px-4 py-1  flex-1 "
                >
                  <FaSave className="size-4 " /> Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default CreateProduct;
