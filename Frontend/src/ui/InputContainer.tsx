import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const InputContainer = ({ children }: Props) => {
  return (
    <div className={"flex" + "flex-" + "col" + " mt-1 px-2   py-1   w-full"}>
      {children}
    </div>
  );
};

export default InputContainer;
