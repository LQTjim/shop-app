import React from "react";
import useGoTop from "../api/useGoTop";
import { Outlet, useLocation } from "react-router-dom";
function Home() {
  const location = useLocation();
  useGoTop(location);

  return <Outlet />;
}

export default Home;
