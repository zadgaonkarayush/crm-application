export interface Product{
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
  category?: string;
  description?: string;
   unitPrice: number;
    costPrice: number;
    lowStock:number
}