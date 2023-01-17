import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const submitCartApi = createAsyncThunk(
  "cart/submitCartApi",
  async (payload, thunkApi) => {
    try {
      const cart = thunkApi.getState().cart;
      const sendingData = JSON.stringify(cart);
      const data = await axios.post("item/order", sendingData, {
        headers: { "Content-Type": "application/json" },
      });
      return data.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState:
    //[{itemId:??,quantity:??,price:??}]
    [],
  reducers: {
    testLook: (state) => {
      console.log("testLook");
      console.log(state);
      console.log(...state);
      console.log("testLook");
    },
    initializeCart: () => {
      return [];
    },
    addItemToCart: (state, { payload }) => {
      const itemIndex = state.findIndex((el) => el.itemId === payload.itemId);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
      } else {
        state.push({
          itemId: payload.itemId,
          quantity: 1,
          price: payload.price,
        });
      }
    },
    increaseItem: (state, { payload }) => {
      const index = state.findIndex((el) => {
        return el.itemId === payload;
      });
      state[index].quantity += 1;
    },
    decreaseItem: (state, { payload }) => {
      const index = state.findIndex((el) => {
        return el.itemId === payload;
      });
      if (state[index].quantity <= 1) {
        state.splice(index, 1);
      } else {
        state[index].quantity -= 1;
      }
    },
  },
});
export default cartSlice.reducer;
export const {
  initializeCart,
  addItemToCart,
  increaseItem,
  decreaseItem,
  testLook,
} = cartSlice.actions;
