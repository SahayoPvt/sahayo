import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, ShoppingCart, User } from "lucide-react";

const Navlinks = () => {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [customDesignOpen, setCustomDesignOpen] = useState(false);

  // const closeModal = (e) => {
  //   if (categoryRef.current === e.target) {
  //     setCategoryOpen(false);
  //   }
  // };

  return (
    <div className="hidden gap-6 text-shadow-md lg:flex">
      <Link to={"/"}>Home</Link>
      <button
        className="relative flex cursor-pointer items-center gap-1 text-shadow-md"
        onClick={() => setCategoryOpen(!categoryOpen)}
      >
        Category
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            categoryOpen ? "rotate-180" : ""
          }`}
        />
        {categoryOpen && (
          <div className="absolute top-full left-1/2 mt-6 flex w-64 -translate-x-1/2 flex-col gap-1 overflow-hidden bg-white shadow-xl text-shadow-md *:px-3 *:py-2 *:hover:bg-[#FFDCDC]">
            <Link to={"/blouse"}>Blouse</Link>
            <Link to={"/kurti"}>Kurti</Link>
            <Link to={"/bottom"}>Bottom</Link>
            <Link to={"/kurti-set"}>Kurti Set</Link>
          </div>
        )}
      </button>
      <button
        className="relative flex cursor-pointer items-center gap-1 text-shadow-md"
        onClick={() => setCustomDesignOpen(!customDesignOpen)}
      >
        Custom Design
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            customDesignOpen ? "rotate-180" : ""
          }`}
        />
        {customDesignOpen && (
          <div className="absolute top-full left-1/2 mt-6 flex w-64 -translate-x-1/2 flex-col gap-1 overflow-hidden bg-white shadow-xl text-shadow-md *:px-3 *:py-2 *:hover:bg-[#FFDCDC]">
            <Link to={"/blouseCustomDesign"}>Blouse</Link>
            <Link to={"/kurtiCustomDesign"}>Kurti</Link>
            <Link to={"/bottomCustomDesign"}>Bottom</Link>
            <Link to={"/kurtiSetCustomDesign"}>Kurti Set</Link>
          </div>
        )}
      </button>
      <Link to={"about"}>About Us</Link>
      <Link to={"/contact"}>Contact</Link>
      <Link>Blog</Link>
    </div>
  );
};

export default Navlinks;
