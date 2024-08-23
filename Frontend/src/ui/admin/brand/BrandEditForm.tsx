import { useContext } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

import { AdminBrand } from "../../../@types";
import { useFormik } from "formik";

import * as Yup from "yup";
import apiClient, { ApiClientError } from "../../../services/api-client";
import SuccessAlert from "../../alerts/SuccessAlert";

import { toast, Toaster } from "react-hot-toast";

import { ToastContext } from "../../../context";
import NetworkErrorAlert from "../../alerts/NetworkErrorAlert";
import ErrorAlert from "../../alerts/ErrorAlert";

interface Props {
  form: boolean;
  handleForm: () => void;
  onSuccess: (name: string, id: string) => void;
  id: string;
  name: string;
}

const BrandEditForm = ({ form, handleForm, name, id, onSuccess }: Props) => {
  const context = useContext(ToastContext);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("please provide a name")
      .min(3, "brand name must be 3 charaters ")
      .max(20, "brand than 20 or 20  charaters "),
  });

  interface IntialValues {
    name: string;
  }

  const initialValues: IntialValues = { name: name };

  const formike = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  function handleSubmit(value: IntialValues) {
    context?.addAnotherToast();

    if (name === formike.values.name) {
      toast.custom((t) => <ErrorAlert toast={t} errorText="Nothing Changed" />);

      context?.removeAnotherToast();
      return;
    }

    apiClient
      .patch<AdminBrand>(`admin/brand/${id}/`, value)
      .then((res) => {
        res.status === 200 &&
          toast.custom((t) => (
            <SuccessAlert successText="Brand Upddated" toast={t} />
          )) &&
          formike.setValues({ ...formike.values, name: res.data.name });
        onSuccess(res.data.name, id);
      })
      .catch((err: ApiClientError) => {
        if (err.response?.status === 409) {
          formike.setErrors({
            ...formike.errors,
            name: "Brand Already Exist with Same Name",
          });
        }

        if (err.message === "Network Error") {
          toast.custom((t) => <NetworkErrorAlert toast={t} />);
        }
      });

    context?.removeAnotherToast();
  }

  return (
    <Dialog placeholder={"name"} open={form} handler={handleForm} size="xs">
      <DialogHeader placeholder={"dailogou"}>Edit Brand</DialogHeader>
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
              Brand
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
              Save
            </button>
          </DialogFooter>
        </form>
        <Toaster />
      </DialogBody>
    </Dialog>
  );
};

export default BrandEditForm;
