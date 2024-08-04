import { Provider } from "react-redux";
import RouteWrapper from "./RouteWrapper";
import { store, persistor } from "./store";

import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ToastContextProvider } from "./context";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={false}>
        <GoogleOAuthProvider clientId="296061655793-btom7bmad6ugdt93200u7j3uk22ijevl.apps.googleusercontent.com">
          <ToastContextProvider>
            <RouteWrapper />
          </ToastContextProvider>
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  );
}
