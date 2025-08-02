import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight, HiH1 } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import CartDrawer from "./../pages/CartDrawer";
import SearchBar from "./../pages/SearchBar";
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

const Navbar = () => {
  const [draweOpen, setDrawerOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [item, setitem] = useState(false);
  const toggleCartDrawer = () => {
    setDrawerOpen(!draweOpen);
  };
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
  const { loading,totalPrice, cartItems, error, success, message } = useSelector(state => state.newcart);

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
      <div className="fixed  top-0 w-full z-50 shadow-md  bg-white  mx-auto flex items-center justify-between py-4 px-3 md:px-6">
        {/* left-logo */}
        {/* <div className="">
          <Link to="/" className=" text-2xl font-medium">
            Rabbit
          </Link>
        </div> */}

        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rabbit
            </span>
          </Link>
        </div>

        {/* center-part */}
        <div className=" hidden md:flex space-x-6 ">
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
          <Link
            to="/product"
            className={`nav-link ${
              activeItem === "All Product"
                ? "border-b-2 text-blue-600"
                : "border-none text-gray-700 hover:text-blue-600"
            }`}
            onClick={() => setActiveItem("All Product")}
          >
            Products
          </Link>

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
        <div className="flex items-center  md:space-x-4">
          <div className="overflow-hidden mr-2 mt-1 md:mr-4">
            <SearchBar />
          </div>
          {/* <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black  mr-5"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-400 text-white text-xs rounded-full px-1.5 py-0.5">
              {isAuthenticated ? cartItems.length : "0"}
            </span>
          </button> */}
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black  mr-5"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-400 text-white text-xs rounded-full px-1.5 py-0.5">
              {isAuthenticated ? cartItems?.length : "0"}
            </span>
          </button>
          {/* searBar */}
          {isAuthenticated ? (
            <div className="dropdown relative inline-flex">
              <button
                onClick={() => setitem(!item)}
                type="button"
                className="dropdown-toggle flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
              >
                {user && user.avatar ? (
                  <img
                    src={user.avatar.url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-blue-300 transition-colors"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <span className="hidden md:inline text-gray-700 font-medium group-hover:text-blue-600">
                  {user?.name || "User"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    item ? "rotate-180" : ""
                  }`}
                />
              </button>

              {item && (
                <div className=" -mr-10 dropdown-menu absolute top-full right-0 w-64 mt-4.5 bg-white shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
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
                        className="w-full inline-flex justify-center items-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors"
                      >
                        <User className="w-4 h-4 mr-3 group-hover:text-blue-600" />
                        <span className="font-medium">Admin Dashboard</span>
                      </Link>
                    ) : (
                      ""
                    )}
                    <Link
                      to="/profile"
                      onClick={() => setitem(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                    >
                      <User className="w-4 h-4 mr-3 group-hover:text-blue-600" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <Link
                      to="/myorder"
                      onClick={() => setitem(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                    >
                      <Package className="w-4 h-4 mr-3 group-hover:text-green-600" />
                      <span className="font-medium">My Orders</span>
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setitem(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 group"
                    >
                      <Heart className="w-4 h-4 mr-3 group-hover:text-pink-600" />
                      <span className="font-medium">Wishlist</span>
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setitem(false)}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                    >
                      <Settings className="w-4 h-4 mr-3 group-hover:text-gray-900" />
                      <span className="font-medium">Settings</span>
                    </Link>

                    <div className="border-t border-gray-300  mt-2 pt-2">
                      <button
                        onClick={() => {
                          setitem(false);
                          logoutUser();
                        }}
                        className="flex items-center w-full px-4 py-1 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
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
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <User className="w-4 h-4" />
              <span className="font-medium">Sign In</span>
            </Link>
          )}

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 ml-1 text-gray-700" />
          </button>
        </div>
      </div>
      <CartDrawer draweOpen={draweOpen} toggleCartDrawer={toggleCartDrawer} />

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white transform transition-transform duration-300 flex flex-col z-50 ${
          navbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-start  px-2 mt-2">
          <div className=" absolute md:hidden flex flex-col space-y-3 mt-8 text-xl">
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
            <IoMdClose className="h-6 w-6 text-gray-600 right-0" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;

