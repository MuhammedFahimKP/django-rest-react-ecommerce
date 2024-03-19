import { useFormik } from "formik";
import * as Yup from "yup";

import { UserSignInData, UserSignUpData } from "../types";
import ScreenContainer from "../ui/ScreenContainer";
import Form from "../ui/Form";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { FormEvent } from "react";

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
    type: "password",
  },
];

const initialValues: UserSignInData = {
  email: "",
  password: "",
};

const SigninForm = () => {
  const formike = useFormik<UserSignInData>({
    initialValues,
    onSubmit,
  });

  function onSubmit() {}

  return (
    <ScreenContainer>
      <Form title={"SignIn"} onSubmit={(e: any) => formike.handleSubmit(e)}>
        {formFields.map((field, index) => (
          <Input
            key={index}
            name={field.name}
            label={field.label}
            type={field.type}
            onBlur={formike.handleBlur}
            onChange={formike.handleChange}
            placeholder={field.label}
            value={formike.values[field.name]}
          />
        ))}
      </Form>
    </ScreenContainer>
  );
};

export default SigninForm;
