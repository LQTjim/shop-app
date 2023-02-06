import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllItemApi, initializeItem } from "../features/itemsSlice";
import { useLocation } from "react-router-dom";
import useGoTop from "./../api/useGoTop";
import ItemCard from "./ItemCard";
import PriceFilter from "./PriceFilter";
import SideFilter from "./SideFilter";
import { computeHeadingLevel } from "@testing-library/react";

function Items() {
  const location = useLocation();
  const { data, status } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [keywordData, setKeywordData] = useState([]);
  const [sideFilter, setSideFilter] = useState("");
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
  function sideFilterHandle(e) {
    setSideFilter(e.target.value);
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
  if (sideFilter) {
    content = content.filter((el) => el.category === sideFilter);
  }
  console.log(keyword, keywordData.length);
  return (
    <>
      <div className="mt-5 d-flex">
        <SideFilter onChange={sideFilterHandle} />

        <div
          className="d-flex flex-column align-items-center"
          style={{ width: "calc(100vw - 11.875rem)" }}
        >
          <div className="input-group mb-3 w-75">
            <span className="input-group-text" id="basic-addon1">
              搜尋 :
            </span>
            <input
              onChange={searchBarHandle}
              value={keyword}
              type="text"
              className="form-control"
              placeholder="搜尋商品"
            />
          </div>

          <PriceFilter onChange={filterHandle} />
          <div className="d-flex flex-column justify-content-center align-items-center">
            {status === "SUCCEEDED" ? (
              <div className="m-5">
                {content.length === 0 && keyword !== "" ? (
                  <div>搜尋不到 : {keyword}</div>
                ) : (
                  <div className="row g-1 justify-content-center p-2 border border-primary rounded-3">
                    {content.map((item) => (
                      <ItemCard key={item.id} item={item}></ItemCard>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="vh-100">
                <Spinner
                  className="position-fixed top-50 start-50"
                  animation="border"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Items;
