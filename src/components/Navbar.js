import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar as NavbarBs, Nav } from "react-bootstrap";
import logo from "../logo.svg";

function Navbar() {
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
        </Nav>
      </NavbarBs.Collapse>
      <Nav>
        <Nav.Link to="/login" as={NavLink} className="me-0 px-1">
          登入
        </Nav.Link>
        <Nav.Link to="/signup" as={NavLink} className="me-0 px-1">
          註冊會員
        </Nav.Link>
        <Nav.Link>icon</Nav.Link>
      </Nav>
    </NavbarBs>
  );
}
export default Navbar;
