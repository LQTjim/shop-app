import axios from "./axios";

export default async function loginWithJWT() {
  return await axios.post("/user/loginWithJWT", undefined, {
    withCredentials: true,
  });
}
