import { useLocation, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const PrivateRoute = () => {
  const user = useSelector((state: RootState) => state);
  return user ? <Navigate to="/" /> : <Outlet />;
};
