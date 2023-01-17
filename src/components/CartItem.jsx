import React, { useState } from "react";
import useCartItem from "../api/useCartItem";
import { Stack } from "react-bootstrap";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { decreaseItem, increaseItem } from "../features/cartSlice";

function CartItem({ itemId, quantity }) {
  const dispatch = useDispatch();

  const [item, setItem] = useState({});

  useCartItem(itemId, setItem);

  function increaseHandle() {
    dispatch(increaseItem(itemId));
  }
  function decreaseHandle() {
    dispatch(decreaseItem(itemId));
  }
  return (
    <Stack
      direction="horizontal"
      className="w-100 border-bottom mt-1 p-2 gap-3"
    >
      <Link to={`/product/item/${itemId}`}>
        <div
          className="d-flex justify-content-center
          "
          style={{ width: "125px", height: "75px" }}
        >
          <img
            className="mw-100 mh-100"
            alt={item.title}
            src={item.image}
            title={item.title}
          />
        </div>
      </Link>
      <div style={{ width: "125px" }}>
        <div>數量 : {quantity}</div>
        <div>價格 : {item.price}</div>
      </div>
      <div className="ms-2">
        <button
          className="d-block"
          style={{ border: "none" }}
          onClick={increaseHandle}
        >
          <AiOutlineArrowUp size={15} />
        </button>
        <button
          className="d-block mt-1"
          style={{ border: "none" }}
          onClick={decreaseHandle}
        >
          <AiOutlineArrowDown size={15} />
        </button>
      </div>
    </Stack>
  );
}

export default CartItem;
