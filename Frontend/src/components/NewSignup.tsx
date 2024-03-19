import React from "react";

// 3rd party validators
import { useFormik } from "formik";
import * as Yup from "yup";

import toast, { Toaster } from "react-hot-toast";

import apiClient, {
  ApiClientError,
  ApiClientResponse,
} from "../services/api-client";

import { UserSignUpData as FormValues } from "../types";

import ScreenContainer from "../ui/ScreenContainer";
import Form from "../ui/Form";
import FormRow from "../ui/FormRow";
import InputContainer from "../ui/InputContainer";
import Input from "../ui/Input";
import ErrorText from "../ui/ErrorText";
import SuceessIcon from "../ui/SuccessIcon";

const initialValues: FormValues = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  password2: "",
};

interface FormFieldType {
  name: keyof FormValues;
  label: string;
  type: "text" | "password" | "number";
  had_sibling: boolean;
}

const formFeilds: FormFieldType[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    had_sibling: false,
  },
  {
    name: "first_name",
    label: "First Name",
    type: "text",
    had_sibling: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    type: "text",
    had_sibling: true,
  },

  {
    name: "password",
    label: "Passowrd",
    type: "password",
    had_sibling: false,
  },
  {
    name: "password2",
    label: "Confirm Passowrd",
    type: "text",
    had_sibling: false,
  },
];

const passwordRules =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

const signupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too Long")
    .required("Please Provide a FisrtName"),

  last_name: Yup.string()
    .min(2, "Too Short")
    .max(50, "Too long")
    .required("Please Provide a Last Name"),

  email: Yup.string().email("Invalid Email").required("Email Required"),

  password: Yup.string()
    .matches(passwordRules, {
      message:
        "Password Must Contain 1 Special Charater and 1 upper case  1 lower case password  1 number ",
    })
    .required("Password Required"),

  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords didnt match")
    .required("Please Confirm the Password "),
});

const NewSignup = () => {
  const formike = useFormik<FormValues>({
    initialValues,
    onSubmit,
    validationSchema: signupSchema,
  });
  const successalert = (name: string) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <SuceessIcon />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">Success</p>
              <p className="mt-1 text-sm text-gray-500">
                Thank you {name} we Send a acctivation link to your mail
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            &times;
          </button>
        </div>
      </div>
    ));

  const erros = formike.errors;
  const touched = formike.touched;

  function onSubmit(values: FormValues, actions: any) {
    console.log(values);
    apiClient
      .post("users/signup/", formike.values)
      .then((res: ApiClientResponse) => {
        if (res.status === 201) {
          console.log(res);
          successalert(res.data.data.first_name);
          actions.resetForm({
            values: {
              email: "",
              first_name: "",
              last_name: "",
              password: "",
              password2: "",
            },
          });
        }
      })
      .catch((err: ApiClientError) => {
        if (err.response?.status === 409) {
          formike.setErrors({ email: "email is already Taken" });
        }
      });
  }

  return (
    <ScreenContainer>
      <Form title="Signup" onSubmit={(e: any) => formike.handleSubmit(e)}>
        <FormRow>
          {formFeilds
            .filter((field: FormFieldType) => field.had_sibling)
            .map((field: FormFieldType, index) => (
              <div className="flex flex-col flex-1" key={index}>
                <Input
                  key={index}
                  name={field.name}
                  type={field.type}
                  label={field.label}
                  placeholder={field.label}
                  value={formike.values[field.name]}
                  onChange={formike.handleChange}
                  onBlur={formike.handleBlur}
                />
                {erros[field.name] && touched[field.name] && (
                  <ErrorText>{erros[field.name]}</ErrorText>
                )}
              </div>
            ))}
        </FormRow>

        {formFeilds
          .filter((field: FormFieldType) => !field.had_sibling)
          .map((field: FormFieldType, index) => (
            <React.Fragment key={index}>
              <Input
                name={field.name}
                type={field.type}
                label={field.label}
                placeholder={field.label}
                value={formike.values[field.name]}
                onChange={formike.handleChange}
                onBlur={formike.handleBlur}
              />
              {erros[field.name] && touched[field.name] && (
                <ErrorText>{erros[field.name]}</ErrorText>
              )}
            </React.Fragment>
          ))}
        <InputContainer>
          <p className="text-gray-500 dark:text-gray-400">
            Already Have and Acount{" "}
            <a
              href="#"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              SignIn
            </a>
          </p>
        </InputContainer>
        <Toaster />
      </Form>
    </ScreenContainer>
  );
};

export default NewSignup;
