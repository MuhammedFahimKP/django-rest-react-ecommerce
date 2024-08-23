import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useFormik } from "formik";

import { setAuthState } from "../../slices/authenticationSlice";

import {
  useGoogleOneTapLogin,
  type CredentialResponse,
} from "@react-oauth/google";

import { dispatch, RootState } from "../../store";

import apiClient, {
  ApiClientResponse,
  ApiClientError,
} from "../../services/api-client";

import { handleGoogleAuth } from "../../utils/auth";

import Logo from "../../assets/whiteLogo.svg";

import ErrorText from "../../ui/user/ErrorText";

import * as Yup from "yup";

import { UserSignUpData } from "../../@types";
import toast from "react-hot-toast";
import SuccessAlert from "../../ui/alerts/SuccessAlert";

const covers = [
  "https://espanshe.com/cdn/shop/files/Canvas_3.png?v=1684475994&width=575",
  "https://espanshe.com/cdn/shop/files/Canvas_10_9295a618-dd8e-4abc-a46d-a6f85d8080d5.png?v=1686306955&width=750",
];

const NewSignin = () => {
  const { user } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const signInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    first_name: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .required("First name is required"),
    last_name: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .required("Last name is required"),
    password: Yup.string()
      .test(
        "alphanumeric",
        "Password must contain at least one letter and one number",
        (value) => {
          if (!value) return false;
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /\d/.test(value);
          return hasLetter && hasNumber;
        }
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues: UserSignUpData = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  };

  function handleGoogleAuthClick(id_token: string) {
    if (user === null) {
      handleGoogleAuth(id_token);
    }
    return;
  }

  useGoogleOneTapLogin({
    onSuccess: (res: CredentialResponse) =>
      res.credential && handleGoogleAuthClick(res.credential),
  });

  const formike = useFormik<UserSignUpData>({
    initialValues,
    onSubmit,
    validationSchema: signInSchema,
  });

  const errors = formike.errors;
  const touched = formike.touched;

  function onSubmit(values: UserSignUpData, actions: any) {
    apiClient
      .post("users/signup/", values)
      .then((res: ApiClientResponse) => {
        if (res.status === 201) {
          actions.resetForm({
            values: {
              email: "",
              password: "",
              first_name: "",
              last_name: "",
            },
          });

          dispatch(setAuthState("ACTIVATION"));

          toast.custom((t) => (
            <SuccessAlert
              toast={t}
              successText="Please Check Email For Activation"
            />
          ));
        }
      })
      .catch((err: ApiClientError) => {
        alert("error");
        if (err.response?.status == 409) {
          formike.setErrors({ email: "email already taken" });
        }
      });
  }

  const [currentCoverIndex, setCoverIndex] = useState(0);

  function handelCoverChange() {
    currentCoverIndex != covers.length - 1
      ? setCoverIndex(currentCoverIndex + 1)
      : setCoverIndex(0);

    setTimestamp(Date.now());
  }

  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const changeImageInterval = setInterval(() => {
      handelCoverChange();
    }, 1000);

    return () => clearInterval(changeImageInterval);
  }, [currentCoverIndex]);

  return (
    <div className="w-screen h-screen">
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex rounded-2xl shadow-2xl  max-w-3xl overflow-hidden">
          <div className="md:w-1/2 px-5 pt-2">
            <h2 className="text-2xl font-bold font-ptsans">Signup</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you don't have an account, please Register
            </p>
            <form className="mt-2" onSubmit={formike.handleSubmit}>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={formike.handleChange}
                  id=""
                  value={formike.values.email}
                  placeholder="Enter Email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border  focus:bg-white focus:outline-none"
                  autoComplete=""
                />
                {errors["email"] && touched["email"] && (
                  <ErrorText> {errors["email"]}</ErrorText>
                )}
              </div>

              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formike.values.first_name}
                  onChange={formike.handleChange}
                  id=""
                  placeholder="Enter First Name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border  focus:bg-white focus:outline-none"
                  autoComplete=""
                />
                {errors["first_name"] && touched["first_name"] && (
                  <ErrorText> {errors["first_name"]}</ErrorText>
                )}
              </div>

              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  onChange={formike.handleChange}
                  value={formike.values.last_name}
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border  focus:bg-white focus:outline-none"
                  autoComplete=""
                />
                {errors["last_name"] && touched["last_name"] && (
                  <ErrorText> {errors["last_name"]}</ErrorText>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  onChange={formike.handleChange}
                  name="password"
                  id=""
                  value={formike.values.password}
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border 
            focus:bg-white focus:outline-none"
                />

                {errors["password"] && touched["password"] && (
                  <ErrorText> {errors["password"]}</ErrorText>
                )}
              </div>
              <div className="text-right ">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white font-semibold rounded-lg
          px-4 py-3 mt-6"
              >
                Sign Up
              </button>
            </form>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you already have an account...</p>
              <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">
                Sign In
              </button>
            </div>
          </div>
          <div className="w-1/2 relative md:block hidden ">
            <img
              src={`${covers[currentCoverIndex]}?_=${timestamp}`}
              className="rounded-sm brightness-75  object-contain  transition-all duration-1000"
              alt="page img"
            />
            <img
              src={Logo}
              className="absolute top-0 left-1/2 -translate-x-1/2   h-auto w-52     object-fill"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewSignin;
