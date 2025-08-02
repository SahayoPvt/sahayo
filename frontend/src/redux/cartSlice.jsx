// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//     totalAmount: 0,
//     totalQuantity: 0,
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const existingProduct = state.cartItems.find(
//         (item) => item._id === action.payload._id
//       );
//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         state.cartItems.push({ ...action.payload, quantity: 1 });
//       }
//       state.totalAmount += action.payload.price; // Increment totalAmount // Increment totalAmount
//       state.totalQuantity += 1; // Increment total quantity
//     },
//     removeFromCart: (state, action) => {
//       const product = state.cartItems.find(
//         (item) => item._id === action.payload
//       );
//       if (product) {
//         state.totalAmount -= product.price * product.quantity; // Deduct total price of the removed item
//         state.totalQuantity -= product.quantity; // Deduct total quantity
//       }
//       state.cartItems = state.cartItems.filter(
//         (item) => item._id !== action.payload
//       );
//         state.totalAmount -= product.price * product.quantity; // Deduct total price of the removed item
//     },
//     incrementQuantity: (state, action) => { 
//         const product = state.cartItems.find(
//             (item) => item._id === action.payload
//         );
//         if (product) {
//             product.quantity += 1;
//             state.totalQuantity += 1;
//             state.totalAmount += product.price; // Increment totalAmount
//         }
//     },
  
//     decrementQuantity: (state, action) => {
//       const product = state.cartItems.find(
//         (item) => item._id === action.payload
//       );
//       if (product && product.quantity > 1) {
//         product.quantity -= 1;
//         state.totalQuantity -= 1;
//         state.totalAmount -= product.currentprice; // Decrement totalAmount
//       } else if (product && product.quantity === 1) {
//         state.cartItems = state.cartItems.filter(
//           (item) => item._id !== action.payload
//         );
//         state.totalQuantity -= 1;
//         state.totalAmount -= product.currentprice; // Remove item's price from totalAmount
//       }
//     },
//     // totalAmount :(state) => {
//     //   state.totalAmount = state.cartItems.reduce(
//     //     (acc, item) => acc + item.price * item.quantity,
//     //     0
//     //   );
//     // },
//     // totalQuantity :(state) => {
//     //   state.totalQuantity = state.cartItems.reduce(
//     //     (acc, item) => acc + item.quantity,
//     //     0
//     //   );
//     // },
//   },
// });

// export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
// export default cartSlice.reducer;





import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
//Add items to cart
export const addItemsToCart=createAsyncThunk('cart/addItemsToCart',async ({_id,quantity,selectedSize},{rejectWithValue})=>{
    try{
    const {data}=await axios.get(`/api/v1/product/${_id}`);
    console.log("data->",data);
    

    return {
        product_id:data?.product?._id,
        name:data?.product?.name,
        price:data?.product?.currentprice,
        image:data?.product?.image[0]?.url,
        stock:data?.product?.stock,
        size:selectedSize,
        quantity
    }
    
    }catch(error){
        return rejectWithValue(error.response?.data || 'An Error Occurred')
    }
})
const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:JSON.parse(localStorage.getItem('cartItems')) || [],
        loading:false,
        error:null,
        success:false,
        message:null,
        removingId:null,
        shippingInfo:JSON.parse(localStorage.getItem('shippingInfo'))||{}
    },
    reducers:{
     removeErrors:(state)=>{
        state.error=null
     },
     removeMessage:(state)=>{
        state.message=null
     },
       incrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.product_id === action.payload);
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.product_id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
     removeItemFromCart:(state,action)=>{
        state.removingId=action.payload;
        state.cartItems=state.cartItems.filter(item=>item.product_id!=action.payload);
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
        state.removingId=null
     } ,
     saveShippingInfo:(state,action)=>{
        state.shippingInfo=action.payload
        // console.log("---j----",action.payload)
        localStorage.setItem('shippingInfo',JSON.stringify(state.shippingInfo))
     } ,
     clearCart:(state)=>{
        state.cartItems=[];
        localStorage.removeItem('cartItems')
        localStorage.removeItem('shippingInfo')

     }  
    },
    extraReducers:(builder)=>{
//Add items to cart
        builder
        .addCase(addItemsToCart.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(addItemsToCart.fulfilled,(state,action)=>{
            const item=action.payload
            // console.log("vvvvvvv",item);
            
            
            const existingItem=state.cartItems.find((i)=>i.product_id===item.product_id)
            console.log(existingItem);
            
            if(existingItem){
                existingItem.quantity=item.quantity
                state.message=`Updated ${item.name} quantity in the cart`

            }else{
                state.cartItems.push(item);
                state.message=`${item.name} is added to cart successfully`
            }
            state.loading=false,
            state.error=null,
            state.success=true
            localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
            // console.log("gggg----------------",localStorage.getItem('cartItems'));
            
        })
        .addCase(addItemsToCart.rejected,(state,action)=>{
            state.loading=false,
               state.error=action.payload?.message ||'An error occurred'
        })
    }
})
export const {removeErrors,removeMessage,removeItemFromCart,saveShippingInfo,clearCart ,incrementQuantity, decrementQuantity}=cartSlice.actions;
export default cartSlice.reducer







// import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';
// //Add items to cart
// export const addItemsToCart=createAsyncThunk('cart/addItemsToCart',async ({id,quantity},{rejectWithValue})=>{
//     try{
//     const {data}=await axios.get(`/api/v1/product/${id}`);
    
//     return {
//         product_id:data?.product._id,
//         name:data?.product?.name,
//         price:data?.product?.currentprice,
//         image:data?.product?.image[0].url,
//         stock:data?.product?.stock,
//         quantity
//     }
    
//     }catch(error){
//         return rejectWithValue(error.response?.data || 'An Error Occurred')
//     }
// })
// const cartSlice=createSlice({
//     name:'cart',
//     initialState:{
//         cartItems:JSON.parse(localStorage.getItem('cartItems')) || [],
//         loading:false,
//         error:null,
//         success:false,
//         message:null,
//         removingId:null,
//         shippingInfo:JSON.parse(localStorage.getItem('shippingInfo'))||{}
//     },
//     reducers:{
//      removeErrors:(state)=>{
//         state.error=null
//      },
//      removeMessage:(state)=>{
//         state.message=null
//      },
//      removeItemFromCart:(state,action)=>{
//         state.removingId=action.payload;
//         state.cartItems=state.cartItems.filter(item=>item.product!=action.payload);
//         localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
//         state.removingId=null
//      } ,
//      saveShippingInfo:(state,action)=>{
//         state.shippingInfo=action.payload
//         localStorage.setItem('shippingInfo',JSON.stringify(state.shippingInfo))
//      } ,
//      clearCart:(state)=>{
//         state.cartItems=[];
//         localStorage.removeItem('cartItems')
//         localStorage.removeItem('shippingInfo')

//      }  
//     },
//     extraReducers:(builder)=>{
// //Add items to cart
//         builder
//         .addCase(addItemsToCart.pending,(state)=>{
//             state.loading=true
//             state.error=null
//         })
//         .addCase(addItemsToCart.fulfilled,(state,action)=>{
//             const item=action.payload
//             const existingItem=state.cartItems.find((i)=>i.product_id===item.product_id)
//             if(existingItem){
//                 existingItem.quantity=item.quantity
//                 state.message=`Updated ${item.name} quantity in the cart`

//             }else{
//                 state.cartItems.push(item);
//                 state.message=`${item.name} is added to cart successfully`
//             }
//             state.loading=false,
//             state.error=null,
//             state.success=true
//             localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
//         })
//         .addCase(addItemsToCart.rejected,(state)=>{
//             state.loading=false,
//                state.error=action.payload?.message ||'An error occurred'
//         })
//     }
// })
// export const {removeErrors,removeMessage,removeItemFromCart,saveShippingInfo,clearCart}=cartSlice.actions;
// export default cartSlice.reducer