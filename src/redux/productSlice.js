import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async ({offset, limit}, {rejectWithValue}) => {
    try {
      const response = await axios.get(API_URL, {
        params: {offset, limit},
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Network error');
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    offset: 0,
    limit: 10,
    loading: false,
    error: null,
    hasMore: true,
  },
  reducers: {
    resetProducts: state => {
      state.products = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload || action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.products = [...state.products, ...action.payload];
          state.offset += state.limit;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load products';
      });
  },
});

export const {resetProducts} = productSlice.actions;
export default productSlice.reducer;
