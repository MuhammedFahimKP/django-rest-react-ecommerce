import { ReactNode } from "react";

interface Props {
  alert: boolean;
  children: ReactNode;
}

const toster = ({ alert, children }: Props) => {
  if (alert === false) return;
  return children;
};

export default toster;
