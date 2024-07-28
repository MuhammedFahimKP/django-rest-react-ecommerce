import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { CredentialResponse, useGoogleOneTapLogin } from "@react-oauth/google";
import { useFormik } from "formik";

import * as Yup from "yup";

import { useNavigate } from "react-router-dom";

import { UserSignInData } from "../../@types";

import { setUser, setAuthTokens } from "../../slices/authenticationSlice";
import { RootState } from "../../store";

import Form from "../../ui/user/Form";
import Input from "../../ui/user/Input";
import ErrorText from "../../ui/user/ErrorText";
import apiClient, {
  ApiClientError,
  ApiClientResponse,
} from "../../services/api-client";

import { handleGoogleAuth } from "../../utils/auth";
import { EncryptString } from "../../utils/hashing";
import Logo from "../assets/blackLogo.svg";

interface FormField {
  name: keyof UserSignInData;
  label: string;
  type: "text" | "password";
}

const formFields: FormField[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
  },
  {
    name: "password",
    label: "Password",
    type: "text",
  },
];

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

const SigninForm = () => {
  const user = useSelector((state: RootState) => state.persistedReducer.auth);

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
  const dispatch = useDispatch();

  function onSubmit(values: UserSignInData, actions: any) {
    let password = values.password;
    password = EncryptString(password);

    const newFormValues = { ...values, password };

    apiClient
      .post("users/signin/", newFormValues)
      .then((res: ApiClientResponse) => {
        if (res.status === 200) {
          actions.resetForm({
            values: {
              email: "",
              password: "",
            },
          });

          dispatch(
            setAuthTokens({
              refresh: res.data.refresh,
              access: res.data.access,
            })
          );
          dispatch(setUser(res.data.user));
          navigate("/");
        }
      })
      .catch((err: ApiClientError) => {
        const errorData: any = err.response?.data;
        if (err.response?.status == 403) {
          errorData?.passowrd &&
            formike.setErrors({ password: "incorrect password" });

          errorData?.User && formike.setErrors({ email: "Email Not Verified" });
        }
        if (err.response?.status == 404) {
          formike.setErrors({ email: "User with the mail not found" });
          console.log("404");
        }
        console.log(err);
      });
  }

  return (
    <Form title="Welcome Back  " onSubmit={(e: any) => formike.handleSubmit(e)}>
      {formFields.map((field, index) => (
        <React.Fragment key={index}>
          <Input
            name={field.name}
            label={field.label}
            type={field.type}
            onBlur={formike.handleBlur}
            onChange={formike.handleChange}
            placeholder={field.label}
            value={formike.values[field.name]}
          />
          {errors[field.name] && touched[field.name] && (
            <ErrorText>{errors[field.name]}</ErrorText>
          )}
        </React.Fragment>
      ))}
    </Form>
  );
};

export default SigninForm;
