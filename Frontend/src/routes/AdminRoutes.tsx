import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AddVaraitonPage from "../pages/admin/AddVaraitonPage";
import EditProduct from "../pages/admin/EditProduct";
import ProductViewPage from "../pages/admin/ProductViewPage";
import VariationViewPage from "../pages/admin/VariationViewPage";
import CreateProduct from "../pages/admin/CreateProduct.tsx";
import Orders from "../pages/admin/Orders.tsx";
import SingleOrderView from "../pages/admin/SingleOrderView.tsx";
import Brand from "../pages/admin/Brand.tsx";
import Color from "../pages/admin/Color.tsx";
import { NotFoundProvider } from "../context";
import Category from "../pages/admin/Category.tsx";
import Size from "../pages/admin/Size.tsx";
import User from "../pages/admin/User.tsx";

const AdminHome = lazy(() => import("../pages/admin/Home.tsx"));

const Product = lazy(() => import("../pages/admin/Product.tsx"));

const routes = createBrowserRouter([
  {
    id: "admin-home",
    path: "admin/",
    element: (
      <Suspense>
        <NotFoundProvider>
          <AdminHome />
        </NotFoundProvider>
      </Suspense>
    ),
    children: [
      {
        path: "product/",
        element: (
          <Suspense>
            <Product />
          </Suspense>
        ),
        children: [
          { path: "add/", element: <CreateProduct /> },
          {
            path: "view/:id/",
            element: <ProductViewPage />,
          },
          { path: "edit/:id", element: <EditProduct /> },

          { path: "varaition/:varid/", element: <VariationViewPage /> },

          { path: "variation/:pid/add/", element: <AddVaraitonPage /> },
        ],
      },
      {
        path: "user/",
        element: <User />,
      },
      {
        path: "orders/",
        element: <Orders />,

        children: [{ path: ":id/", element: <SingleOrderView /> }],
      },
      {
        path: "brand/",
        element: <Brand />,
      },
      {
        path: "category/",
        element: <Category />,
      },
      {
        path: "color",
        element: <Color />,
      },
      {
        path: "size",
        element: <Size />,
      },
    ],
  },
]);

console.log(routes.routes);
export default routes;
