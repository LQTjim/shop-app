import React from "react";

import { useSelector } from "react-redux";
import CartOffcanvas from "./CartOffcanvas";

function ShoppingCartIcon() {
  const cartCount = useSelector((state) => state.cart).reduce((acc, curr) => {
    return acc + (curr?.quantity || 0);
  }, 0);

  return (
    <>
      <span style={{ position: "relative" }}>
        <CartOffcanvas />

        {cartCount === 0 ? null : (
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              width: "1.5rem",
              height: "1.5rem",
              color: "white",
              position: "absolute",
              top: -5,
              right: -15,
            }}
          >
            <strong>{cartCount}</strong>
          </div>
        )}
      </span>
    </>
  );
}

export default ShoppingCartIcon;
