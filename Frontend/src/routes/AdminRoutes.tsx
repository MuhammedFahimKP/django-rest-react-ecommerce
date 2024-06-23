import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AddProduct from "../pages/admin/AddProduct";
import AddVaraitonPage from "../pages/admin/AddVaraitonPage";
import EditProduct from "../pages/admin/EditProduct";
import ProductViewPage from "../pages/admin/ProductViewPage";
import VariationViewPage from "../pages/admin/VariationViewPage";

const AdminHome = lazy(() => import("../pages/admin/Home.tsx"));

const Product = lazy(() => import("../pages/admin/Product.tsx"));

const routes = createBrowserRouter([
  {
    id: "admin-home",
    path: "admin/",
    element: (
      <Suspense>
        <AdminHome />
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
          { path: "add/", element: <AddProduct /> },
          {
            path: "view/:id/",
            element: <ProductViewPage />,
          },
          { path: "edit/:id", element: <EditProduct /> },

          { path: "varaition/:varid/", element: <VariationViewPage /> },

          { path: "variation/:pid/add/", element: <AddVaraitonPage /> },
        ],
      },
    ],
  },
]);

console.log(routes.routes);
export default routes;
