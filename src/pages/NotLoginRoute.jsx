import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

function NotLoginRoute() {
  const location = useLocation();
  /* 
  用來置換登入後的歷史紀錄(排除掉"/login") 
  當從,沒傳遞state的link過來這個route登入後一律導向"/".
  從有傳遞state的link到這個route登入後 自動navigate到前一個瀏覽歷史 並置換掉"/login"
  */
  const from = location.state?.from?.pathname
    ? `${location.state.from.pathname}`
    : "/";
  const isAuth = useSelector((state) => state.auth.isLogin);

  return !isAuth ? <Outlet /> : <Navigate to={from} replace />;
}

export default NotLoginRoute;
