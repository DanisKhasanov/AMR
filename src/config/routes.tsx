import { Navigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import type { RoutingConfig } from "../types";
import AuthPage from "../components/page/AuthPage";
import TwoFactorAuthPage from "../components/page/TwoFactorAuthPage";
import Dashboard from "../components/page/Dashboard";

export const routingConfig: RoutingConfig = {
  public: [
    {
      path: "/",
      element: <Navigate to={ROUTES.LOGIN} replace />,
    },
    {
      path: ROUTES.LOGIN,
      element: <AuthPage />,
    },
    {
      path: ROUTES.TWO_FACTOR,
      element: <TwoFactorAuthPage />,
    },
  ],
  protected: [
    {
      path: ROUTES.DASHBOARD,
      element: <Dashboard />,
    },
  ],
  fallback: {
    path: "*",
    element: <Navigate to={ROUTES.LOGIN} replace />,
  },
};
