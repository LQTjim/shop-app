import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function SideBar(props) {
  console.log(props);
  const role = useSelector((state) => state.auth?.role);
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      className="d-lg-none sidebar-overlay sidebar-show"
      onClick={(e) => {
        e.stopPropagation();
        props.onHide();
      }}
    >
      <div
        className="bg-light custom-sidebar"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Nav.Link className="mt-2" to="/" as={NavLink}>
          React 商店
        </Nav.Link>
        <hr />
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
      </div>
    </div>
  );
}

export default SideBar;
