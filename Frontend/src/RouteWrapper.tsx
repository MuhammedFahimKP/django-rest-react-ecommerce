import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
// import SessionTimeOut from "./components/SessionTimeOut";
import { Toaster } from "react-hot-toast";
const RouteWrapper = () => {
  console.log(JSON.stringify(routes.routes));

  return (
    <React.Fragment>
      <RouterProvider router={routes} />
      <Toaster />
      {/* <SessionTimeOut /> */}
    </React.Fragment>
  );
};

export default RouteWrapper;
