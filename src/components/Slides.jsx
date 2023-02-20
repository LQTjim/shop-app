import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsChevronCompactLeft,
  BsChevronCompactRight,
  BsDot,
} from "react-icons/bs";
import { Carousel, Spinner } from "react-bootstrap";
import Banner from "./Banner";
import "./../styles/slides.css";
import ErrorPage from "../pages/ErrorPage";

function Slides() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("IDLE");
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    fetch("/api/item/random-three")
      .then((r) => {
        setStatus("PENDING");
        return r.json();
      })
      .then((d) => {
        setItems(d.data);
        setStatus("SUCCESS");
      })
      .catch((e) => {});
  }, []);
  //輪播,當hover暫停輪播
  useEffect(() => {
    if (isHover) {
      return;
    }
    if (status === "SUCCESS") {
      const timeId = setTimeout(() => {
        nextSlide();
      }, 1000);
      return () => {
        clearTimeout(timeId);
      };
    }
  });
  function prevSlide() {
    const isfirstIndex = currentIndex === 0;
    setCurrentIndex(isfirstIndex ? items.length - 1 : currentIndex - 1);
  }
  function nextSlide() {
    const islastIndex = currentIndex === items.length - 1;
    setCurrentIndex(islastIndex ? 0 : currentIndex + 1);
  }
  return (
    <>
      <Banner />
      {status === "SUCCESS" ? (
        <div className="d-flex justify-content-center">
          <div
            className="position-relative slide-conatainer p-2"
            onMouseEnter={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
          >
            <Link
              className="text-decoration-none"
              to={`/product/item/${items[currentIndex]?._id}`}
              state={{ from: location }}
            >
              <div className="slide-img-wrapper">
                <img
                  className="slide-img rounded "
                  src={`${items[currentIndex]?.image}`}
                  alt={`${items[currentIndex]?.title}`}
                />
              </div>
            </Link>
            <BsChevronCompactLeft
              className="position-absolute left-icon"
              onClick={prevSlide}
              size={40}
            />
            <BsChevronCompactRight
              className="position-absolute right-icon"
              onClick={nextSlide}
              size={40}
            />
            <div className="slide-dot-group d-flex justify-content-center">
              {items.map((item, index) => (
                <BsDot
                  key={index}
                  className={`slide-dot ${
                    currentIndex === index ? "slide-dot-select" : null
                  }`}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  size={30}
                />
              ))}
            </div>
          </div>
        </div>
      ) : status === "FAILED" ? (
        <ErrorPage />
      ) : (
        <Spinner
          className="position-fixed top-50 start-50"
          animation="border"
        />
      )}
    </>
  );
}

export default Slides;
