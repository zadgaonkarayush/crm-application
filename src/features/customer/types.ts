export interface Customer{
     id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address?: string;
  avatar: string;
  status: "Lead" | "Active" | "Inactive";
}
export interface CustomerFormData {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  // only admin / manager will send this
  salesId?: string;
}
export interface CustomerState{
 customers: Customer[];
  loading: boolean;
  error: string | null;
}