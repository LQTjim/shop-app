import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import itemsReducer from "../features/itemsSlice";
import itemReducer from "../features/itemSlice";
import cartReducer from "../features/cartSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    items: itemsReducer,
    item: itemReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActionPaths: "payload.config.adapter" },
    }),
});
