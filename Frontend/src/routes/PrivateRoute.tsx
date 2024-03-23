import { ReactNode } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Props {
  children: ReactNode;
  to: string;
}

const PrivateRoute = ({ to, children }: Props) => {
  const auth = useSelector((state: RootState) => state.auth.user);

  return auth ? <Route path={to}>{children}</Route> : <Navigate to="signup/" />;
};

export default PrivateRoute;
