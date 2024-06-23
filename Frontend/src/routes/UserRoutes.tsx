import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { createBrowserRouter } from "react-router-dom";

import Suspensed from "./Suspensed.tsx";

import NotFound from "../components/NotFound";

export function lazyImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  defaultDelay: number = 2000
): LazyExoticComponent<T> {
  return lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        importFn().then(resolve);
      }, defaultDelay);
    });
  });
}

const Home = lazyImport(() => import("../pages/user/Home.tsx"));
const Shop = lazyImport(() => import("../pages/user/Shop.tsx"));
const SignUp = lazyImport(() => import("../pages/user/SignUp"));
const Socket = lazyImport(() => import("../components/Socket.tsx"));
const NewSignin = lazyImport(() => import("../components/user/NewSignin.tsx"));
const Colors = lazyImport(() => import("../components/Colors.tsx"));
const WishList = lazyImport(() => import("../pages/user/WishList.tsx"));

const SingleProduct = lazyImport(
  () => import("../pages/user/SingleProduct.tsx")
);
const ProductDetails = lazyImport(
  () => import("../pages/user/ProductDetials.tsx")
);
const ProductDetailPage = lazyImport(
  () => import("../pages/user/ProductSeePage.tsx")
);

const Checkout = lazyImport(() => import("../pages/user/Checkout.tsx"));

const routePatterns = [
  {
    path: "signin/",
    element: <NewSignin />,
  },
  {
    path: "signup/",
    element: (
      <Suspensed>
        <SignUp />
      </Suspensed>
    ),
  },
  {
    path: "/",

    element: (
      <Suspensed>
        <Home />
      </Suspensed>
    ),
  },
  {
    path: "shop/",
    element: (
      <Suspensed>
        <Shop />
      </Suspensed>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "single/:slug/",
    element: (
      <Suspensed>
        <SingleProduct />
      </Suspensed>
    ),
  },
  {
    path: "/color",
    element: (
      <Suspensed>
        <Colors />
      </Suspensed>
    ),
  },
  {
    path: "details",
    element: (
      <Suspensed>
        <ProductDetails />
      </Suspensed>
    ),
  },
  {
    path: "dt",
    element: (
      <Suspensed>
        <ProductDetailPage />
      </Suspensed>
    ),
  },
  {
    path: "checkout/",
    element: (
      <Suspensed>
        <Checkout />
      </Suspensed>
    ),
  },
  {
    path: "wishlist/",
    element: (
      <Suspensed>
        <WishList />
      </Suspensed>
    ),
  },
  {
    path: "socket/",
    element: (
      <Suspensed>
        <Socket />
      </Suspensed>
    ),
  },
];

const routes = createBrowserRouter(routePatterns);

export default routes;
