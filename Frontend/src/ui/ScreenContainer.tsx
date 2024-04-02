import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ScreenContainer = ({ children }: Props) => {
  return <div className="h-screen  flex flex-col ">{children}</div>;
};

export default ScreenContainer;
