import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store, persistor } from "./store";
import routes from "./routes/index";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={false}>
        <GoogleOAuthProvider clientId="296061655793-btom7bmad6ugdt93200u7j3uk22ijevl.apps.googleusercontent.com">
          <RouterProvider router={routes} />
          <Toaster />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}
