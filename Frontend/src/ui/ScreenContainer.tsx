import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ScreenContainer = ({ children }: Props) => {
  return <div className="h-screen  flex flex-col p-0 m-0 ">{children}</div>;
};

export default ScreenContainer;
