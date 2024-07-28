import React from "react";
import { useFormik } from "formik";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";

import * as Yup from "yup";

import apiClient, { ApiClientError } from "../../services/api-client";

import { Toaster, toast } from "react-hot-toast";
import { AdminColor } from "../../@types";

interface ColorAddForm {
  name: string;
}

interface Props {
  form: boolean;
  setForm: (value: boolean) => void;
  setColor: (value: AdminColor[]) => void;
  colors: AdminColor[];
}

const successToast = (color: string) =>
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
        Color {color} successfully.
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

const AddColorForm = ({ form, setForm, setColor, colors }: Props) => {
  const initialValues: ColorAddForm = {
    name: "",
  };

  const colorAddValidationSchema = Yup.object().shape({
    name: Yup.string().required("please provide a color"),
  });

  const formike = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema: colorAddValidationSchema,
  });

  function handleSubmit(values: ColorAddForm, actions: any) {
    const data = {
      ...values,
      name: values.name[0].toUpperCase() + values.name.slice(1),
    };
    apiClient
      .post<AdminColor>("admin/color/", data)
      .then((res) => {
        res.status == 201 && successToast(res.data.name);
        actions.resetForm({
          values: {
            name: "",
          },
        });
        setColor([...colors, res.data]);

        setTimeout(() => setForm(!form), 2000);
      })
      .catch((err: ApiClientError) => {
        console.log(err);
        if (err?.response?.status == 409) {
          console.log(err);
          formike.setErrors({ name: "color already exists" });
        }
      });
  }

  return (
    <React.Fragment>
      <Dialog
        placeholder={"name"}
        open={form}
        handler={() => setForm(!form)}
        size="xs"
      >
        <DialogHeader placeholder={"dailogou"}>Add Color</DialogHeader>
        <DialogBody placeholder={"hdjhfhjk"}>
          <form
            className="max-w-md text-indigo-100 flex  flex-col  gap-3"
            onSubmit={formike.handleSubmit}
          >
            <div className="">
              <label
                htmlFor="stock"
                className="lg:text-lg  black text-xs pl-2 text-slate-500"
              >
                Color
              </label>
              <input
                className="lg:text-lg  text-black font-medium mt-1 block w-full py-2 font-roboto px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                name="name"
                type="text"
                onChange={formike.handleChange}
                value={formike.values.name}
              />
              {formike.errors.name && formike.touched.name && (
                <p className="text-red-500 ml-2 mt-2">{formike.errors.name}</p>
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
        <Toaster position="top-center" reverseOrder={false} />
      </Dialog>
    </React.Fragment>
  );
};

export default AddColorForm;
