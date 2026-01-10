import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrderState, OrderStatus } from "./types";
import {
  createOrder,
  generateInvoice,
  getAllOrders,
} from "../../api/order.api";
import * as Sharing from "expo-sharing";
import { Directory, File } from "expo-file-system";

export const createOrderThunk = createAsyncThunk(
  "order/createOrder",
  async (payload: any, thunkAPI) => {
    try {
      const order = await createOrder(payload);

      const pdfBlob = await generateInvoice(order._id);

      return order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const order = await getAllOrders();
      return order;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
  activeFilter: "All",
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderFilter: (
      state,
      action: PayloadAction<OrderState["activeFilter"]>,
    ) => {
      state.activeFilter = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },

    //update status
    updateOrderStatus: (
      state,
      action: PayloadAction<{ id: string; status: OrderStatus }>,
    ) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },

    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter((o) => o.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift({
          id: action.payload._id,
          amount: action.payload.total,
          status: action.payload.status,
          date: action.payload.createdAt,
        });
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrders.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        (state.loading = false),
          (state.orders = action.payload)
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const {
  setOrderFilter,
  addOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
