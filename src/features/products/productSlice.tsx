import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";
import { getAllProducts } from "../../api/product.api";

interface ProductState{
    products:Product[];
    loading:boolean;
     error: string | null;
}
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<
Product[],
  void,
  { rejectValue: string }
>("products/fetchProducts",async(_,thunkAPI)=>{
  try{
  const response = await getAllProducts()
  return response;
  }catch(error:any){
   return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
})
export const productSlice=createSlice({
    name:"products",
    initialState,
    reducers:{
        addProduct:(state,action:PayloadAction<Product>)=>{
            state.products.push(action.payload);
        },
        editproduct:(state,action:PayloadAction<Product>)=>{
             const index= state.products.findIndex(p=>p.id === action.payload.id);
             if(index !==-1){
                state.products[index] = action.payload;
             }
        },
        deleteProduct:(state,action:PayloadAction<string>)=>{
           state.products = state.products.filter(p=>p.id!==action.payload)
        },
        adjustProduct:(
            state,
            action:PayloadAction<{
                id:string,
                type:"increase"|"decrease",
                qty:number
            }>)=>{
           const product = state.products.find(p=>p.id === action.payload.id);
           if(!product) return;

           if(action.payload.type === "increase"){
            product.stock +=action.payload.qty;
           }else{
            product.stock = Math.max(0,product.stock - action.payload.qty);
           }
        },
    },
     extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
       .addCase(fetchProducts.fulfilled, (state, action) => {
              (state.loading = false),
                (state.products = action.payload.filter(Boolean).map((p: any) => ({
                  ...p,
                  id: p._id, // normalize once
                })));
            })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {addProduct,editproduct,deleteProduct,adjustProduct} = productSlice.actions;
export default productSlice.reducer;
