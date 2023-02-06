import React from "react";
import { useLocation } from "react-router-dom";
import useGoTop from "../api/useGoTop";

function Contact() {
  const location = useLocation();

  useGoTop(location);

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <div>
          <div>
            <a href="https://github.com/LQTjim/server-for-shop-app">
              server side code (MongoDB+express+react+node)
            </a>
            <div>
              <strong className="fs-5">不包含env!!!</strong>react打包至node
              server,以client side rendering方式部署在render.com
            </div>
            <div>數據皆存在MongoDB Atlas裡</div>
          </div>
          <br />
          <div>
            <a href="https://github.com/LQTjim/shop-app">client side code</a>
          </div>
          <span>
            code下方的README.md review有附加
            <strong className="fs-5">懶人包</strong>
            喔!
          </span>
        </div>
      </div>
    </>
  );
}

export default Contact;
