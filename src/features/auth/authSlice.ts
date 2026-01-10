import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, User } from "./types";
import axios from "axios";
import { BASE_URL } from "../../api/auth.url";

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async({email,password}:{email:string,password:string},thunkApi)=>{
        try{
          const response = await axios.post(`${BASE_URL}/auth/login`,{email,password})
           
             return {
        user: response.data.user,
        token: response.data.token,
      };
        }
        catch(error:any){
          return thunkApi.rejectWithValue("Login failed!")
        }
    }
)

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async(
        {fullName,email,phone,role,password}:any,
        thunkApi
    )=>{
  try{
    const response ={
        user:{
            id: "1",
          fullName,
          phone,
          email,
          role,
          token: "demo-token-123",
        }
    }
    return response.user

  }catch(error:any){
    thunkApi.rejectWithValue("Signup Failed!")
  }
    }
)

const initialState:AuthState= {
user:null,
token:null,
loading:false,
error:null,
};

const authSlice =createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout:(state)=>{
      state.user=null;
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.loading = true,
      state.error = null
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading = false,
      state.user =action.payload.user;
      state.token =action.payload.token
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading = false,
      state.error = action.payload as string
    })

    //SignUp

    .addCase(signupUser.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(signupUser.fulfilled,(state,action)=>{
      state.loading= false;
      state.user = action.payload as User
    })
    .addCase(signupUser.rejected,(state,action)=>{
      state.loading=false,
      state.error = action.payload as string
    })
  }
})

export const {logout} =authSlice.actions;
export default authSlice.reducer;

