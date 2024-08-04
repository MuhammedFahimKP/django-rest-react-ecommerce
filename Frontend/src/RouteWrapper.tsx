import React, { useContext } from "react";

import { RouterProvider } from "react-router-dom";

import routes from "./routes";

import { ToastContext } from "./context";

import { Toaster } from "react-hot-toast";

const RouteWrapper = () => {
  const toastContext = useContext(ToastContext);
  return (
    <React.Fragment>
      <RouterProvider router={routes} />

      {toastContext?.anotherToast === false && <Toaster />}
    </React.Fragment>
  );
};

export default RouteWrapper;
