import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link, useLocation, useParams } from "react-router-dom";
import { getOneItemApi, initializeItem } from "../features/itemSlice";
import { addItemToCart } from "../features/cartSlice";
import useGoTop from "./../api/useGoTop";
import { Button, Spinner } from "react-bootstrap";
import { FiDollarSign } from "react-icons/fi";
import Comment from "./Comment";
import "./../styles/item.css";

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
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
          <div className="border border-dark rounded m-4 p-3 container">
            <div className="d-md-flex p-5">
              <div className="item-img-wrapper border border-dark rounded-3">
                <img
                  crossOrigin="anonymous"
                  className="item-img "
                  src={data.image}
                  alt={data.title}
                />
              </div>
              <div className="d-flex flex-column justify-content-between item-detail ms-2">
                <div
                  className="fs-3"
                  title={data.title}
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {data.title}
                </div>
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "auto",
                  }}
                >
                  {data.description}
                </div>
                <div>
                  價格 : {data.price} <FiDollarSign size={15} />
                </div>
                <div>評分 : {data.rating.rate}</div>

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
          </div>
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
