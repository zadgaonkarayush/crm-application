export type OrderStatus =
  | "draft"
  | "pending"
  | "shipped"
  | "completed"
  | "cancelled";

export interface OrderItem{
     id: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}
export interface Order{
  //   _id: string;
  // customerName: string;
  // date: string;
  // status: OrderStatus;
  // amount: number;
  // items: OrderItem[];
  // notes?: string;
  _id: string;
  customer: any;
  status: OrderStatus;
  total: number;
  createdAt: string;
}

export interface OrderLinePayload {
  product: string;
  quantity: number;
  price: number;
  tax?: number;
}

export interface OrderPayload {
  customer: string;
  lines: OrderLinePayload[];
}
export interface OrderState{
    orders:Order[];
    loading:boolean;
    error:string | null;
    activeFilter: OrderStatus | "All";
}