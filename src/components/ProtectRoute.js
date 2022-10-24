import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
