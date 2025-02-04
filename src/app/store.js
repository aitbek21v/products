import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../features/slices/authSlice';
import productsSlice from '../features/slices/productsSlice'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    product:productsSlice
  },
});
