import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight, HiH1 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
// import CartDrawer from "./../pages/CartDrawer";
// import SearchBar from "./../pages/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import CategoryDropdown from "../pages/CategoryDropdown";
import { loadUser, logout } from "../redux/userSlice";
import toast from "react-hot-toast";
import { removeSuccess } from "../redux/productSlice";
import {
  ChevronDown,
  Heart,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";
import Logo from "./Logo";
import DeliveryLocation from "./Navbar/DeliveryLocation";

const Navbar = () => {
  const [draweOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [item, setitem] = useState(false);
  // const toggleCartDrawer = () => {
  //   setDrawerOpen(!draweOpen);
  // };
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const toggleNavDrawer = () => {
    setNavbarOpen(!navbarOpen);
    setborders(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const logoutUser = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        toast.success("Logout Successful", {
          position: "top-center",
          autoClose: 3000,
        });
        dispatch(removeSuccess());
        // navigate("/login");
      })
      .catch((error) => {
        toast.success(error.message || "Logout Failed", {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };
  const { loading, totalPrice, cartItems, error, success, message } =
    useSelector((state) => state.newcart);

  // const cartItems = useSelector((state) => state.cart.cartItems);
  // const handleAuth = () => {
  //   localStorage.removeItem("isAuthenticated");
  //   navigate("/");
  // };
  // useEffect(() => {
  //   setitem(false);
  // }, [isAuthenticated]);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    // localStorage.clear()
    navigate("/sign-in"); // or your login page
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // On mount, if authenticated, load user
    if (isAuthenticated) {
      dispatch(loadUser());
    }
    // eslint-disable-next-line
  }, []);

  const checkRole = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : "";

  return (
    <>
      {/* navbar */}
      <div className="fixed z-50 flex h-18 w-full items-center justify-around gap-20 bg-[#fff8f4] shadow-lg">
        <Logo />

        <DeliveryLocation />

        {/* center-part */}
        <div className="hidden space-x-6 md:flex">
          <Link
            to="/"
            className={`nav-link ${
              activeItem === "Home"
                ? "border-b-2 text-blue-600"
                : "border-none text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setActiveItem("Home")}
          >
            Home
          </Link>
          {/* <Link
            to="/product"
            className={`nav-link ${
              activeItem === "All Product"
                ? "border-b-2 text-blue-600"
                : "border-none text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setActiveItem("All Product")}
          >
            Products
          </Link> */}

          <CategoryDropdown />

          <Link
            to="/about"
            className={`nav-link ${
              activeItem === "About"
                ? "border-b-2 text-blue-600"
                : "border-none text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setActiveItem("About")}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-link ${
              activeItem === "Contact"
                ? "border-b-2 text-blue-600"
                : "border-none text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setActiveItem("Contact")}
          >
            Contact
          </Link>
        </div>

        {/* right-part */}
        <div className="flex items-center md:space-x-4">
          {/* <div className="mt-1 mr-2 overflow-hidden md:mr-4">
            <SearchBar />
          </div> */}
          {/* <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black  mr-5"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-400 text-white text-xs rounded-full px-1.5 py-0.5">
              {isAuthenticated ? cartItems.length : "0"}
            </span>
          </button> */}
          {/* <button
            onClick={toggleCartDrawer}
            className="relative mr-5 hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 rounded-full bg-red-400 px-1.5 py-0.5 text-xs text-white">
              {isAuthenticated ? cartItems?.length : "0"}
            </span>
          </button> */}
          {/* searBar */}
          {isAuthenticated ? (
            <div className="dropdown relative inline-flex">
              <button
                onClick={() => setitem(!item)}
                type="button"
                className="dropdown-toggle group flex items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-50"
              >
                {user && user.avatar ? (
                  <img
                    src={user.avatar.url}
                    alt="avatar"
                    className="h-8 w-8 rounded-full border-2 border-gray-200 transition-colors group-hover:border-blue-300"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
                {/* <span className="hidden font-medium text-gray-700 group-hover:text-blue-600 md:inline">
                  {user?.name || "User"}
                </span> */}
                <ChevronDown
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    item ? "rotate-180" : ""
                  }`}
                />
              </button>

              {item && (
                <div className="dropdown-menu animate-in slide-in-from-top-2 absolute top-full right-0 mt-4.5 -mr-10 w-64 overflow-hidden border border-gray-100 bg-white shadow-xl duration-200">
                  {/* <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                      <div className="flex items-center space-x-3">
                        {user && user.avatar ? (
                          <img
                            src={user.avatar.url}
                            alt="avatar"
                            className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                          <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                        </div>
                      </div>
                    </div>
                     */}
                  <div className="py-2">
                    {checkRole == "admin" ? (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setitem(false)}
                        className="inline-flex w-full items-center justify-center bg-indigo-600 px-4 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                      >
                        <User className="mr-3 h-4 w-4 group-hover:text-blue-600" />
                        <span className="font-medium">Admin Dashboard</span>
                      </Link>
                    ) : (
                      ""
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setitem(false)}
                      className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <User className="mr-3 h-4 w-4 group-hover:text-blue-600" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <Link
                      to="/myorder"
                      onClick={() => setitem(false)}
                      className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
                    >
                      <Package className="mr-3 h-4 w-4 group-hover:text-green-600" />
                      <span className="font-medium">My Orders</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setitem(false)}
                      className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-pink-50 hover:text-pink-600"
                    >
                      <Heart className="mr-3 h-4 w-4 group-hover:text-pink-600" />
                      <span className="font-medium">Wishlist</span>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setitem(false)}
                      className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Settings className="mr-3 h-4 w-4 group-hover:text-gray-900" />
                      <span className="font-medium">Settings</span>
                    </Link>

                    <div className="mt-2 border-t border-gray-300 pt-2">
                      <button
                        onClick={() => {
                          setitem(false);
                          logoutUser();
                        }}
                        className="group flex w-full items-center px-4 py-1 text-red-600 transition-all duration-200 hover:bg-red-50"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="flex transform items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            >
              <User className="h-4 w-4" />
              <span className="font-medium">Sign In</span>
            </Link>
          )}

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="ml-1 h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
      {/* <CartDrawer draweOpen={draweOpen} toggleCartDrawer={toggleCartDrawer} /> */}

      <div
        className={`fixed top-0 left-0 z-50 flex h-full w-3/4 transform flex-col bg-white transition-transform duration-300 sm:w-1/2 md:w-1/4 ${
          navbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-2 flex justify-start px-2">
          <div className="absolute mt-8 flex flex-col space-y-3 text-xl md:hidden">
            <Link to="/" onClick={toggleNavDrawer}>
              Home{" "}
            </Link>
            <Link
              to="/product"
              onClick={toggleNavDrawer}
              className={`nav-link ${
                activeItem === "" ? "border-b-2" : "border-none"
              }`}
            >
              Products
            </Link>
            <Link
              to="/mens"
              onClick={toggleNavDrawer}
              className={`nav-link ${
                activeItem === "" ? "border-b-2" : "border-none"
              }`}
            >
              Men
            </Link>

            <Link
              to="womens"
              onClick={toggleNavDrawer}
              className={`nav-link ${
                activeItem === "" ? "border-b-2" : "border-none"
              }`}
            >
              Women
            </Link>

            <Link
              to="about"
              onClick={toggleNavDrawer}
              className={`nav-link ${
                activeItem === "" ? "border-b-2" : "border-none"
              }`}
            >
              About
            </Link>

            <Link
              to="contact"
              onClick={toggleNavDrawer}
              className={`nav-link ${
                activeItem === "" ? "border-b-2" : "border-none"
              }`}
            >
              Contact{" "}
            </Link>
          </div>
          <button onClick={toggleNavDrawer} className="r">
            <IoMdClose className="right-0 h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
