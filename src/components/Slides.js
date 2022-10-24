import React, { useState, useEffect } from "react";
import { Carousel, Spinner } from "react-bootstrap";

function Slides() {
  const [items, setItems] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
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
      {isLoaded ? (
        <div className="mx-auto my-4" style={{ width: "60vw" }}>
          <Carousel fade variant="dark">
            {items.map((item) => {
              return (
                <Carousel.Item interval={1000}>
                  <div
                    className="d-flex"
                    style={{ width: "60vw", aspectRatio: "16/9" }}
                  >
                    <img
                      className="mh-100 mw-100 d-blcok m-auto"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>

                  <Carousel.Caption>
                    <h3
                      className="text-dark"
                      style={{ background: "rgb(0, 255, 255 ,0.5)" }}
                    >
                      點我看看
                    </h3>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <Spinner animation="border" />
      )}
      {/* <Carousel>
        <Carousel.Item interval={1000}>
          {isLoaded ? (
            <div className="d-flex w-100">
              <img
                className="mh-100 mw-100 d-blcok m-auto"
                src={items[0].image}
                alt={items[0].title}
              />
            </div>
          ) : (
            <img
              className="d-block mw-100 mh-100 m-auto"
              src="https://images.unsplash.com/photo-1657053076996-15fc97b963ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
              alt="First slide"
            />
          )}
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block mw-100 mh-100 m-auto"
            src="https://images.unsplash.com/photo-1657037029340-bbb5e92c8d1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block mw-100 mh-100 m-auto"
            src="https://images.unsplash.com/photo-1657037031161-d126c02cce8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
    </>
  );
}

export default Slides;
