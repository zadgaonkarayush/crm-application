import { Product } from "../features/products/types";
import api from "./axios";

export const getAllProducts = async():Promise<Product[]>=>{
    const response = await api.get<Product[]>('/products');
    return response.data
}