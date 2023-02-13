import React from "react";
import { logout } from "../features/authSlice";
import { Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserInfo() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function logoutHandle() {
    dispatch(logout());
  }
  return (
    <div className="text-center mt-5" style={{ height: "80vh" }}>
      <FaUserCircle size={120} />
      <div className="mb-4 fs-3">使用者名稱 : {user.name}</div>
      <div className="my-4 fs-3">使用者信箱 : {user.email}</div>
      <div className="mt-4 fs-3">
        使用者狀態 : {user.role === "admin" ? "管理員" : "一般使用者"}
      </div>
      <Button onClick={logoutHandle} className="mx-2">
        登出
      </Button>
      <Link to="/product">
        <Button className="my-5 fs-3">來去購物!gogogo!</Button>
      </Link>
    </div>
  );
}

export default UserInfo;
