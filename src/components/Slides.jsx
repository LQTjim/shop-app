import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Carousel, Spinner } from "react-bootstrap";
import Banner from "./Banner";

function Slides() {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    fetch("/api/item/random-three")
      .then((r) => {
        return r.json();
      })
      .then((d) => {
        setItems(d.data);
        setLoaded(true);
      });
  }, []);

  return (
    <>
      <Banner />
      {/* {isLoaded ? (
        <div
          className="mx-auto my-4"
          style={{ minWidth: "60vw", minHeight: "70vh" }}
        >
          <Carousel variant="dark">
            {items.map((item) => {
              return (
                <Carousel.Item interval={1000} key={item._id}>
                  <Link
                    className="text-decoration-none"
                    to={`product/item/${item._id}`}
                    state={{ from: location }}
                  >
                    <div
                      className="mx-auto"
                      style={{ width: "500px", height: "500px" }}
                    >
                      <img
                        crossOrigin="anonymous"
                        className="d-block mw-100 mh-100 mx-auto"
                        src={item.image}
                        alt={item.title}
                      />
                    </div>
                  </Link>
                  <span
                    className="d-flex justify-content-center p-5"
                    alt={item.title}
                  >
                    {item.title}
                  </span>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="vh-100">
          <Spinner
            className="position-fixed top-50 start-50"
            animation="border"
          />
        </div>
      )} */}
    </>
  );
}

export default Slides;
