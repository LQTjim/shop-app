import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { NavLink } from "react-router-dom";
import { Navbar as NavbarBs, Nav, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../logo.svg";
import ShoppingCartIcon from "./ShoppingCartIcon";

function Navbar() {
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isLogin);
  const role = useSelector((state) => state.auth?.role);
  const name = useSelector((state) => state.auth?.name);

  function logoutHandle() {
    dispatch(logout());
  }

  return (
    <NavbarBs
      bg="dark"
      expand={"sm"}
      variant="dark"
      className="shadow px-2"
      sticky="top"
    >
      <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
      <NavbarBs.Brand to="/" as={NavLink}>
        <img src={logo} alt="logo" style={{ width: "90px", height: "90px" }} />
      </NavbarBs.Brand>

      <NavbarBs.Collapse id="basic-navbar-nav">
        <Nav className="me-0 ">
          <Nav.Link to="product" as={NavLink} className="me-0 px-1">
            商品
          </Nav.Link>
          <Nav.Link to="about" as={NavLink} className="me-0 px-1">
            關於我們
          </Nav.Link>
          <Nav.Link to="contact" as={NavLink} className="me-0 px-1">
            聯絡我們
          </Nav.Link>
          {role === "admin" ? (
            <Nav.Link to="admin" as={NavLink} className="me-0 px-1">
              後台
            </Nav.Link>
          ) : null}
        </Nav>
      </NavbarBs.Collapse>
      <Nav>
        {isAuth ? (
          <span className="d-flex align-items-center me-5">
            <Nav.Link>
              <FaUserCircle title={`嗨! , ${name}`} size={50} />
            </Nav.Link>
            <Button onClick={logoutHandle} className="mx-2">
              登出
            </Button>
            <ShoppingCartIcon />
          </span>
        ) : (
          <span className="d-flex align-items-center me-5">
            <Nav.Link to="/login" as={NavLink} className="me-0 px-1">
              登入
            </Nav.Link>
            <Nav.Link to="/signup" as={NavLink} className="me-0 px-1">
              註冊會員
            </Nav.Link>
            <Nav.Link to="/login" as={NavLink}>
              <FiShoppingCart color="gray" size={50} />
            </Nav.Link>
          </span>
        )}
      </Nav>
    </NavbarBs>
  );
}
export default Navbar;