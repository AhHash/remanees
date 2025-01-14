import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, regiserUserThunk, getUserThunk } from "./userThunk";
import { toast } from "react-toastify";

const initialState: {
  user: object | null;
  isLoading: boolean;
  isSidebarOpen: boolean;
} = { user: null, isLoading: false, isSidebarOpen: false };

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        toast.success("Logged in!");
        state.isLoading = false;
        state.user = user;
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const { user } = payload;

        toast.success("Registered!");
        state.isLoading = false;
        state.user = user;
      })
      .addCase(registerUser.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: any, thunkAPI: any) => {
    return loginUserThunk("/users/login", user, thunkAPI);
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user: object, thunkAPI: any) => {
    return regiserUserThunk("/users/register", user, thunkAPI);
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI: any) => {
    return getUserThunk("/users/currentUser", thunkAPI);
  }
);
