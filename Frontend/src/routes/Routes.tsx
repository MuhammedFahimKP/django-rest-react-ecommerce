import { Navigate, createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
// import PrivateRoute from "./PrivateRoute";
import { store } from "../store";

const user = store.getState().auth.user;

const routes = createBrowserRouter([
  {
    path: "signin/",
    element: <SignIn />,
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
