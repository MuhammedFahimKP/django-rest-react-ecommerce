import { ChangeEvent, FocusEvent } from "react";

interface Props {
  type: "password" | "text" | "number";
  placeholder: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

const Input = ({
  type,
  placeholder,
  name,
  onChange,
  value,
  onBlur,
  label,
}: Props) => {
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border  focus:bg-white focus:outline-none"
        onBlur={onBlur}
      />
    </div>
    // <div className={"flex" + "flex-" + "col" + " mt-1 px-2   py-1   w-full"}>
    //   <label
    //     className="block  text-gray-500 ml-2  text-sm   mb-1"
    //     htmlFor={name}
    //   >
    //     {label}
    //   </label>
    //   <input
    //     className="p-2  w-full rounded-md outline-none focus:ring-3 border-2 border-black focus:border-gray-500"
    //     type={type}
    //     name={name}
    //     value={value}
    //     placeholder={placeholder}
    //     onChange={(e) => onChange(e)}
    //     onBlur={onBlur}
    //   />
    // </div>
  );
};

export default Input;
