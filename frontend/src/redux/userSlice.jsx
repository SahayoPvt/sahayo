import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register API
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/register", {
        method: "POST",
        body: userData,
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Registration failed. Please try again later"
      );
    }
  }
);
// login
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || JSON.stringify(data) || "Login failed"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Login failed. Please try again later"
      );
    }
  }
);
// SendOtp
export const SendOtp = createAsyncThunk(
  "user/sendotp",
  async ( email , { rejectWithValue }) => {
    
    try {
      const response = await fetch("/api/v1/sendotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email}),
      });
      
      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(
          data.message || JSON.stringify(data) || "Login failed"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Login failed. Please try again later"
      );
    }
  }
);

// VerifyOTP
export const VerifyOTP = createAsyncThunk(
  "user/verify-email",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/v1/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp}),
      });
      const data = await response.json();
      console.log("llll+ukkuk",userId,otp);
      console.log("llll",data);
      

      if (!response.ok) {
        return rejectWithValue(
          data.message || JSON.stringify(data) || "Login failed"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Login failed. Please try again later"
      );
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    // try{
    //     const {data}=await axios.get('/api/v1/profile');
    //     return data
    // }catch(error){
    //     return rejectWithValue(error.response?.data || 'Failed to load user profile')
    // }

    try {
      const response = await fetch("/api/v1/profile", {
        method: "GET",
        // credentials: 'include', // include cookies if needed
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(
          data.message || JSON.stringify(data) || "Failed to load user profile"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to load user profile");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/v1/logout", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.patch(
        "/api/v1/profile/update",
        userData,
        config
      );
      console.log("upas ijd", data);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: "Profile update failed. Please try again later",
        }
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/v1/password/update",
        formData,
        config
      );
      console.log("update password---", data);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Password update failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {


      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/password/forgot",
        {email},
        config
      );
  
      console.log("gggggggg--------------",data);
      
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Email sent Failed" }
      );
    }


    //  try {
    //   const response = await fetch("/api/v1/password/forgot", {
    //     method: "POST",
    //     // credentials: 'include', // include cookies if needed
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body:JSON.stringify({email})
    //   });
    //   console.log("iiiiii-------------",response);
    //   const data = await response.json();
    //   console.log(data);

    //   if (!response.ok) {
    //     return rejectWithValue(
    //       data.message || JSON.stringify(data) || "Failed to load user profile"
    //     );
    //   }
    //   return data;
    // } catch (error) {
    //   return rejectWithValue(error.message || "Failed to load user profile");
    // }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, userData }, { rejectWithValue }) => {
    // try{
    //     const config={
    //         headers:{
    //             'Content-Type':'application/json'
    //         }
    //     }
    //     const {data}=await axios.post(`/api/v1/reset/${token}`,userData,config);
    //     return data
    // }catch(error){
    //     return rejectWithValue(error.response?.data || {message:'Email sent Failed'})
    // }

    try {
      const response = await fetch(`/api/v1/password/reset/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      console.log("ffff-",response);
      
      const data = await response.json();
      console.log("newwww-",data);

      if (!response.ok) {
        return rejectWithValue(
          data.message || { message: "Reset password failed" }
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Reset password failed",
      });
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Registration cases
    builder
      .addCase(register.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(register.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        (state.isAuthenticated = Boolean(action.payload?.user)),

        (state.userId = action.payload.userId),
          //Store in localStorage
          localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Registration failed. Please try again later";
        state.user = null;
        state.isAuthenticated = false;
      });

    // Login cases
    builder
      .addCase(login.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(login.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.success = action.payload.success;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        //Store in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(login.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload || "Login failed. Please try again later");
        state.user = null;
        state.isAuthenticated = false;
      });

    // Loading User
    builder
      .addCase(loadUser.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        //Store in localStorage
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem(
          "isAuthenticated",
          JSON.stringify(state.isAuthenticated)
        );
      })
      .addCase(loadUser.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Failed to load user profile");
        state.user = null;
        state.isAuthenticated = false;

        if (action.payload?.statusCode === 401) {
          state.user = null;
          state.isAuthenticated = false;
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
        }
      });

    // Logout User
    builder
      .addCase(logout.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(logout.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      })
      .addCase(logout.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message || "Failed to load user profile");
      });

    // Update User Profile
    builder
      .addCase(updateProfile.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.user = action.payload?.user || null;
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        (state.loading = false),
          (state.error =
            action.payload?.message ||
            "Profile update failed. Please try again later");
      });

    // Update User Password
    builder
      .addCase(updatePassword.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        console.log("pay", action.payload);

        state.success = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        (state.loading = false), console.log("--", action?.payload);

        state.error = action?.payload || "Password update failed";
      });

      //SendOtp
    builder
      .addCase(SendOtp.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(SendOtp.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.success = action?.payload?.success;
        state.message = action?.payload?.message;
        state.user = action?.payload?.user
        
      })
      .addCase(SendOtp.rejected, (state, action) => {
        state.loading = false,
        state.error = action?.payload || "Password update failed";
      });

      //VerifyOTP
    builder
      .addCase(VerifyOTP.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(VerifyOTP.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        console.log("verifirddd--",action.payload);
        state.success = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(VerifyOTP.rejected, (state, action) => {
        (state.loading = false), 
        state.success = action.payload.success || false;

        state.message = action?.payload.message || "invalid otp";
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.success = action.payload?.success;
        state.message = action.payload?.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload?.message || "Email sent failed");
      });
    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        (state.loading = false), (state.error = null);
        state.success = action?.payload?.success;
        state.message = action?.payload?.message;
        (state.user = null), (state.isAuthenticated = false);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Reset password failed");
        state.success = false;
      });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
