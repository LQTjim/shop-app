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
export const itemSlice = createSlice({
  name: "item",
  initialState: {
    status: "IDLE" /* IDLE PENDING FAILED SUCCEEDED */,
    items: [],
  },

  extraReducers: (builder) => {
    builder.addCase(getAllItemApi.fulfilled, (state, { payload }) => {
      state.status = "SUCCEEDED";
      state.items = payload.data;
    });

    builder.addCase(getAllItemApi.pending, (state, { payload }) => {
      state.status = "PENDING";
      state.items = [];
    });
    builder.addCase(getAllItemApi.rejected, (state, { payload }) => {
      state.status = "FAILED";
      state.items = [];
    });
  },
});
export default itemSlice.reducer;
