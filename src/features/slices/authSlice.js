import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: localStorage.getItem("isAdmin") === "true",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAdmin = true;
      localStorage.setItem("isAdmin", "true");
    },
    logout: (state) => {
      state.isAdmin = false;
      localStorage.removeItem("isAdmin");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;