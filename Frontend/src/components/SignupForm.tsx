import Form from "../ui/Form";
import InputContainer from "../ui/InputContainer";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { DynamicObj } from "../types";
import { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { SignupValidator } from "../utils/validators";
import { errorFieldName } from "../utils/validators";
import FormRow from "../ui/FormRow";

import apiClient from "../services/api-client";

interface FormFieldType {
  name: string;
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

const prepareForm = (formArr: FormFieldType[]) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
};

const SignupForm = () => {
  const [form, setForm] = useState<DynamicObj>(prepareForm(formFeilds));

  const [formError, setFormError] = useState<DynamicObj>({});
  // const [isSubmit, setIsSubmit] = useState(false);

  const validate = (name: string, value: string) => {
    if (value === "") {
      setFormError({
        ...formError,
        [name]: `plase provide a ${errorFieldName[name]}`,
      });
    }

    if (name !== "password2") {
      const error = SignupValidator(name, value);

      if (error === "") {
        const { [name]: error, ...rest } = formError;
        setFormError({ ...rest });
      } else {
        setFormError({ ...formError, [name]: error });
      }
    }

    if (name === "password2") {
      if (value === form.password) {
        const { [name]: error, ...rest } = formError;
        setFormError({ ...rest });
      } else {
        setFormError({ ...formError, [name]: "passwords are not matching" });
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
    validate(name, value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(formError).length === 0) {
      const res = apiClient.post("users/signup/", form).then((res) => {});
      console.log(res);
    }
  };

  return (
    <form
      className="h-screen  flex justify-center items-center"
      onSubmit={(e) => onSubmit(e)}
    >
      <Form title="Signup">
        <FormRow>
          {formFeilds
            .filter((field: FormFieldType) => field.had_sibling)
            .map((field: FormFieldType, index) => (
              <InputContainer key={index}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  name={field.name}
                  type={field.type}
                  placeholder={field.label}
                  value={form[field.name]}
                  onChange={onChange}
                />
                {formError[field.name] && (
                  <p className="text-sm mt-1  text-red-500 ">
                    {formError[field.name]}
                  </p>
                )}
              </InputContainer>
            ))}
        </FormRow>

        {formFeilds
          .filter((field: FormFieldType) => !field.had_sibling)
          .map((field: FormFieldType, index) => (
            <InputContainer key={index}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                name={field.name}
                type={field.type}
                placeholder={field.label}
                value={form[field.name]}
                onChange={onChange}
              />
              {formError[field.name] && (
                <p className="text-sm mt-1 text-red-500 ">
                  {formError[field.name]}
                </p>
              )}
            </InputContainer>
          ))}
      </Form>
    </form>
  );
};

export default SignupForm;
