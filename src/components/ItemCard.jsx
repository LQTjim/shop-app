import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/cartSlice";
import { Button, Card } from "react-bootstrap";
function ItemCard({ item }) {
  const dispatch = useDispatch();
  function addCartHandle() {
    dispatch(addItemToCart({ itemId: item._id, price: item.price }));
  }
  return (
    <div className="col-lg-4 col-md-12">
      <Card>
        <div
          className="d-flex mt-3 mx-1"
          style={{
            height: "50vh",
          }}
        >
          <img
            crossOrigin="anonymous"
            className="mw-100 mh-100 m-auto"
            src={item.image}
            alt={item.title}
          />
        </div>

        <Card.Body>
          <Card.Title
            className="overflow-hidden"
            style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
            title={item.title}
          >
            {item.title}
          </Card.Title>
          <div className="mb-1">價格 : {item.price}</div>
          <div className="d-flex justify-content-between">
            <Link
              to={`item/${item._id}`}
              params={`${item._id}`}
              className="btn btn-primary"
            >
              仔細看看
            </Link>
            <Button onClick={addCartHandle}>加入購物車</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ItemCard;
