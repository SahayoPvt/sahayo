import { Link } from "react-router";
import React from "react";

const SiteLinks = () => {
  return (
    <div className="flex justify-evenly md:gap-10">
      <section className="flex min-w-35 flex-col items-center gap-2 sm:items-start">
        <h2 className="text-xl font-semibold text-shadow-md">Products</h2>
        <div className="flex flex-col sm:gap-1">
          <Link to={"/"}>Home</Link>
          <Link>Category</Link>
          {/* <Link>Orders</Link> */}
        </div>
      </section>
      <section className="flex min-w-35 flex-col items-center gap-2 sm:items-start">
        <h2 className="text-xl font-semibold text-shadow-md">Resources</h2>
        <div className="flex flex-col gap-1">
          <Link>Blog</Link>
          <Link>Measurement Guide</Link>
        </div>
      </section>
      <section className="flex min-w-35 flex-col items-center gap-2 sm:items-start">
        <h2 className="text-xl font-semibold text-shadow-md">Company</h2>
        <div className="flex flex-col sm:gap-1">
          {/* <Link>Reviews</Link>
          <Link>Payment</Link> */}
          <Link>About Us</Link>
          <Link>Contact Us</Link>
        </div>
      </section>
    </div>
  );
};

export default SiteLinks;
