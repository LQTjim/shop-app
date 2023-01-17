import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isLogin);
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }}
      /*replace state={{ from: location }}不加的話會有兩個login的歷程記錄  */
    />
  );
}

export default ProtectedRoute;
