import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";

/* {
    "status": "success/fail",
    "token": "...",
    "data": {
        "user": {
            "_id": "",
            "name": "",
            "email": "",
            "role": "admin/user"
        }
    }
} */
export const signUpApi = createAsyncThunk(
  "auth/signUpApi",
  async (payload, thunkApi) => {
    try {
      const data = await axios.post("/user/signup", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        passwordConfirm: payload.passwordConfirm,
      });
      return data.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const loginApi = createAsyncThunk(
  "auth/loginApi",
  async (payload, thunkApi) => {
    try {
      const data = await axios.post("/user/login", {
        name: payload.name,
        password: payload.password,
      });
      return data.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    status: "IDLE" /* IDLE PENDING FAILED SUCCEEDED */,
  },

  extraReducers: (builder) => {
    builder.addCase(signUpApi.fulfilled, (state, { payload }) => {
      state.isLogin = true;
      state.status = "SUCCEEDED";
      state.name = payload.data.user.name;
      state.role = payload.data.user.role;
    });
    builder.addCase(signUpApi.pending, (state, { payload }) => {
      state.isLogin = false;
      state.status = "PENDING";
    });
    builder.addCase(signUpApi.rejected, (state, { payload }) => {
      state.isLogin = false;
      state.status = "FAILED";
    });
    builder.addCase(loginApi.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(loginApi.pending, (state, { payload }) => {
      state.status = "pending";
      console.log("pending");
    });
    builder.addCase(loginApi.rejected, (state, { payload }) => {
      state.status = "rejected";
      console.log("rejected");
    });
  },
});

export default authSlice.reducer;
