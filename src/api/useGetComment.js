import { useEffect } from "react";
import axios from "./axios";
async function fetchComment(id, callback) {
  const { data } = await axios.get(`comment/find-one/${id}`);
  if (data.data) {
    return callback(data.data);
  }
}
export default function useGetComment(id, callback) {
  useEffect(() => {
    fetchComment(id, callback);
  }, []);
}
