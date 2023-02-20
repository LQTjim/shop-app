import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithJWTApi } from "./features/authSlice";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import ProtectRoute from "./pages/ProtectRoute";
import Admin from "./components/Admin";
import NotLoginRoute from "./pages/NotLoginRoute";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/Home";
import Slides from "./components/Slides";
import Products from "./pages/Products";
import Items from "./components/Items";
import Item from "./components/Item";
import About from "./components/About";
import Contact from "./pages/Contact";
import UserInfo from "./pages/UserInfo";
import ErrorPage from "./pages/ErrorPage";
import OrderComplete from "./pages/OrderComplete";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";
import "./App.css";
import Footer from "./components/Footer";

//TODO 登入完成
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("jwt")) {
      dispatch(loginWithJWTApi());
    }
  }, [dispatch]);

  return (
    <>
      <div className="d-flex flex-column vh-100">
        <Navbar />
        <hr className="align-self-center" style={{ width: "95%" }} />
        <Routes>
          {/* protected routes */}
          <Route element={<ProtectRoute />}>
            <Route path="admin" element={<Admin />} />
            <Route path="user-info" element={<UserInfo />} />
          </Route>
          {/* 已登入狀態下,這個route會自動導回path:"/"或前一個使用的歷程 */}
          <Route element={<NotLoginRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          {/* public routes*/}
          <Route path="/" element={<Home />}>
            <Route index element={<Slides />} />
          </Route>
          <Route path="product" element={<Products />}>
            <Route index element={<Items />} />
            <Route path="item/:id" element={<Item />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="order-complete" element={<OrderComplete />} />
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
