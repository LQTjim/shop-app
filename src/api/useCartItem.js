import { useEffect } from "react";
import axios from "./axios";

export default function useCartItem(id, setCallback) {
  useEffect(() => {
    async function getCartItem() {
      const result = await axios.get(`/item/get-one/${id}`);
      setCallback(result.data.data);
    }
    getCartItem();
  }, [id, setCallback]);
}
