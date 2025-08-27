import { ChevronDown, LogOut, Package, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

const Right = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [navOpen, setNavOpen] = useState();

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const checkRole = JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user")).role
    : "";

  return (
    <div className="flex items-center gap-4">
      {isAuthenticated ? (
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="relative flex cursor-pointer gap-2 rounded"
        >
          <div className="flex cursor-pointer items-center gap-1">
            {user && user.avatar ? (
              <img
                src={user.avatar.url}
                alt=""
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <User />
            )}

            <ChevronDown
              size={20}
              className={`transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {profileOpen && (
            <div className="absolute top-full -right-7 mt-5 flex w-64 flex-col gap-1 overflow-hidden bg-white shadow-xl text-shadow-md *:px-3 *:py-2 *:hover:bg-[#FFDCDC]">
              {checkRole === "admin" && (
                <Link
                  className="flex items-center justify-center gap-2"
                  to={"/admin/dashboard"}
                >
                  <User />
                  Admin Dashboard
                </Link>
              )}
              <Link
                className="flex items-center justify-center gap-2"
                to={"/profile"}
              >
                <User />
                My Profile
              </Link>
              <Link
                className="flex items-center justify-center gap-2"
                to={"/orders"}
              >
                <Package /> My Orders
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="flex cursor-pointer items-center justify-center gap-2 text-red-400 text-shadow-md"
              >
                <LogOut /> Sign Out
              </button>
            </div>
          )}
        </button>
      ) : (
        <Link
          to={"/sign-in"}
          className="cursor-pointer rounded-lg bg-[#ffc4c4] px-4 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
        >
          Sign In
        </Link>
      )}

      {/* <ShoppingCart className="cursor-pointer" /> */}
      <button
        className="relative cursor-pointer lg:hidden"
        onClick={() => setNavOpen(!navOpen)}
      >
        {navOpen ? <X size={30} /> : <Menu size={30} />}
        {navOpen && (
          <div className="absolute top-full right-0 mt-5 flex w-64 flex-col gap-1 overflow-hidden rounded-b-md bg-white shadow-xl text-shadow-md *:px-3 *:py-2 *:active:bg-[#FFDCDC]">
            <Link to={"/"}>Home</Link>
            <Link to={"catalogue"}>Catalogue</Link>
            <Link>Orders</Link>
            <Link>Reviews</Link>
            <Link>About Us</Link>
          </div>
        )}
      </button>
    </div>
  );
};

export default Right;
