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
              server side code (MongoDB express react node)
            </a>
            <div>
              <strong>
                不包含env,react打包至此,以client side rendering方式呈現
              </strong>
            </div>
          </div>
          <br />
          <div>
            <a href="https://github.com/LQTjim/shop-app">client side code</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
