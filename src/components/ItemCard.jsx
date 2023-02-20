import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../features/cartSlice";
import { Button } from "react-bootstrap";
import "./../styles/itemCard.css";
function ItemCard({ item }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const location = useLocation();

  function addCartHandle() {
    dispatch(addItemToCart({ itemId: item._id, price: item.price }));
  }
  return (
    <div className="border rounded p-2 item-card-container">
      <Link to={`item/${item._id}`} params={`${item._id}`}>
        <div className="rounded item-card-img-wrapper">
          <img
            crossOrigin="anonymous"
            className="item-card-img"
            src={item.image}
            alt={item.title}
          />
        </div>
      </Link>

      <div className="overflow-hidden fs-5 item-card-title" title={item.title}>
        {item.title}
      </div>
      <div className="mb-1">價格 : {item.price}</div>
      <div className="mb-1">評分 : {item.rating.rate}</div>
      <div className="d-flex justify-content-between">
        {isLogin ? (
          <Button onClick={addCartHandle}>加入購物車</Button>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary"
            state={{ from: location }}
          >
            加入購物車
          </Link>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
