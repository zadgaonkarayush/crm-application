import { Customer, CustomerFormData } from "../features/customer/types";
import api from "./axios";

interface CustomerListResponse {
  data:Customer[];
  meta: {
    total: number;
    page: number;
    pages: number;
  };
}

export const getAllCustomer = async (): Promise<Customer[]> => {
  const response = await api.get<CustomerListResponse>("/customer");
  return response.data.data;
};
export const createCustomer = async(payload:CustomerFormData):Promise<Customer>=>{
const response = await api.post("/customer",payload)
return response.data.data
}
