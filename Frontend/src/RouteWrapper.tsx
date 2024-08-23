import React, { useContext } from "react";

import { RouterProvider } from "react-router-dom";

import routes from "./routes";

import { DataAddedContexProvider } from "./context";

import { ToastContext } from "./context";

import { Toaster } from "react-hot-toast";

const RouteWrapper = () => {
  const toastContext = useContext(ToastContext);
  return (
    <React.Fragment>
      <DataAddedContexProvider>
        <RouterProvider router={routes} />
        {toastContext?.anotherToast === false && <Toaster />}
      </DataAddedContexProvider>
    </React.Fragment>
  );
};

export default RouteWrapper;
