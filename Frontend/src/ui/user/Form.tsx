import { FormEvent, ReactNode } from "react";
import SubmitBtn from "./SubmitBtn";
import InputContainer from "./InputContainer";

interface Props {
  children: ReactNode;
  title: string;
  onSubmit: (e: FormEvent) => void;
}

const Form = ({ children, title, onSubmit }: Props) => {
  return (
    <div className="w-screen" onSubmit={(e) => onSubmit(e)}>
      <section className="min-h-screen flex items-center justify-center">
        <div className="flex rounded-2xl shadow-2xl  max-w-3xl overflow-hidden">
          <div className="md:w-1/2 px-5 pt-12">
            <h2 className="text-2xl font-bold font-ptsans">{title}</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>
          </div>
        </div>
      </section>

      <div className="">
        {children}

        <InputContainer>
          <SubmitBtn disabled={true}>Submit</SubmitBtn>
        </InputContainer>
      </div>
    </div>
  );
};

export default Form;
