import { ChevronDown, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

const Right = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [navOpen, setNavOpen] = useState();
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="relative flex cursor-pointer gap-2 rounded bg-[#FFDCDC] px-2 py-1 shadow-md"
      >
        <div className="flex cursor-pointer items-center gap-1">
          <User />
          Profile
          <ChevronDown
            size={20}
            className={`transition-transform duration-200 ${
              profileOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {profileOpen && (
          <div className="absolute top-full right-0 mt-5 flex w-64 flex-col gap-1 overflow-hidden bg-white shadow-xl text-shadow-md *:px-3 *:py-2 *:hover:bg-[#FFDCDC]">
            <Link>My Profile</Link>
            <Link
              onClick={() => setProfileOpen(!profileOpen)}
              to={"/editCatalogue"}
            >
              Edit Catalogue
            </Link>
            <Link>Payment</Link>
          </div>
        )}
      </button>
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
