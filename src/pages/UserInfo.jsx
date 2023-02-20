import React from "react";
import { logout } from "../features/authSlice";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

function UserInfo() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function logoutHandle() {
    dispatch(logout());
  }
  return (
    <div className="text-center mt-5">
      <FaUserCircle size={50} />
      <div className="mb-4 fs-3 d-md-flex justify-content-center">
        使用者名稱 :<div> &nbsp;{user.name}</div>
      </div>
      <div className="my-4 fs-3 d-md-flex justify-content-center">
        使用者信箱 :<div>&nbsp;{user.email}</div>
      </div>
      <div className="mt-4 fs-3 d-md-flex justify-content-center">
        使用者狀態 :
        <div>&nbsp;{user.role === "admin" ? "管理員" : "一般使用者"}</div>
      </div>
      <div>
        <Button className="my-3 fs-3" onClick={logoutHandle}>
          登出
        </Button>
      </div>
    </div>
  );
}

export default UserInfo;
