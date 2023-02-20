import React from "react";
import { Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../features/authSlice";

function SideBar(props) {
  const role = useSelector((state) => state.auth?.role);
  const isAuth = useSelector((state) => state.auth.isLogin);

  const dispatch = useDispatch();

  function logoutHandle() {
    dispatch(logout());
  }
  return (
    <div
      className={`d-lg-none sidebar-overlay ${
        props.sideBarShow ? "sidebar-show" : null
      }`}
      onClick={(e) => {
        e.stopPropagation();
        props.onHide();
      }}
    >
      <div
        className="bg-light custom-sidebar position-relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Nav.Link className="mt-2" to="/" as={NavLink}>
          React 商店
        </Nav.Link>
        <hr />
        <Nav.Link className="text-end" to="product" as={NavLink}>
          商品
        </Nav.Link>
        <Nav.Link className="text-end" to="about" as={NavLink}>
          關於我們
        </Nav.Link>
        <Nav.Link className="text-end" to="contact" as={NavLink}>
          聯絡我們
        </Nav.Link>
        {role === "admin" ? (
          <Nav.Link className="text-end" to="admin" as={NavLink}>
            後台
          </Nav.Link>
        ) : null}
        {isAuth ? (
          <>
            <div className="mt-auto position-fixed bottom-0">
              <Button className="my-3 fs-5" onClick={logoutHandle}>
                登出
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default SideBar;
