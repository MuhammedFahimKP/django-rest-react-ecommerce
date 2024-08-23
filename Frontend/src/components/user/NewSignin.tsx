import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {
  useGoogleOneTapLogin,
  type CredentialResponse,
} from "@react-oauth/google";

import { RootState } from "../../store";

import { logedIn } from "../../slices/authenticationSlice";

import apiClient, {
  ApiClientResponse,
  ApiClientError,
} from "../../services/api-client";

import { handleGoogleAuth } from "../../utils/auth";

import Logo from "../../assets/whiteLogo.svg";

import ErrorText from "../../ui/user/ErrorText";

import * as Yup from "yup";

import { UserSignInData } from "../../@types";

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
      .email("Not a Valid Email")
      .required("Please Provide a Email"),
    password: Yup.string().required("Please Provide the password"),
  });

  const initialValues: UserSignInData = {
    email: "",
    password: "",
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

  const navigate = useNavigate();

  const formike = useFormik<UserSignInData>({
    initialValues,
    onSubmit,
    validationSchema: signInSchema,
  });

  const errors = formike.errors;
  const touched = formike.touched;
  const dispatch = useDispatch<any>();

  function onSubmit(values: UserSignInData, actions: any) {
    apiClient
      .post("users/signin/", values)
      .then((res: ApiClientResponse) => {
        if (res.status === 200) {
          actions.resetForm({
            values: {
              email: "",
              password: "",
            },
          });

          dispatch(
            logedIn({
              refresh: res.data.refresh,
              access: res.data.access,
              user: res.data.user,
            })
          );

          navigate("/");
        }
      })
      .catch((err: ApiClientError) => {
        const errorData: any = err.response?.data;
        if (err.response?.status == 403) {
          errorData?.passowrd &&
            formike.setErrors({ password: "incorrect password" });

          errorData?.User && formike.setErrors({ email: "Email Not Verified" });

          errorData?.["auth_method"] &&
            formike.setErrors({ email: "try with google authentication" });
        }
        if (err.response?.status == 404) {
          formike.setErrors({ email: "User with the mail not found" });
          console.log("404");
        }
        console.log(err);
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
          <div className="md:w-1/2 px-5 pt-12">
            <h2 className="text-2xl font-bold font-ptsans">Signup</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>
            <form className="mt-6" onSubmit={formike.handleSubmit}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={formike.handleChange}
                  id=""
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border  focus:bg-white focus:outline-none"
                  autoComplete=""
                />
                {errors["email"] && touched["email"] && (
                  <ErrorText> {errors["email"]}</ErrorText>
                )}
              </div>
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  onChange={formike.handleChange}
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  minLength={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border 
            focus:bg-white focus:outline-none"
                />

                {errors["password"] && touched["password"] && (
                  <ErrorText> {errors["password"]}</ErrorText>
                )}
              </div>
              <div className="text-right mt-2">
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
                Log In
              </button>
            </form>
            {/* <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>
            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-6 h-6"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use xlinkHref="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              <span className="ml-4">Login with Google</span>
            </button> */}
            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you don't have an account...</p>
              <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400  ">
                Register
              </button>
            </div>
          </div>
          <div className="w-1/2 relative md:block hidden ">
            <img
              src={`${covers[currentCoverIndex]}?_=${timestamp}`}
              className="rounded-sm brightness-75   transition-all duration-1000"
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
