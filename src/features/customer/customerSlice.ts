import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customer, CustomerState, CustomerFormData } from "./types";
import axios from "axios";
import { BASE_URL } from "../../api/auth.url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createCustomer, getAllCustomer } from "../../api/customer.api";
import { RootState } from "../../store/store";

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const customers = await getAllCustomer();
      return customers;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);


export const addCustomer = createAsyncThunk<
  Customer,
  CustomerFormData,
  { state: RootState }
>("customer/addCustomer", async (payload, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const authUser = state.auth.user;

    const finalPayload: CustomerFormData = {
      ...payload,
      salesId: authUser?.role === "sales" ? authUser.id : undefined,
    };

    const customer = await createCustomer(finalPayload);
    return customer;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message,
    );
  }
});

const initialState: CustomerState = {
  customers: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        (state.loading = false),
          (state.customers = action.payload.filter(Boolean).map((c: any) => ({
            ...c,
            id: c._id, // normalize once
          })));
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customers.unshift(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default customerSlice.reducer;
