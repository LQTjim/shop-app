import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
  function clearnCart() {
    dispatch(initializeCart());
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
          {cart.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center">
              <Link to="/product">
                <Button className="fs-4" onClick={hideOffcanvas}>
                  來去購物!gogogo!
                </Button>
              </Link>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-end">
              <div>
                總金額 :{" "}
                {Number.parseFloat(
                  cart.reduce((acc, cur) => acc + cur.quantity * cur.price, 0)
                ).toFixed(2)}
              </div>
              <div>
                <Button variant="danger" onClick={clearnCart}>
                  清空購物車
                </Button>
                <Button className="ms-1" onClick={orderHandler}>
                  送出訂單
                </Button>
              </div>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartOffcanvas;
