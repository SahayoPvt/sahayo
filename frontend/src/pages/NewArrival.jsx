import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
// import { products } from "@/utils/ProductData";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productSlice";

const NewArrivals = () => {
  const { products } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
    }
  });

  return (
    <div className="mx-10 flex flex-col gap-3 sm:mx-20">
      <h2 className="text-2xl uppercase text-shadow-md">
        Explore New Arrivals
      </h2>
      {/* <div className="container mx-auto text-center mb-10 relative "> */}
      {/* scroll  left and right */}
      {/* <div className="absolute right-0 flex space-x-1">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-white text-gray-400 cursor-not-allowed"
            } bg-white text-black`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-white text-gray-400 cursor-not-allowed"
            } bg-white text-black`}
          >
            {" "}
            <FiChevronRight className="text-2xl" />
          </button>
        </div> */}
      {/* </div> */}
      {/* scrollable content */}
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto">
        {products
          .filter((_, i) => i < 4)
          .map((product) => (
            <div key={product._id}>
              <Product key={product._id} product={product} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewArrivals;
