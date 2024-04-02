import { useLocation, Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoutes = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  return user ? <Navigate to={location.pathname} /> : <Outlet />;
};

export default ProtectedRoutes;
