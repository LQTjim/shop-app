import React from "react";
import { BiCommentError } from "react-icons/bi";

function ErrorPage() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
        <BiCommentError size={30} className="me-2" />
        好像出了什麼錯 ?
      </div>
    </>
  );
}

export default ErrorPage;
