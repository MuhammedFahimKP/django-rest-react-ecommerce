import { FormEvent, ReactNode } from "react";
import SubmitBtn from "./SubmitBtn";
import InputContainer from "./InputContainer";
import whiteLogo from "../assets/whiteLogo.svg";

interface Props {
  children: ReactNode;
  title: string;
  onSubmit: (e: FormEvent) => void;
}

const Form = ({ children, title, onSubmit }: Props) => {
  return (
    <form
      className="w-[90%] md:max-w-md shadow-2xl rounded-lg boder-2 pb-4 border-gray-200 overflow-hidden "
      onSubmit={(e) => onSubmit(e)}
    >
      <div className="bg-black  overflow-hidden flex flex-row-reverse itmes-center align-middle justify-between  w-full text-black h-16 p-3">
        <div>
          <img src={whiteLogo} className="object-fill w-50 h-10" />
        </div>
        <div>
          <h1 className={"mt-2 ml-3  text-3xl  font-bold text-white  "}>
            {title}
          </h1>
        </div>
      </div>
      <div className="px-4 pt-2 pb-3">
        {children}

        <InputContainer>
          <SubmitBtn disabled={true}>Submit</SubmitBtn>
        </InputContainer>
      </div>
    </form>
  );
};

export default Form;
