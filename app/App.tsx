import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { store } from "./store";
import RouteList from "./router";
import "./global.css";
import { checkAuth, checkMobile } from "./utils/auth";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = checkAuth();
  const location = useLocation();
  const isMobile = checkMobile();

  if (location.pathname !== RouteList.MOBILE.path && isMobile) {
    return (
      <Navigate to={RouteList.MOBILE.path} state={{ from: location }} replace />
    );
  }

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate to={RouteList.LOGIN.path} state={{ from: location }} replace />
    );
  }

  return children;
};

const App = () => {
  const totalRoutes = Object.entries(RouteList);

  const RoutesMemo = totalRoutes.map(([routeName, routeConfig]) => {
    const routerElement = routeConfig.auth ? (
      <RequireAuth>{routeConfig.element}</RequireAuth>
    ) : (
      routeConfig.element
    );
    return (
      <Route
        key={routeName}
        path={routeConfig.path}
        index={routeConfig.index}
        element={routerElement}
      />
    );
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>{RoutesMemo}</Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
