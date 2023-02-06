import React from "react";

function PriceFilter(props) {
  return (
    <div
      className="w-75 mt-3 d-flex fs-4 justify-content-around"
      onChange={props.onChange}
    >
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
  );
}

export default PriceFilter;
