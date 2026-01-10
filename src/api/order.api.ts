import { Order, OrderLinePayload,OrderPayload } from "../features/orders/types";
import api from "./axios";

export const createOrder = async(
    payload:OrderPayload
):Promise<Order>=>{
    const response = await api.post("/orders",payload);
    return response.data
}

export const generateInvoice = async(orderId:string)=>{
    const response = await api.post(`/orders/${orderId}/invoice`,null,{
        responseType:"blob"
    });
    return response.data
}
export const getAllOrders = async():Promise<Order[]>=>{
    const response = await api.get("/orders");
    return response.data
}