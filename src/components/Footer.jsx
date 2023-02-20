import React from "react";

function Footer() {
  return (
    <>
      <hr className="align-self-center mt-auto" style={{ width: "95%" }} />
      <div
        className="w-100 p-2 bg-dark text-white text-end d-flex justify-content-end align-items-end"
        style={{ height: "4rem" }}
      >
        <div className="d-sm-flex d-block">
          React Copyright © 2023 <div>Meta Platforms, Inc.</div>
        </div>
      </div>
    </>
  );
}

export default Footer;
