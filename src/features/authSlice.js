import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../api/axios";
import Cookies from "js-cookie";
import loginWithJWT from "../api/loginWithJWT";

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
    const sendingData = JSON.stringify(payload);
    try {
      const data = await axios.post("/user/signup", sendingData, {
        headers: { "Content-Type": "application/json" },
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
      const sendingData = JSON.stringify(payload);
      const data = await axios.post("/user/login", sendingData, {
        headers: { "Content-Type": "application/json" },
      });
      return data.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const loginWithJWTApi = createAsyncThunk(
  "auth/loginWithJWTApi",
  async (payload, thunkApi) => {
    try {
      return loginWithJWT();
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    status: "IDLE" /* IDLE PENDING REJECTED SUCCEEDED */,
    name: "",
    email: "",
    role: "",
  },
  reducers: {
    initialize: (state) => {
      return { isLogin: false, status: "IDLE", email: "", name: "", role: "" };
    },
    logout: () => {
      Cookies.remove("jwt");
      return { isLogin: false, status: "IDLE", email: "", name: "", role: "" };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpApi.fulfilled, (state, { payload }) => {
      state.isLogin = true;
      state.status = "SUCCEEDED";
      state.email = payload.data.user.email;
      state.name = payload.data.user.name;
      state.role = payload.data.user.role;
    });
    builder.addCase(signUpApi.pending, (state, { payload }) => {
      state.isLogin = false;
      state.status = "PENDING";
    });
    builder.addCase(signUpApi.rejected, (state, { payload }) => {
      state.isLogin = false;
      state.status = "REJECTED";
    });

    builder.addCase(loginApi.fulfilled, (state, { payload }) => {
      state.isLogin = true;
      state.status = "SUCCEEDED";
      state.email = payload.data.user.email;
      state.name = payload.data.user.name;
      state.role = payload.data.user.role;
    });
    builder.addCase(loginApi.pending, (state, { payload }) => {
      state.isLogin = false;
      state.status = "PENDING";
    });
    builder.addCase(loginApi.rejected, (state, { payload }) => {
      state.isLogin = false;
      state.status = "REJECTED";
    });

    builder.addCase(loginWithJWTApi.fulfilled, (state, { payload }) => {
      return { isLogin: true, status: "SUCCEEDED", ...payload.data };
    });
    builder.addCase(loginWithJWTApi.pending, (state, { payload }) => {
      return {
        isLogin: false,
        status: "PDENDING",
        name: "",
        email: "",
        role: "",
      };
    });
    builder.addCase(loginWithJWTApi.rejected, (state, { payload }) => {
      Cookies.remove("jwt");
      return {
        isLogin: false,
        status: "REJECTED",
        name: "",
        email: "",
        role: "",
      };
    });
  },
});

export default authSlice.reducer;
export const { initialize, logout } = authSlice.actions;
