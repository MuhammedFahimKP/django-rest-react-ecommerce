import { useState, useContext, type ChangeEvent } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import { AdminCategory } from "../../../@types";
import { useFormik } from "formik";

import * as Yup from "yup";
import apiClient, { ApiClientError } from "../../../services/api-client";
import SuccessAlert from "../../alerts/SuccessAlert";

import ImageUploaderWithImage from "../../../components/admin/ImageUploaderWithImage";

import { genrateImageUrl } from "../../../utils/image";

import { toast, Toaster } from "react-hot-toast";

import { FILE_REQUEST_CONFIG } from "../../../utils/constants";

import { ToastContext, DataAddedContext } from "../../../context";
import NetworkErrorAlert from "../../alerts/NetworkErrorAlert";

interface Props {
  form: boolean;
  handleForm: () => void;
}

const CategoryAddFrom = ({ form, handleForm }: Props) => {
  const context = useContext(ToastContext);

  const dataAddedContext = useContext(DataAddedContext);

  const [image, setImage] = useState(
    "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp"
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("please provide a name")
      .min(3, "category name must be 3 charaters ")
      .max(20, "category than 20 or 20  charaters "),

    img: Yup.mixed().required("please provide a image"),
  });

  interface IntialValues {
    name: string;
    img: string | File | Blob;
  }

  const initialValues: IntialValues = { name: "", img: "" };

  const formike = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  function handleSubmit(value: IntialValues, actions: any) {
    context?.addAnotherToast();

    apiClient
      .post<AdminCategory>(`admin/categoery/`, value, FILE_REQUEST_CONFIG)
      .then((res) => {
        dataAddedContext?.mutate();
        res.status === 201 &&
          toast.custom((t) => (
            <SuccessAlert successText="Category Added" toast={t} />
          )) &&
          actions.resetForm({
            values: {
              name: "",
              img: "",
            },
          }) &&
          formike.setValues({ ...formike.values, name: res.data.name });

        setImage(
          "https://raw.githubusercontent.com/MuhammedFahimKP/gameStore/main/src/assets/no-image-placeholder.webp"
        );
      })
      .catch((err: ApiClientError) => {
        if (err.response?.status === 409) {
          formike.setErrors({
            ...formike.errors,
            name: "Category Already Exist with Same Name",
          });
        }

        if (err.message === "Network Error") {
          toast.custom((t) => <NetworkErrorAlert toast={t} />);
        }
      });

    context?.removeAnotherToast();
  }

  function handleImg(event: ChangeEvent<HTMLInputElement>) {
    if (event.target?.files) {
      const img = event.target.files[0];
      const proccessed_img = genrateImageUrl(img);
      setImage(proccessed_img);

      formike.setValues({ ...formike.values, img: img });
    }
  }

  return (
    <Dialog placeholder={"name"} open={form} handler={handleForm} size="xs">
      <DialogHeader placeholder={"dailogou"}>Add Categoery</DialogHeader>
      <DialogBody placeholder={"hdjhfhjk"}>
        <form
          className="max-w-md text-indigo-100 flex  flex-col  gap-3 "
          onSubmit={formike.handleSubmit}
        >
          <div className="">
            <label
              htmlFor="name"
              className="lg:text-lg black text-xs pl-2 text-slate-500"
            >
              Category
            </label>

            <input
              className="lg:text-lg text-black font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              name="name"
              type="text"
              onChange={formike.handleChange}
              value={formike.values.name}
            />
            {formike.errors.name && formike.touched.name && (
              <p className="text-red-500">{formike.errors.name}</p>
            )}
          </div>

          <ImageUploaderWithImage
            className="w-full h-full rounded-md "
            name="img"
            src={image}
            handleChange={(e: any) => handleImg(e)}
            error={
              formike.errors.img &&
              formike.touched.img &&
              typeof formike.errors.img === "string"
                ? formike.errors.img
                : ""
            }
          />

          <DialogFooter placeholder={undefined}>
            <button
              className="bg-white hover:bg-red-50 text-red-500 font-bold py-2 px-4 rounded-md transition-all mr-2 "
              type="button"
              onClick={handleForm}
            >
              Cancel
            </button>
            <button
              className="bg-black text-white font-bold py-2 px-4 rounded-md hover:opacity-65 transition-all "
              type="submit"
            >
              Add
            </button>
          </DialogFooter>
        </form>
        <Toaster />
      </DialogBody>
    </Dialog>
  );
};

export default CategoryAddFrom;
