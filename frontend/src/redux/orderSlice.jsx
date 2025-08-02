import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating a new order
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      };

      const data = await axios.post(
        '/api/v1/new/order',
        orderData,
        config
      );
      console.log("hhyyj---",data);
   
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getAllMyOrders = createAsyncThunk(
  'order/getAllMyOrders',
  async (_, { rejectWithValue }) => {
    try {
     

      const { data } = await axios.get(
        '/api/v1/orders/user'
      );
      console.log("hhyyj---",data);
   
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "order creation failed");
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
    success: false,
    orders:[],
  },
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        
        state.order = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getAllMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        
        state.orders = action.payload.orders;
        state.success = true;
      })
      .addCase(getAllMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;



// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const createOrder = createAsyncThunk(
//   'order/createOrder',
//   async (orderData, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         withCredentials: true,
//       };

//       const { data } = await axios.post(
//         '/api/v1/new/order',
//         orderData,
//         config
//       );

//       return data; // Return the entire response data
//     } catch (error) {
//       // Return error response data if available, otherwise return the error message
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const orderSlice = createSlice({
//   name: 'order',
//   initialState: {
//     order: null,
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     clearOrder: (state) => {
//       state.order = null;
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createOrder.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createOrder.fulfilled, (state, action) => {
//         state.loading = false;
//         state.order = action.payload; // Now using the entire payload
//         state.success = true;
//       })
//       .addCase(createOrder.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.success = false;
//       });
//   },
// });

// export const { clearOrder } = orderSlice.actions;
// export default orderSlice.reducer;