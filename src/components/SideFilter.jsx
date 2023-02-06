import React from "react";
import { FaFilter } from "react-icons/fa";

function SideFilter(props) {
  return (
    <div className="fs-3 ms-5" style={{ flex: "0 0 11rem" }}>
      <div className="ms-3 my-5 fs-2">
        <FaFilter size={20} /> {"  "}商品分類
      </div>
      <div className="ms-2" onChange={props.onChange}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sideFilter"
            value="男士服裝"
            id="男士服裝"
          />
          <label className="form-check-label" htmlFor="男士服裝">
            男士服裝
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sideFilter"
            value="女士服裝"
            id="女士服裝"
          />
          <label className="form-check-label" htmlFor="女士服裝">
            女士服裝
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sideFilter"
            value="珠寶首飾"
            id="珠寶首飾"
          />
          <label className="form-check-label" htmlFor="珠寶首飾">
            珠寶首飾
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sideFilter"
            value="電器用品"
            id="電器用品"
          />
          <label className="form-check-label" htmlFor="電器用品">
            電器用品
          </label>
        </div>
      </div>
    </div>
  );
}

export default SideFilter;
