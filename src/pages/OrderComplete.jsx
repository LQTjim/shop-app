import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function OrderComplete() {
  const location = useLocation();

  return (
    <>
      {location?.state?.message !== "Order receive" ? (
        <Navigate replace />
      ) : (
        <div style={{ height: "80vh" }}>
          <div className="d-flex flex-column align-items-center justify-content-center h-75">
            <div>已完成訂單,請盡速匯款</div>
            <div>匯款金額 : {location.state.totalPrice}</div>
            <div>匯款帳號 : {location.state.account}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderComplete;
