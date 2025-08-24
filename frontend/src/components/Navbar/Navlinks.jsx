import React from "react";
import { Link } from "react-router";

const Navlinks = () => {
  return (
    <div className="hidden gap-6 text-shadow-md lg:flex">
      <Link to={"/"}>Home</Link>
      <Link to={"catalogue"}>Catalogue</Link>
      <Link>Orders</Link>
      <Link>Reviews</Link>
      <Link>About Us</Link>
      {/* <Link>Blog</Link>
      <Link>Custom Design</Link> */}
    </div>
  );
};

export default Navlinks;
