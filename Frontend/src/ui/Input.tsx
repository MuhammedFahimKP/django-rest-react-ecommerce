import { ChangeEvent } from "react";

interface Props {
  type: "password" | "text" | "number";
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ type, placeholder, name, onChange, value }: Props) => {
  return (
    <input
      className="p-2  w-full rounded-md outline-none focus:ring-3 border-2 border-black"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    />
  );
};

export default Input;
