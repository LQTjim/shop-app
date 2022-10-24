import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllItemApi } from "../features/itemSlice";
import ItemCard from "./ItemCard";

function Products() {
  const { items, status } = useSelector((state) => state.item);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "SUCCEEDED" && items.length > 0) {
      return;
    }
    dispatch(getAllItemApi());
    return;
  }, []);
  let content =
    status === "SUCCEEDED" ? (
      <div className="m-5">
        <div className="row g-1 justify-content-center">
          {items.map((item) => (
            <ItemCard key={item.id} item={item}></ItemCard>
          ))}
        </div>
      </div>
    ) : (
      <div>spinner</div>
    );

  return content;
}

export default Products;
