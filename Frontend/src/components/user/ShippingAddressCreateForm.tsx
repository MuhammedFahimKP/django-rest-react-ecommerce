import React, { ChangeEvent, useContext } from "react";

import { useFormik } from "formik";

import { fetchStateByPincode } from "../../services/post-client";

import * as yup from "yup";

import { DELIVERY_AVAILABLE_STATES } from "../../utils/constants";

import type { ShippingAddress } from "../../@types";

import { Dialog } from "@material-tailwind/react";

import ErrorText from "../../ui/user/ErrorText";

import toast, { Toaster } from "react-hot-toast";

import SuccessAlert from "../../ui/alerts/SuccessAlert";
import apiClient, { ApiClientError } from "../../services/api-client";

import { ToastContext } from "../../context";
import ErrorAlert from "../../ui/alerts/ErrorAlert";

interface Props {
  open: boolean;
  handleOpen: () => void;
  setShippingAddress: React.Dispatch<React.SetStateAction<ShippingAddress[]>>;
}

const ShippingAddressCreateForm = ({
  setShippingAddress,
  open,
  handleOpen,
}: Props) => {
  const toastContext = useContext(ToastContext);
  const validationSchema = yup.object().shape({
    pin_code: yup
      .string()
      .matches(/^\d{6}$/, "Invalid ZIP code")
      .max(6, "not a valid  zip code")
      .min(6, "not a valid  zip code")
      .required("ZIP Code required"),

    city: yup
      .string()
      .max(100, "not a valid  city ")
      .min(6, "not a valid city")
      .required("City required"),
    state: yup
      .string()
      .oneOf(DELIVERY_AVAILABLE_STATES, "Delivery Not Available")
      .required("State Required"),

    place: yup
      .string()
      .max(100, "not a valid  place ")
      .min(6, "not a valid place")
      .required("Place required"),

    landmark: yup
      .string()
      .max(100, "not a valid  landmark ")
      .min(6, "not a valid landmark")
      .required("Landmark required"),

    phone_no: yup
      .string()
      .max(10, "not valid phone number")
      .min(10, "not valid phone number")
      .matches(/^\d{10}$/, "Not a Valid Phone No ")
      .required("Phone No required"),

    alter_phone_no: yup
      .string()
      .max(10, "not valid phone number")
      .min(10, "not valid phone number")
      .matches(/^\d{10}$/, "Not a Valid Phone No ")
      .notOneOf([yup.ref("phone_no"), null], "use another Phone No")
      .required("Alter Phone No required"),
  });

  const initialValues: Partial<ShippingAddress> = {
    pin_code: "",
    state: "",
    city: "",
    place: "",
    landmark: "",
    phone_no: "",
    alter_phone_no: "",
  };

  function handleFormSubmit(values: Partial<ShippingAddress>, actions: any) {
    toastContext?.addAnotherToast();
    apiClient
      .post("users/shipping-address/", values)
      .then((res) => {
        toast.custom((t) => (
          <SuccessAlert successText="Address Created" toast={t} />
        ));
        setShippingAddress((prev: ShippingAddress[]) => {
          const newData = [...prev];
          actions.resetForm({
            values: initialValues,
          });
          newData.push(res.data);
          return newData;
        });
      })
      .catch((err: ApiClientError) => {
        toast.custom((t) => <ErrorAlert toast={t} errorText={err?.message} />);
      })
      .finally(() => toastContext?.removeAnotherToast());
  }

  const {
    values,
    errors,
    touched,
    setErrors,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
  });

  const setStateByPinCode = async (pinCode: string) => {
    const value = await fetchStateByPincode(pinCode);

    pinCode.length == 6 && value !== "Not Found"
      ? setFieldValue("state", value ? value : "")
      : (function () {
          setFieldValue("state", "");
          setErrors({
            ...errors,
            pin_code: "Not a valid zip code",
          });
        })();
  };

  const handlePostChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.value) {
      const value = event.target.value;
      setFieldValue("pin_code", value);
      setStateByPinCode(value);
    }
  };

  return (
    <>
      {/* <button onClick={handleOpen} className="">
        Add a New Address
      </button> */}

      <Dialog
        open={open}
        placeholder={undefined}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <div className="bg-gray-100 dark:bg-gray-900  rounded-lg overflow-hidden font-ubuntu">
          <div className="w-full max-w-3xl mx-auto">
            <form
              className="bg-white  dark:bg-gray-800 p-8  shadow-md border dark:border-gray-700 "
              onSubmit={handleSubmit}
            >
              {/* Shipping Address */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                  Add new Shipping Address
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="place"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Place
                  </label>
                  <input
                    type="text"
                    name="place"
                    value={values.place}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />

                  {touched?.place && errors?.place && (
                    <ErrorText>{errors.place}</ErrorText>
                  )}
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="landmark"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    LandMark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={values.landmark}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />

                  {touched?.landmark && errors?.landmark && (
                    <ErrorText>{errors.landmark}</ErrorText>
                  )}
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="city"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />

                  {touched?.city && errors?.city && (
                    <ErrorText>{errors.city}</ErrorText>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="pin_code"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="pin_code"
                      value={values.pin_code}
                      onChange={(e: any) => handlePostChange(e)}
                      onBlur={handleBlur}
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />

                    {touched?.pin_code && errors?.pin_code && (
                      <ErrorText>{errors.pin_code}</ErrorText>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={values.state}
                      disabled={true}
                      onBlur={handleBlur}
                      className="w-full rounded-lg border bg-gray-100 py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />

                    {touched?.state && errors?.state && (
                      <ErrorText>{errors.state}</ErrorText>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="phone_no"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Phone No (+91)
                  </label>
                  <input
                    type="text"
                    name="phone_no"
                    value={values.phone_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />

                  {touched?.phone_no && errors?.phone_no && (
                    <ErrorText>{errors.phone_no}</ErrorText>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="alter_phone_no"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Alter Phone No (+91)
                  </label>
                  <input
                    type="text"
                    name="alter_phone_no"
                    value={values.alter_phone_no}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />

                  {touched?.alter_phone_no && errors?.alter_phone_no && (
                    <ErrorText>{errors.alter_phone_no}</ErrorText>
                  )}
                </div>
              </div>
              {/* Payment Information */}

              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg transition-all duration-1000 hover:bg-white border  hover:text-black border-black "
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </Dialog>
    </>
  );
};

export default ShippingAddressCreateForm;
