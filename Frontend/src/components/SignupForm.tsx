import Form from "../ui/Form";
import InputContainer from "../ui/InputContainer";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { useState } from "react";
import { ChangeEvent } from "react";
import FormRow from "../ui/FormRow";

interface FormFieldType {
  name: string;
  label: string;
  type: "text" | "password" | "number";
  had_sibling: boolean;
}

interface FormData {
  [key: string]: string;
}

const formFeilds: FormFieldType[] = [
  {
    name: "email",
    label: "Email",
    type: "text",
    had_sibling: false,
  },
  {
    name: "fist_name",
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
    type: "password",
    had_sibling: false,
  },
];

const prepareForm = (formArr: FormFieldType[]) => {
  return formArr.reduce((r, v) => ({ ...r, [v.name]: "" }), {});
};

const SignupForm = () => {
  const [form, setForm] = useState<FormData>(prepareForm(formFeilds));
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  console.log(form);

  return (
    <div className="h-screen  flex justify-center items-center">
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
            </InputContainer>
          ))}
      </Form>
    </div>
  );
};

export default SignupForm;
