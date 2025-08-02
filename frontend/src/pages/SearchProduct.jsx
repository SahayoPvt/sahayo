



import React, { useEffect, useState } from "react";
// import { products } from "../utils/ProductData";
import { Link, useSearchParams } from "react-router";
import { HiMiniXMark } from "react-icons/hi2"; 
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productSlice";

const RECENT_KEY = "recentSearches";
 
const SearchProduct = () => {
  const { products }= useSelector(state=>state.product)
 console.log(products);
 
   const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch]) 
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [recentList, setRecentList] = useState([]);

  // Save recent search to localStorage
  useEffect(() => {
    if (query.trim() !== "") {
      const foundProduct = products.find(
        (p) =>
          p.Name.toLowerCase().includes(query.toLowerCase()) ||
          p.Category.toLowerCase().includes(query.toLowerCase())
      );
      if (foundProduct) {
        let recents = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
        recents = recents.filter((item) => item.Id !== foundProduct.Id);
        recents.unshift({
          Id: foundProduct.Id,
          Name: foundProduct.Name,
          Image: foundProduct.Image,
        });
        recents = recents.slice(0, 5);
        localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
        setRecentList(recents);
      }
    }
  }, [query, products]);

  // Load recent searches on mount
  useEffect(() => {
    const recents = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    setRecentList(recents);
  }, [query]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const filtered = products.filter(
        (p) =>
          p.Name.toLowerCase().includes(query.toLowerCase()) ||
          p.Category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }
  }, [query]);

  // Delete a recent search item
  const handleDeleteRecent = (id) => {
    const updated = recentList.filter((item) => item.Id !== id);
    setRecentList(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  return (
    <div className="mt-24 mx-auto px-3">
      {/* Top 5 Recent Searches */}
      {recentList.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4">
          <div className="text-gray-700 font-semibold mb-2 text-center">
            Recent Searches :
          </div>
          <div className="flex flex-wrap justify-start gap-3">
            {recentList.map((item) => (
              <div
                key={item.Id}
                className="flex items-center bg-gray-100 rounded px-3 py-1 hover:bg-gray-200 transition relative"
              >
                <Link
                  to={`/product/${item.Id}`}
                  className="flex items-center"
                >
                  <img
                    src={item.Image}
                    alt={item.Name}
                    className="w-6 h-6 object-cover rounded mr-2"
                  />
                  <span className="text-sm text-blue-700">{item.Name}</span>
                </Link>
                <button
                  className="ml-2 text-gray-400 hover:text-red-500"
                  onClick={() => handleDeleteRecent(item.Id)}
                  title="Remove"
                  type="button"
                >
                  <HiMiniXMark className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No product available.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {results.map((product) => (
            <div
              key={product.Id}
              className="bg-white flex flex-col rounded overflow-hidden cursor-pointer hover:scale-[1.01] transition-all"
            >
              <Link to={`/product/${product.Id}`} className="w-full">
                <img
                  src={product.Image}
                  alt={product.Name}
                  className="w-full object-cover object-top aspect-[230/307]"
                />
              </Link>
              <div className="mt-1 flex-1 flex flex-col">
                <h5 className="text-sm sm:text-base text-slate-900 line-clamp-2">
                  {product.Name}
                </h5>
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                  ₹{product.Price}
                </h6>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;