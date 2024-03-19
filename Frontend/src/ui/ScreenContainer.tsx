import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ScreenContainer = ({ children }: Props) => {
  return (
    <div className="h-screen  flex justify-center items-center">{children}</div>
  );
};

export default ScreenContainer;
