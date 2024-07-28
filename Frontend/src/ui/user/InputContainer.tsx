import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const InputContainer = ({ children }: Props) => {
  return (
    <div className={"flex" + " mt-1 px-2   py-1   w-full gap-2"}>
      {children}
    </div>
  );
};

export default InputContainer;
