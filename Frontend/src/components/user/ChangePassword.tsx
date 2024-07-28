import { useFormik } from "formik";
import { useWindowDimensions } from "../../hooks";

import * as Yup from "yup";
import ErrorText from "../../ui/user/ErrorText";
import apiClient, { type ApiClientError } from "../../services/api-client";

import toast from "react-hot-toast";

import SuccessAlert from "../../ui/alerts/SuccessAlert";
import ErrorAlert from "../../ui/alerts/ErrorAlert";

interface IntialFormValues {
  password: string;
  new_password: string;
  confirm_new_password: string;
}

const ChangePassword = () => {
  const { width } = useWindowDimensions();
  const passwordRules =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  const validatationSchema = Yup.object().shape({
    password: Yup.string().required("Password Required"),

    new_password: Yup.string()
      .matches(passwordRules, {
        message:
          "Password Must Contain 1 Special Character and 1 upper case  1 lower case password and  1 number ",
      })
      .required("New Password Required"),

    confirm_new_password: Yup.string()
      .oneOf([Yup.ref("newPassword")], "not matching new password ")
      .required(),
  });

  const initialValues: IntialFormValues = {
    password: "",
    confirm_new_password: "",
    new_password: "",
  };

  const { handleSubmit, handleChange, setErrors, values, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: validatationSchema,
      onSubmit: (values: IntialFormValues) => {
        for (let i in Object.entries(values)) {
          alert(i[1]);
        }
        handlePasswordCahnge(values.password, values.new_password);
      },
    });

  const handlePasswordCahnge = (password: string, new_password: string) => {
    apiClient
      .patch("users/change-password/", {
        password,
        new_password,
      })
      .then((res) => {
        res.status === 200 &&
          toast.custom((t) => (
            <SuccessAlert
              successText="Password Changed sucessfully"
              toast={t}
            />
          ));
      })
      .catch((err: ApiClientError) => {
        err.response?.status === 403 &&
          toast.custom((t) => (
            <ErrorAlert
              errorText="google user doesnt have password"
              toast={t}
            />
          ));

        err.status === 401 &&
          setErrors({ ...errors, password: "password doesnt match" });
      });
  };

  return (
    <div className="w-full px-auto  place-content-center ">
      <div className="">
        <div className="w-full px-6 pb-8   border-2 border-gray-200 rounded-lg">
          <form
            onSubmit={handleSubmit}
            className="items-center mt-8 sm:mt-14 text-[#202142]"
          >
            {" "}
            <h2 className="pl-4 text-2xl mb-4 font-bold sm:text-xl">
              Change Password
            </h2>
            <div className="flex flex-col items-center w-full mb-2 md:mb-0 overflow-hidden space-x-0 space-y-2 md:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full ">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                />
                {width < 700 && errors.password && touched.password && (
                  <ErrorText>{errors.password}</ErrorText>
                )}
              </div>
              <div className="w-full">
                <label
                  htmlFor="new_password"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  onChange={handleChange}
                  value={values.new_password}
                  name="new_password"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                />
                {width < 700 && errors.new_password && touched.new_password && (
                  <ErrorText>{errors.new_password}</ErrorText>
                )}
              </div>
            </div>
            {width > 700 && (
              <div className="flex flex-col items-center w-full mb-2  overflow-hidden space-x-0 space-y-2 md:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full ">
                  {errors.password && touched.password && (
                    <ErrorText>{errors.password}</ErrorText>
                  )}
                </div>
                <div className="w-full">
                  {errors.new_password && touched.new_password && (
                    <ErrorText>{errors.new_password}</ErrorText>
                  )}
                </div>
              </div>
            )}
            <div className="mb-4  w-full   md:w-1/2  ">
              <label
                htmlFor="confrim_new_password"
                className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
              >
                confirm new Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                value={values.confirm_new_password}
                name="confirm_new_password"
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
              />
              {errors.confirm_new_password && touched.confirm_new_password && (
                <ErrorText>{errors.confirm_new_password}</ErrorText>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
