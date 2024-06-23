import { Suspense, type ReactNode } from "react";
import Loader from "../components/Loader";

interface Props {
  children: ReactNode;
}

const Suspensed = ({ children }: Props) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default Suspensed;
