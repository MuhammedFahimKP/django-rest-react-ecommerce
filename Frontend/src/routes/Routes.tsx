import { lazy, type ComponentType, type LazyExoticComponent } from "react";
import { createBrowserRouter } from "react-router-dom";
import UserRoutes from "./UserRoutes.tsx";
import AdminRoutes from "./AdminRoutes.tsx";

// type LazyComponentProps<T> = T extends React.ComponentType<infer P> ? P : never;

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

const routePatterns = [...UserRoutes.routes, ...AdminRoutes.routes];

const routes = createBrowserRouter(routePatterns);

export default routes;
export const { navigate } = routes;
