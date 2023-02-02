import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserInfo() {
  const user = useSelector((state) => state.auth);

  return (
    <div className="text-center mt-5" style={{ height: "80vh" }}>
      <div className="my-5 fs-3">使用者名稱 : {user.name}</div>
      <div className="my-5 fs-3">使用者信箱 : {user.email}</div>
      <div className="my-5 fs-3">
        使用者狀態 : {user.role === "admin" ? "管理員" : "一般使用者"}
      </div>
      <Link to="/product">
        <Button className="my-5 fs-3">來去購物!gogogo!</Button>
      </Link>
    </div>
  );
}

export default UserInfo;
