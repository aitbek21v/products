import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../assets/data";

const initialState = {
  products: [],
  oneProduct: {},
  error: "",
  loading: false,
};

export const getProduct = createAsyncThunk("products/getProduct", async () => {
  try {
    const respose = await axios(api);
    return respose.data;
  } catch (error) {
    alert(error.message);
  }
});
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const respose = await axios.delete(`${api}/${id}`);
      return id;
    } catch (error) {
      alert(error.message);
    }
  }
);
export const getOneProduct = createAsyncThunk(
  "products/getOneProduct",
  async (id) => {
    try {
      const respose = await axios(`${api}/${id}`);
      return respose.data;
    } catch (error) {
      alert(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${api}/${id}`, product);
      return response.data; // Возвращаем обновленные данные товара
    } catch (error) {
      return rejectWithValue(error.message); // В случае ошибки возвращаем сообщение об ошибке
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.oneProduct = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = productsSlice.actions;
export default productsSlice.reducer;
