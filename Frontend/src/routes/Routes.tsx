import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
// import PrivateRoute from "./PrivateRoute";
const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <ProtectedRoutes />,
    children: [{ path: "signin", element: <SignIn /> }],
  },
  {
    path: "signup/",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default routes;
export const { navigate } = routes;
