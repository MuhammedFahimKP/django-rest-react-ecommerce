import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import SignUp from "../pages/user/SignUp";

import NewSignin from "../components/user/NewSignin";
import Home from "../pages/user/Home";
import Shop from "../pages/user/Shop";

import Colors from "../components/Colors.tsx";

import AddProduct from "../pages/admin/AddProduct";
import AddVaraitonPage from "../pages/admin/AddVaraitonPage";
import EditProduct from "../pages/admin/EditProduct";
import ProductViewPage from "../pages/admin/ProductViewPage";
import VariationViewPage from "../pages/admin/VariationViewPage";
import NotFound from "../components/NotFound";
import SingleProduct from "../pages/user/SingleProduct.tsx";
import ProductDetails from "../pages/user/ProductDetials.tsx";

const AdminHome = lazy(() => import("../pages/admin/Home.tsx"));

const Product = lazy(() => import("../pages/admin/Product.tsx"));

const ProductDetailPage = lazy(
  () => import("../pages/user/ProductSeePage.tsx")
);

const Checkout = lazy(() => import("../pages/user/Checkout.tsx"));

const routes = createBrowserRouter([
  {
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
  {
    path: "signin/",
    element: <NewSignin />,
  },
  {
    path: "signup/",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "shop/",
    element: <Shop />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "single/:slug/",
    element: <SingleProduct />,
  },
  {
    path: "/color",
    element: <Colors />,
  },
  {
    path: "details",
    element: <ProductDetails />,
  },
  {
    path: "dt",
    element: (
      <Suspense>
        <ProductDetailPage />
      </Suspense>
    ),
  },
  {
    path: "checkout/",
    element: (
      <Suspense>
        <Checkout />
      </Suspense>
    ),
  },
]);

export default routes;
export const { navigate } = routes;
