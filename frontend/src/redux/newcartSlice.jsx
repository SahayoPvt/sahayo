import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating a new order
// export const AddToCart = createAsyncThunk(
//   'cart/AddToCart',
//   async (cartData, { rejectWithValue }) => {

//     console.log("cartdata->", cartData);

//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       };

//       const data = await axios.post(
//         '/api/v1/cart',
//         cartData,
//         config
//       );
//       console.log("hhyyj---",data);

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message);
//     }

//     // try {

//     //   const response= await fetch('/api/v1/cart', {

//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(cartData),
//     //     // credentials: 'include',
//     //   });
//     //   console.log("hhyyj---",await response.json());

//     // } catch (error) {
//     //        return rejectWithValue(error.response.data.message);

//     // }

//   }
// );

// export const getAllMyOrders = createAsyncThunk(
//   'order/getAllMyOrders',
//   async (_, { rejectWithValue }) => {
//     try {

//       const { data } = await axios.get(
//         '/api/v1/orders/user'
//       );
//       console.log("hhyyj---",data);

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || "order creation failed");
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     cart: null,
//     loading: false,
//     error: null,
//     success: false,
//     carts:[],
//   },
//   reducers: {
//     clearCart: (state) => {
//       state.order = null;
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(
//     AddToCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(AddToCart.fulfilled, (state, action) => {
//         state.loading = false;
//         console.log(action.payload);

//         state.cart = action.payload;
//         state.success = true;
//       })
//       .addCase(AddToCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       })

//   },
// });

// export const { clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// Add these new thunks

export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/cartbyuser", {
        withCredentials: true,
      });
      console.log("new-------data", data);

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const AddToCart = createAsyncThunk(
  "cart/AddToCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      // Rename _id to productId in the request body
      const requestData = {
        productId: cartData._id,
        quantity: cartData.quantity,
        size: cartData.size,
      };

      const { data } = await axios.post("/api/v1/cart", requestData, config);

      console.log("data->", data.cart.products);
      console.log("dataPrice->", data.cart.totalPrice);

      return await data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// today

export const incrementQuantity = createAsyncThunk(
  "cart/incrementQuantity",
  async ({ productId, size }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        "/api/v1/cart/increment",
        { productId, size },
        config
      );
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const decrementQuantity = createAsyncThunk(
  "cart/decrementQuantity",
  async ({ productId, size }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        "/api/v1/cart/decrement",
        { productId, size },
        config
      );
      return data.cart;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete("/api/v1/cart/clear", {
        withCredentials: true,
      });
      return data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        "/api/v1/cart/remove",
        productId
        // withCredentials: true,
      );

      console.log("cardttt->>>>>>", data);

      return data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    loading: false,
    error: null,
    successs: false,
    messagess: null,
    totalPrice: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = null; // Fixed from state.order to state.cart
      state.loading = false;
      state.error = null;
      state.successs = false;
    },

    loadCartFromStorage: (state) => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        state.cartItems = JSON.parse(storedCart);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart.products;
        state.success = action.payload.success;
        state.message = action.payload.message;
        localStorage.setItem("cart", JSON.stringify(action.payload.cart));
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.cart?.products || [];
        state.totalPrice = action.payload.cart?.totalPrice;
        localStorage.setItem("cart", JSON.stringify(action.payload.cart || []));
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(incrementQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      })
      .addCase(incrementQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(decrementQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      })

      .addCase(decrementQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = [];
        state.totalPrice = 0;
        localStorage.removeItem("cart"); // Optional
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.products;
        state.totalPrice = action.payload.totalPrice;
        localStorage.setItem("cart", JSON.stringify(action.payload));
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
