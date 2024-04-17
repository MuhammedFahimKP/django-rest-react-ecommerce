import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoutes = () => {
  const user = useSelector(
    (state: RootState) => state.persistedReducer.auth.user
  );

  const navigate = useNavigate();

  user && navigate(-1);

  return user ? <Navigate to={location.pathname} /> : <Outlet />;
};

export default ProtectedRoutes;
