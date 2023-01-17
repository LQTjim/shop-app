import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const getAllItemApi = createAsyncThunk(
  "item/getAllItemApi",
  async (payload, thunkApi) => {
    try {
      const res = await axios.get("/item");
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const getOneItemApi = createAsyncThunk(
  "item/getOneItemApi",
  async (payload, thunkApi) => {
    try {
      const res = await axios.get(`/item/p=${payload}`);
      return res.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const itemsSlice = createSlice({
  name: "items",
  initialState: {
    status: "IDLE" /* IDLE PENDING REJECTED SUCCEEDED */,
    data: [],
  },
  reducers: {
    testLook: (state) => {
      console.log("testLook");
      console.log(state);
      console.log("testLook");
    },
    initializeItem: () => {
      return { status: "IDLE", data: [] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllItemApi.fulfilled, (state, { payload }) => {
      state.status = "SUCCEEDED";
      state.data = payload.data;
    });
    builder.addCase(getAllItemApi.pending, (state, { payload }) => {
      state.status = "PENDING";
    });
    builder.addCase(getAllItemApi.rejected, (state, { payload }) => {
      state.status = "REJECTED";
    });
  },
});
export default itemsSlice.reducer;
export const { initializeItem, testLook } = itemsSlice.actions;
