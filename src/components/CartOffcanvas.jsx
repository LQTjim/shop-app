import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initializeCart, submitCartApi } from "../features/cartSlice";
import CartItem from "./CartItem";

function CartOffcanvas() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  function showOffcanvas() {
    setIsShow(true);
  }
  function hideOffcanvas() {
    setIsShow(false);
  }

  async function orderHandler() {
    const result = await dispatch(submitCartApi());
    if (result.payload.message === "Order receive") {
      navigate("/order-complete", {
        replace: true,
        state: { ...result.payload },
      });
      hideOffcanvas();
      dispatch(initializeCart());
    } else {
      navigate("/error", {
        replace: true,
      });
      hideOffcanvas();
      dispatch(initializeCart());
    }
  }
  return (
    <>
      <FiShoppingCart
        style={{ cursor: "pointer" }}
        onClick={showOffcanvas}
        color="gray"
        size={50}
      />
      <Offcanvas show={isShow} onHide={hideOffcanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <FiShoppingCart size={50} />
            <span className="ms-2">購物車</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.map((el) => {
            return <CartItem key={el.itemId} {...el} />;
          })}
        </Offcanvas.Body>
        <Offcanvas.Body>
          {cart.length === 0 ? null : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                總金額 :{" "}
                {Number.parseFloat(
                  cart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
                ).toFixed(2)}
              </div>
              <Button onClick={orderHandler}>送出訂單</Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartOffcanvas;
