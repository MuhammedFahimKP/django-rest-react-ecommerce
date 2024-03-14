import { ReactNode } from "react";
import SubmitBtn from "./SubmitBtn";
import InputContainer from "./InputContainer";
interface Props {
  children: ReactNode;
  title: string;
}

const Form = ({ children, title }: Props) => {
  return (
    <div
      className="lg:min-w-[30%] max-sm:min-w-[90%] sm:min-w-[60%]    overflow-hidden
       shadow-2xl border-2 border-gray-50 rounded-md"
    >
      <div className="bg-black  w-full text-white h-16 p-4">
        <h1 className={"text-md md:text-lg lg:text-xl font-bold "}>{title}</h1>
      </div>
      <div className="p-6">
        {children}
        <InputContainer>
          <SubmitBtn disabled={false}>Submit</SubmitBtn>
        </InputContainer>
      </div>
    </div>
  );
};

export default Form;
