import React from "react";
import { useLocation } from "react-router-dom";
import useGoTop from "./../api/useGoTop";

function Admin() {
  const location = useLocation();

  useGoTop(location);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        後台
      </div>
    </>
  );
}

export default Admin;
