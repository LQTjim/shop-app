import React from "react";

function SearchFilter(props) {
  return (
    <div className="input-group mb-3 w-50">
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
