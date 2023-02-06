import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <>
      <div
        className="p-1 d-flex justify-content-between"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,239,0,1) 0%, rgba(230,207,25,1) 82%, rgba(255,184,0,1) 100%)",
        }}
      >
        <img
          className="ms-2"
          crossOrigin="anonymous"
          width={100}
          style={{ mixBlendMode: "darken" }}
          src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
          alt="img"
        />
        <span
          className="fs-3 d-flex align-self-center justify-content-center"
          style={{ flexGrow: 1 }}
        >
          會猶豫是因為你很想要
        </span>
        <Link
          to="/product"
          className=" d-flex align-self-center justify-content-center"
          style={{ flexGrow: 0.5, textDecoration: "none" }}
        >
          <Button className="fw-bold" variant="outline-success">
            來去購物吧!
          </Button>
        </Link>
      </div>
      <div className="w-100 d-flex justify-content-center">
        <hr style={{ width: "95%" }}></hr>
      </div>
    </>
  );
}

export default Banner;
