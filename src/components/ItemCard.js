import React from "react";
import { Button, Card } from "react-bootstrap";

function ItemCard({ item }) {
  return (
    // don't use 'col' here ,(flex:1 0) will break the width
    <div className="col-sm-4">
      <Card className="">
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
          <Button variant="primary">仔細看看</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ItemCard;
