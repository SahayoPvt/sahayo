import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Home from "./components/Home";
import SearchProduct from "./pages/SearchProduct";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Mens from "./pages/Mens";
import Womens from "./pages/Womens";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ForgetPassword from "./pages/FogetPassword";
import Kids from "./pages/Kids";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/userSlice";
import ResetPassword from "./pages/ResetPassword";
import { QuantityProvider } from "./context/QuantityContext";
import CreateProduct from "./Admin/CreateProduct";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./Admin/Dashboard";
import ProductsList from "./Admin/ProductsList";
import UsersList from "./Admin/UsersList";
import UpdateProduct from "./pages/UpdateProduct";
import ReviewsList from "./pages/ReviewsList";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderList from "./Admin/OrderList";
import UpdateOrder from "./Admin/UpdateOrder";
import UpdateRole from "./Admin/UpdateRole";
import MyOrders from "./pages/MyOrders";
import ConfirmEmailVerification from "./pages/ConfirmEmailVerification";
import VerifyOtp from "./pages/VerifyOtp";

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <QuantityProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/mens" element={<Mens />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/womens" element={<Womens />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          {/* <Route path="/verifymail" element={<VerifyEmail />} /> */}
          <Route path="/confirm-email" element={<ConfirmEmailVerification />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/searchproduct" element={<SearchProduct />} />
          <Route path="/product/:_id" element={<ProductDetails />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/admin" element={<CreateProduct />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/shipping"
            element={<ProtectedRoute element={<Checkout />} />}
          />
          <Route
            path="/confirm-order"
            element={<ProtectedRoute element={<OrderConfirmation />} />}
          />
          <Route
            path="/myorder"
            element={<ProtectedRoute element={<MyOrders />} />}
          />
          {/* admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute element={<Dashboard />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/product/create"
            element={
              <ProtectedRoute element={<CreateProduct />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute element={<ProductsList />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute element={<UsersList />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/user/:_id"
            element={
              <ProtectedRoute element={<UpdateRole />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/product/:updateId"
            element={
              <ProtectedRoute element={<UpdateProduct />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <ProtectedRoute element={<ReviewsList />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute element={<OrderList />} adminOnly={true} />
            }
          />
          <Route
            path="/admin/order/update/:orderId"
            element={
              <ProtectedRoute element={<UpdateOrder />} adminOnly={true} />
            }
          />
        </Routes>

        {/* {isAuthenticated ? <Profile />:<Navigate to="/sign-in"/>} */}

        <Footer />
      </BrowserRouter>
    </QuantityProvider>
  );
};

export default App;
