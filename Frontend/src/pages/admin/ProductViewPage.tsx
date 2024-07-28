import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
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
import { checkAnyCahngeOccured } from "../../utils/other-utils";
import ImageChange from "../../components/admin/ImageChange";

import { genrateImageUrl } from "../../utils/image";
import { RootState } from "../../store";

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ErrorText from "../../ui/user/ErrorText";
import * as Yup from "yup";
import AddColor from "../../components/admin/AddColor";
import SuccessAlert from "../../ui/alerts/SuccessAlert";
import ErrorAlert from "../../ui/alerts/ErrorAlert";
import NetworkErrorAlert from "../../ui/alerts/NetworkErrorAlert";

interface Varation {
  id: string;
  img_1: string;
  color: string;
}

interface ProductModel extends ProductForm {
  id: string;
}

function Varations({ id, img_1, color }: Varation) {
  return (
    <div className="relative  bg-red-400 h-96 w-72 grid  flex-col items-end justify-center overflow-hidden rounded-xl   text-center text-gray-700">
      <Link
        to={`/product/varaition/${id}/`}
        className={
          "absolute inset-0 m-0 overflow-hidden rounded-none " +
          `bg-[url('${img_1}')]` +
          " bg-transparent " +
          " bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
        }
        style={{ backgroundImage: "url(" + img_1 + ")" }}
      ></Link>
      <div className="relative p-6 px-6 py-14 md:px-12">
        <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
          {color}
        </h2>
        <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400"></h5>
      </div>
    </div>
  );
}

const ProductViewPage = () => {
  const { id } = useParams();

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
      .min(5, "discription must be 5 characters"),
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
  const [product, setCurrentProduct] = useState<ProductForm>({
    name: "",
    img: "",
    brand: "",
    categoery: "",
    discription: "",
    is_active: "",
  });

  const { data } = useData<Varation>(`admin/product-variations/${id}/`);
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

  useEffect(() => {
    apiClient
      .get<ProductModel>(`admin/product/${id}/`)
      .then((res) => {
        setCurrentProduct({
          brand: res.data.brand,
          categoery: res.data.categoery,
          name: res.data.name,
          img: res.data.img,
          discription: res.data.discription,
          is_active: res.data.is_active,
        });

        formike.setValues({
          brand: res.data.brand,
          categoery: res.data.categoery,
          name: res.data.name,
          img: res.data.img,
          discription: res.data.discription,
          is_active: res.data.is_active,
        });
      })
      .catch((err) => new Error(err));
  }, []);

  function handleSubmit(values: ProductForm) {
    const changed = checkAnyCahngeOccured<ProductForm>(product, values);
    if (changed === false) {
      toast.error("nothing changed");
      return;
    } else {
      apiClient
        .patch(`admin/product/${id}/`, changed, requestConfig)
        .then((res) => {
          res.status === 200 &&
            toast.custom((t) => (
              <SuccessAlert toast={t} successText="Product Updated" />
            ));
        })
        .catch((err: ApiClientError) => {
          err &&
            toast.custom((t) => (
              <ErrorAlert toast={t} errorText={err.message} />
            ));
        });
    }
  }

  function handleImg(event: ChangeEvent<HTMLInputElement>) {
    if (event.target?.files) {
      const img = event.target.files[0];
      const proccessed_img = genrateImageUrl(img);
      setCurrentProduct({ ...product, img: proccessed_img });
      formike.setValues({ ...formike.values, img: img });
    }
  }

  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "delete the product",
      icon: "warning",
      customClass: {
        container: "backdrop-blur-sm   font-ubuntu",
        popup: "rounded-2xl",
        title: "text-lg",
        cancelButton: "bg-red-50 text-red-500 rounded-lg",
        confirmButton: "bg-black text-white rounded-lg",
      },
      showCancelButton: true,
      confirmButtonText: "Yes, delete ",
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient
          .delete(`admin/product/${id}/`)
          .then((res: ApiClientResponse) => {
            res.status === 204 &&
              toast.custom((t) => (
                <SuccessAlert successText="Product Removed " toast={t} />
              ));

            res.status === 204 && navigate("/admin/product/");
          })
          .catch((err: ApiClientError) => {
            err.message === "Network Error" &&
              toast.custom((t) => <NetworkErrorAlert toast={t} />);
          });
      }
    });
  }

  return (
    <>
      <section className="container mx-auto px-4 md:px-6 py-8">
        <form
          className="flex flex-col lg:flex-row lg:items-center gap-6  "
          onSubmit={formike.handleSubmit}
        >
          <div className=" overflow-hidden flex-1 grid place-content-center">
            <img
              src={product.img}
              className="rounded-lg object-fill   w-[400px] h-[500px]"
            />
            <div className="">
              <ImageChange
                title="Change"
                name={"img"}
                handleChange={(e: any) => handleImg(e)}
              />
            </div>
            {formike.errors.img && formike.touched.img && (
              <ErrorText>{formike.errors.img}</ErrorText>
            )}
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
                  className="lg:text-lg font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  value={formike.values.name}
                  name="name"
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
                  className="font-bold mt-1 block w-full py-2 px-3 border border-gray-300  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
                  className="font-bold mt-1 block w-full py-2 px-3 border border-gray-300  bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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

              <div className="flex items-center mt-4">
                <label
                  htmlFor="is_active"
                  className="ms-2 text-sm text-slate-500   mr-4"
                >
                  Activate
                </label>
                <input
                  name="is_active"
                  type="checkbox"
                  checked={formike.values.is_active}
                  value={formike.values.is_active}
                  onChange={formike.handleChange}
                  className=" text-red-600 bg-gray-100 border-gray-300 rounded"
                />
              </div>

              <div className="flex  items-center gap-2 mt-5">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-white border flex items-center  justify-center gap-3 border-red-700  rounded-md px-4 py-1 font-bold flex-1 "
                >
                  <ImBin className="size-4 " />
                  Delete
                </button>
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

        <div className="mt-14 ">
          <h1 className="text-3xl font-ptsans"> Colors </h1>
          <div className="grid lg:grid-cols-3 place-items-center py-4 gap-6 mx-4  md:mx-40  ">
            <AddColor id={id ? id : ""} />
            {data.map((item: Varation) => (
              <Varations id={item.id} img_1={item.img_1} color={item.color} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductViewPage;
