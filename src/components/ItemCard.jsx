import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function ItemCard({ item }) {
  return (
    // don't use 'col' here ,(flex:1 0) will break the width
    <div className="col-sm-4">
      <Card>
        <div
          className="d-flex mt-3 mx-1"
          style={{
            height: "50vh",
          }}
        >
          <img
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
          <div>價格 : {item.price}</div>
          <Link
            to={`item/${item._id}`}
            params={`${item._id}`}
            className="btn btn-primary"
          >
            仔細看看
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ItemCard;
