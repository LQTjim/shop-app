import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllItemApi, initializeItem } from "../features/itemsSlice";
import { useLocation } from "react-router-dom";
import useGoTop from "./../api/useGoTop";
import ItemCard from "./ItemCard";

function Items() {
  const location = useLocation();
  const { data, status } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [keywordData, setKeywordData] = useState([]);
  const [filter, setFilter] = useState("");
  useGoTop(location);
  useEffect(() => {
    dispatch(getAllItemApi());
    return () => {
      dispatch(initializeItem());
    };
  }, [dispatch]);

  useEffect(() => {
    if (keyword === "") {
      setKeywordData(data);
    }
    let timer = setTimeout(() => {
      setKeywordData(() => {
        return data.filter((el) => el.title.includes(keyword) || "");
      });
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [keyword, data]);

  function searchBarHandle(e) {
    const trim = e.target.value.trim("");
    setKeyword(trim);
  }
  function filterHandle(e) {
    setFilter(e.target.value);
  }
  /* 這樣寫會錯(最原始的版本)
  let content = keywordData;
  if (filter === "priceDescending") {
    content.sort((a, b) => b.price - a.price);
  }
  if (filter === "priceAscending") {
    content.sort((a, b) => a.price - b.price);
  } 
會產生錯誤:Cannot assign to read only property '0' of object '[object Array]'
錯誤產生原因不明,content log出來是原本的資料(和從redux拉進來的資料一樣)
故當錯誤產生直接把content當空陣列 
這樣寫ok
let content = keywordData;
  if (filter === "priceDescending") {
    try{content.sort((a, b) => b.price - a.price);}
    catch(e){content=[]}
  }
  if (filter === "priceAscending") {
    try{content.sort((a, b) => a.price - b.price);}
    catch(e){content=[]}
  } 
*/
  //最後版本
  let content = [...keywordData];
  if (filter === "priceDescending") {
    content.sort((a, b) => b.price - a.price);
  }
  if (filter === "priceAscending") {
    content.sort((a, b) => a.price - b.price);
  }

  return (
    <>
      <div className="mt-5 w-100 d-flex justify-content-center">
        <div className="input-group mb-3 w-75">
          <span className="input-group-text" id="basic-addon1">
            搜尋 :{" "}
          </span>
          <input
            onChange={searchBarHandle}
            value={keyword}
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="d-flex justify-content-around" onChange={filterHandle}>
        <div className="form-check">
          <input
            value="priceDescending"
            className="form-check-input"
            type="radio"
            name="filter"
            id="filterPriceDescending"
          />
          <label className="form-check-label" htmlFor="filterPriceDescending">
            價格:高到低
          </label>
        </div>
        <div className="form-check">
          <input
            value="priceAscending"
            className="form-check-input"
            type="radio"
            name="filter"
            id="filterPriceAscending"
          />
          <label className="form-check-label" htmlFor="filterPriceAscending">
            價格:低到高
          </label>
        </div>
      </div>
      {status === "SUCCEEDED" ? (
        <div className="m-5">
          <div className="row g-1 justify-content-center p-2 border border-primary">
            {keywordData.length === 0 && keyword !== "" ? (
              <div>搜尋不到 : {keyword}</div>
            ) : (
              content.map((item) => (
                <ItemCard key={item.id} item={item}></ItemCard>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="vh-100">
          <Spinner
            className="position-fixed top-50 start-50"
            animation="border"
          />
        </div>
      )}
    </>
  );
}

export default Items;
