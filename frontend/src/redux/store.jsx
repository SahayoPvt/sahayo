import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
 import productReducer from './productSlice';
 import userReducer from './userSlice';
import adminReducer from "./admin/adminSlice"
import orderReducer from "./orderSlice"
import newcartReducer  from "./newcartSlice"


export const store = configureStore({
  reducer: {
    product:productReducer,
    cart:cartReducer,
    user:userReducer,
    admin:adminReducer,
    order:orderReducer,
    newcart:newcartReducer
    
  }
});