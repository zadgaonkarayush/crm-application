import api from "./axios"

export const getLowStock =async()=>{
const response = await api.get("/dashboard/low-stock");
return response.data.lowStock;
}
export const getOpenOrders =async()=>{
const response = await api.get("/dashboard/open-orders");
return response.data.openOrders;
}
export const getTotalSale =async()=>{
const response = await api.get("/dashboard/sales-wise-sale");
return response.data.totalAmount;
}
export const getLast7DaysSale =async()=>{
const response = await api.get("/dashboard/last-7-days-sale");
return response.data;
}