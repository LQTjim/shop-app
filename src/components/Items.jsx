import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getAllItemApi, initializeItem } from "../features/itemsSlice";
import { useLocation } from "react-router-dom";
import useGoTop from "./../api/useGoTop";
import ItemCard from "./ItemCard";
import PriceFilter from "./PriceFilter";
import Filter from "./Filter";
import "./../styles/items.css";
import SearchFilter from "./SearchFilter";

function Items() {
  const location = useLocation();
  const { data, status } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [keywordData, setKeywordData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
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
    setCategoryFilter(e.target.value);
  }
  function filterHandle(e) {
    setPriceFilter(e.target.value);
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
  if (priceFilter === "priceDescending") {
    content.sort((a, b) => b.price - a.price);
  }
  if (priceFilter === "priceAscending") {
    content.sort((a, b) => a.price - b.price);
  }
  if (categoryFilter) {
    content = content.filter((el) => el.category === categoryFilter);
  }
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <SearchFilter onChange={searchBarHandle} keyword={keyword} />
        <Filter onChange={sideFilterHandle} />
        <PriceFilter onChange={filterHandle} />
        <div className="d-flex flex-column justify-content-center align-items-center flex-shrink-1">
          {status === "SUCCEEDED" ? (
            content.length === 0 && keyword !== "" ? (
              <div className="mt-5">搜尋不到 : {keyword}</div>
            ) : (
              <div className="mt-4 d-grid">
                {content.map((item) => (
                  <ItemCard key={item.id} item={item}></ItemCard>
                ))}
              </div>
            )
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
    </>
  );
}

export default Items;
