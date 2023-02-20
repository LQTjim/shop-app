import React from "react";
import { useLocation } from "react-router-dom";
import useGoTop from "../api/useGoTop";

function About() {
  const location = useLocation();

  useGoTop(location);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center h-100">
        測試用一般帳號:<br></br>&#123;<br></br>
        "name": "testuser123",<br></br>"email": "testuser123@gmail.com",
        <br></br>
        "password": "test1234",<br></br>"role": "user"<br></br>&#125;
        測試用admin帳號:<br></br>&#123;<br></br>
        "name": "jim12234225611",<br></br>"email": "312@gmail.com",<br></br>
        "password": "test1234",<br></br>"role": "admin"<br></br>&#125;
      </div>
    </>
  );
}

export default About;
