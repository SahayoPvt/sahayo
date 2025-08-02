import { useEffect, useState } from "react";
import React from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router";
import { MdKeyboardArrowLeft } from "react-icons/md";
// import { products } from "@/utils/ProductData";
import { MdArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productSlice";

const SearchBar = () => {


   const { products }= useSelector(state=>state.product) 
   const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch]) 
  const Navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter suggestions based on input
  const filteredSuggestions = searchTerm
    ? products.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   Navigate('/searchproduct?q=' + searchTerm);
  // //  setIsOpen(false);
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    Navigate("/searchproduct?q=" + searchTerm);
    setShowSuggestions(false);
  };
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300  ${
        isOpen ? "fixed top-0 left-0 w-full h-16 bg-white z-50 px-2" : "w-auto"
      }`}
      style={isOpen ? { boxShadow: "0 2px 8px rgba(0,0,0,0.08)" } : {}}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full h-full"
        >
          {/* Mobile back arrow icon */}
          <Link
            to="/"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 block md:hidden"
          >
            <MdArrowBack className="h-7 w-7" onClick={() => setIsOpen(false)} />
          </Link>
          {/* Desktop arrow icon (optional, keep if you want) */}
          <Link
            to="/"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 hidden md:block"
          >
            <MdKeyboardArrowLeft
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            />
          </Link>
          <div className="relative w-full max-w-xl mx-auto">
            {/* Magnifying glass icon on the left inside the input */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <HiMagnifyingGlass className="h-6 w-6" />
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm || ""}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              className="border bg-gray-50 pl-10 pr-12 py-2 focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
            </button>
            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow z-50 max-h-64 overflow-y-auto">
                {filteredSuggestions.map((suggestion, idx) => (
                  <Link
                    to={`/product/${suggestion._id}`}
                    className="w-full"
                    key={idx}
                  >
                    <li
                      className="flex items-center justify-start px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion.Name)}
                    >
                      <img
                        src={suggestion.image[0].url}
                        alt={suggestion.name}
                        className="w-8 h-8 object-cover rounded mr-3"
                      />
                      <span>{suggestion.name}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setIsOpen(false)}
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
  // ...existing code...
};

export default SearchBar;
