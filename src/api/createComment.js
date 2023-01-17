import axios from "./axios";
export default function createComment(payload) {
  axios.post("/comment", payload, {
    withCredentials: true,
  });
}
