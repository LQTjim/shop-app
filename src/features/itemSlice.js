import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const getOneItemApi = createAsyncThunk(
  "item/getOneItemApi",
  async (payload, thunkApi) => {
    try {
      const res = await axios.get(`/item/get-one/${payload}`);
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const itemSlice = createSlice({
  name: "item",
  initialState: {
    status: "IDLE" /* IDLE PENDING REJECTED SUCCEEDED */,
    data: null,
  },
  reducers: {
    testLook: (state) => {
      console.log("testLook");
      console.log(state.data);
      console.log(state.status);
      console.log("testLook");
    },
    initializeItem: () => {
      return { status: "IDLE", data: {} };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOneItemApi.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.status = "SUCCEEDED";
    });
    builder.addCase(getOneItemApi.pending, (state, { payload }) => {
      state.status = "PENDING";
    });
    builder.addCase(getOneItemApi.rejected, (state, { payload }) => {
      state.status = "REJECTED";
    });
  },
});
export default itemSlice.reducer;
export const { initializeItem, testLook } = itemSlice.actions;
