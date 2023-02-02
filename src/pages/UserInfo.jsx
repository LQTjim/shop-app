import React from "react";
import { useSelector } from "react-redux";

function UserInfo() {
  const user = useSelector((state) => state.auth);
  console.log(user);
  return <div>UserInfo</div>;
}

export default UserInfo;
