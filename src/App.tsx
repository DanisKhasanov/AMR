import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useCurrentUser } from "./hooks/useAuth";
import { ROUTES } from "./utils/constants";
import { routingConfig } from "./config/routes";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return user?.isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.LOGIN} replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {routingConfig.public.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
        {routingConfig.protected.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
        <Route
          path={routingConfig.fallback.path}
          element={routingConfig.fallback.element}
        />
      </Routes>
    </Router>
  );
}

export default App;
