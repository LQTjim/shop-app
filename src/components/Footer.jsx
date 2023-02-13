import React from "react";

function Footer() {
  return (
    <>
      <hr className="align-self-center" style={{ width: "95%" }} />
      <div
        className="w-100 mt-auto p-2 bg-dark text-white text-end d-flex justify-content-end align-items-end"
        style={{ height: "4rem" }}
      >
        <span className="">React Copyright © 2023 Meta Platforms, Inc.</span>
      </div>
    </>
  );
}

export default Footer;
