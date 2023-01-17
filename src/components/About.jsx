import React from "react";
import { useLocation } from "react-router-dom";
import useGoTop from "../api/useGoTop";

function About() {
  const location = useLocation();

  useGoTop(location);
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        測試用帳號:<br></br>&#123;<br></br>
        "name": "jim12234225611",<br></br>"email": "312@gmail.com",<br></br>
        "password": "test1234",<br></br>"role": "admin"<br></br>&#125;
      </div>
    </>
  );
}

export default About;
