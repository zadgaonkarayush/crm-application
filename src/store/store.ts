import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import customerReducer from '../features/customer/customerSlice';
import orderReducer from '../features/orders/orderSlice';
export const store = configureStore({
    reducer:{
        auth:authReducer,
        product:productReducer,
        customer:customerReducer,
        order:orderReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
