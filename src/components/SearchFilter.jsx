import React from "react";
import "./../styles/searchFilter.css";

function SearchFilter(props) {
  return (
    <div className="input-group mb-3 search-filter-container">
      <span className="input-group-text" id="basic-addon1">
        搜尋 :
      </span>
      <input
        onChange={props.onChange}
        value={props.keyword}
        type="text"
        className="form-control"
        placeholder="搜尋商品"
      />
    </div>
  );
}

export default SearchFilter;
