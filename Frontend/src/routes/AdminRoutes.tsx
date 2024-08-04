import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AddVaraitonPage from "../pages/admin/AddVaraitonPage";
import EditProduct from "../pages/admin/EditProduct";
import ProductViewPage from "../pages/admin/ProductViewPage";
import VariationViewPage from "../pages/admin/VariationViewPage";
import CreateProduct from "../pages/admin/CreateProduct.tsx";
import Orders from "../pages/admin/Orders.tsx";
import SingleOrderView from "../pages/admin/SingleOrderView.tsx";

import { NotFoundProvider } from "../context";

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
        path: "orders/",
        element: <Orders />,

        children: [{ path: ":id/", element: <SingleOrderView /> }],
      },
    ],
  },
]);

console.log(routes.routes);
export default routes;
