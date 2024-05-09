import { createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/user/SignUp";
import AdminHome from "../pages/admin/Home";
import NewSignin from "../components/user/NewSignin";
import Home from "../pages/user/Home";
import Product from "../pages/admin/Product";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import ProductViewPage from "../pages/admin/ProductViewPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AdminHome />,
    children: [
      {
        path: "product/",
        element: <Product />,
        children: [
          { path: "add/", element: <AddProduct /> },
          { path: "view/:id", element: <ProductViewPage /> },
          { path: "edit/:id", element: <EditProduct /> },
        ],
      },
    ],
  },
  {
    path: "signin/",
    element: <NewSignin />,
  },
  {
    path: "signup/",
    element: <SignUp />,
  },
  {
    path: "user/",
    element: <Home />,
  },
]);

export default routes;
export const { navigate } = routes;
