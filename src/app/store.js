import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import itemReducer from "../features/itemSlice";

export default configureStore({
  reducer: { auth: authReducer, item: itemReducer },
});
