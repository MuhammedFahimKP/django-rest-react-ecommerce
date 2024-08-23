import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  customClass?: string;
}

const ScreenContainer = ({ children, customClass = "" }: Props) => {
  return (
    <div className={"min-h-screen  flex flex-col p-0 m-0   " + customClass}>
      {children}
    </div>
  );
};

export default ScreenContainer;
