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
      className="lg:min-w-[30%] max-sm:max-w-[90%] sm:min-w-[40%] md:max-w-[20%] overflow-hidden
       shadow-2xl border-2 border-gray-50 rounded-lg"
      onSubmit={(e) => onSubmit(e)}
    >
      <div className="bg-black  overflow-hidden flex flex-row-reverse itmes-center align-middle justify-between  w-full text-white h-16 p-3">
        <div>
          <img src={whiteLogo} className="object-fill w-50 h-10" />
        </div>
        <div>
          <h1 className={"mt-2 ml-3  text-2xl  font-mono font-extrabold "}>
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
