import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useLocation, useParams } from "react-router-dom";
import { getOneItemApi, initializeItem } from "../features/itemSlice";
import { addItemToCart } from "../features/cartSlice";
import useGoTop from "./../api/useGoTop";
import { Button, Card, Spinner } from "react-bootstrap";
import { FiDollarSign } from "react-icons/fi";
import Comment from "./Comment";

function Item() {
  const { id } = useParams();
  const location = useLocation();
  const { data, status } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useGoTop(location);

  useEffect(() => {
    dispatch(getOneItemApi(id));
    return () => {
      dispatch(initializeItem());
    };
  }, [dispatch, id]);

  function addCartHandle() {
    dispatch(addItemToCart({ itemId: data._id, price: data.price }));
  }

  return (
    <>
      {status === "SUCCEEDED" ? (
        <div className="container mt-2 p-2 border border-primary rounded">
          <Card>
            <div
              className="d-flex m-auto"
              style={{
                height: "40vh",
                width: "60vw",
              }}
            >
              <img
                crossOrigin="anonymous"
                className="mw-100 mh-100 m-auto"
                src={data.image}
                alt={data.title}
              />
            </div>
            <Card.Body>
              <Card.Title
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {data.title}
              </Card.Title>
              <Card.Text>{data.description}</Card.Text>
              <Card.Text>
                {data.price} <FiDollarSign size={15} />
              </Card.Text>
              <Card.Text>評分 : {data.rating.rate} / 5</Card.Text>

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
            </Card.Body>
          </Card>
          <Comment id={id} isLogin={isLogin} />
        </div>
      ) : status === "PENDING" || status === "IDLE" ? (
        <div className="vh-100">
          <Spinner
            className="position-fixed top-50 start-50"
            animation="border"
          />
        </div>
      ) : (
        <Navigate to="/error" replace />
      )}
    </>
  );
}

export default Item;
