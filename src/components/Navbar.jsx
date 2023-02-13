import React, { useState } from "react";
import { useSelector } from "react-redux";

import { NavLink } from "react-router-dom";
import { Navbar as NavbarBs, Nav, Container } from "react-bootstrap";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import logo from "../logo.svg";
import ShoppingCartIcon from "./ShoppingCartIcon";
import SideBar from "./SideBar";

function Navbar() {
  const isAuth = useSelector((state) => state.auth.isLogin);
  const role = useSelector((state) => state.auth?.role);
  const name = useSelector((state) => state.auth?.name);
  const [sideBarShow, setSideBarShow] = useState(false);

  /*  return (
    <NavbarBs
      bg="dark"
      expand={"lg"}
      variant="dark"
      className="shadow px-2"
      sticky="top"
    >
      <Container fluid>
        <NavbarBs.Toggle aria-controls="basic-navbar-nav" />
        <NavbarBs.Brand to="/" as={NavLink}>
          <img src={logo} alt="" style={{ width: "50px", height: "50px" }} />
        </NavbarBs.Brand>
        <NavbarBs.Brand className="d-lg-block d-none" to="/" as={NavLink}>
          React商店
        </NavbarBs.Brand>

        <NavbarBs.Collapse id="basic-navbar-nav" className="align-self-start">
          <Nav className="me-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link to="product" as={NavLink} className="me-0 px-1 fs-4">
              商品
            </Nav.Link>
            <Nav.Link to="about" as={NavLink} className="me-0 px-1  fs-4">
              關於我們
            </Nav.Link>
            <Nav.Link to="contact" as={NavLink} className="me-0 px-1  fs-4">
              聯絡我們
            </Nav.Link>
            {role === "admin" ? (
              <Nav.Link to="admin" as={NavLink} className="me-0 px-1  fs-4">
                後台
              </Nav.Link>
            ) : null}
          </Nav>
        </NavbarBs.Collapse>
        <Nav aria-controls="basic-navbar-nav" className="custom">
          {isAuth ? (
            <span className="d-flex align-items-center me-2">
              <Nav.Link to="/user-info" as={NavLink}>
                <FaUserCircle title={`嗨! , ${name}`} size={45} />
              </Nav.Link>
              <ShoppingCartIcon />
            </span>
          ) : (
            <span className="d-flex align-items-center me-2 fs-5">
              <Nav.Link to="/login" as={NavLink} className="me-0 px-2">
                登入
              </Nav.Link>
              <div className="text-light">|</div>
              <Nav.Link to="/signup" as={NavLink} className="me-0 px-2">
                註冊
              </Nav.Link>
              <Nav.Link to="/login" as={NavLink}>
                <FiShoppingCart color="gray" size={40} />
              </Nav.Link>
            </span>
          )}
        </Nav>
      </Container>
    </NavbarBs>
  ); */
  return (
    <NavbarBs
      bg="dark"
      expand={"lg"}
      variant="dark"
      className="shadow px-2 position-relative"
      sticky="top"
    >
      <Container fluid>
        <FaBars
          className="d-lg-none"
          color="gray"
          size={40}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSideBarShow((prev) => !prev);
          }}
        />

        <SideBar
          sideBarShow={sideBarShow}
          onHide={() => {
            setSideBarShow(false);
          }}
        />

        <NavbarBs.Brand className="d-flex" to="/" as={NavLink}>
          <img src={logo} alt="" style={{ width: "50px", height: "50px" }} />
          <div className="d-lg-block d-none my-auto">React商店</div>
        </NavbarBs.Brand>

        <Nav className="d-none d-lg-flex">
          <Nav.Link to="product" as={NavLink}>
            商品
          </Nav.Link>
          <Nav.Link to="about" as={NavLink}>
            關於我們
          </Nav.Link>
          <Nav.Link to="contact" as={NavLink}>
            聯絡我們
          </Nav.Link>
          {role === "admin" ? (
            <Nav.Link to="admin" as={NavLink}>
              後台
            </Nav.Link>
          ) : null}
        </Nav>

        <Nav>
          {isAuth ? (
            <span className="d-flex align-items-center">
              <Nav.Link to="/user-info" as={NavLink}>
                <FaUserCircle title={`嗨! , ${name}`} size={30} />
              </Nav.Link>
              <ShoppingCartIcon />
            </span>
          ) : (
            <span className="d-flex align-items-center ">
              <Nav.Link to="/login" as={NavLink} className="">
                登入
              </Nav.Link>
              <div className="text-light">|</div>
              <Nav.Link to="/signup" as={NavLink} className="">
                註冊
              </Nav.Link>
              <Nav.Link to="/login" as={NavLink}>
                <FiShoppingCart color="gray" size={30} />
              </Nav.Link>
            </span>
          )}
        </Nav>
      </Container>
    </NavbarBs>
  );
}
export default Navbar;
