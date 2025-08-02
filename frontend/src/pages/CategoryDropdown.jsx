// import React, { useState } from "react";
// import { Link } from "react-router";

// const CategoryDropdown = () => {
//   const [item, setitem] = useState(false);
//   return (
//     <div className="dropdown relative inline-flex">
//       <button
//         onClick={() => setitem(!item)}
//         type="button"
//         data-target="dropdown-default"
//         className="dropdown-toggle inline-flex justify-center items-center gap-2 font-semibold text-gray-700 mt-2 cursor-pointer text-center transition-all duration-500"
//       >
//         Category
//       </button>
//       {item && (
//         <div
//           id="dropdown-default"
//           className="dropdown-menu rounded-xl shadow-lg bg-white absolute top-full  w-42  open"
//           aria-labelledby="dropdown-default"
//         >
//           <ul className="py-4">
//             <li>
//               <Link
//                 to="/mens"
//                 onClick={() => setitem(false)}
//                 className="block px-2 py-0.5 hover:bg-gray-100 text-gray-900 "
//               >
//                 {" "}
//                 Mens{" "}
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/womens"
//                 onClick={() => setitem(false)}
//                 className="block px-2 py-0.5 hover:bg-gray-100 text-gray-900 "
//               >
//                 {" "}
//                 Womens{" "}
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/kids"
//                 onClick={() => setitem(false)}
//                 className="block px-2 py-0.5 hover:bg-gray-100 text-gray-900 "
//               >
//                 {" "}
//                 Kids{" "}
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryDropdown;


import React, { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Tag } from "lucide-react";
import { useSelector } from "react-redux";

const CategoryDropdown = () => {
  const [item, setitem] = useState(false);

   const { products }= useSelector(state=>state.product)

   const men=products.filter(item=>item.category==="Men")
   const women=products.filter(item=>item.category==="Women")
   const kid=products.filter(item=>item.category==="Kid")
  
  
  return (
    <div className="dropdown relative inline-flex">
      <button
        onClick={() => setitem(!item)}
        type="button"
        data-target="dropdown-default"
        className="dropdown-toggle inline-flex justify-center items-center gap-2 font-medium text-gray-700 hover:text-blue-600 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 group"
      >
        <Tag className="w-4 h-4" />
        Categories
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${item ? 'rotate-180' : ''}`} />
      </button>
      
      {item && (
        <div
          id="dropdown-default"
          className="dropdown-menu rounded-xl shadow-xl bg-white absolute top-full left-0 w-48 mt-2 border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200"
          aria-labelledby="dropdown-default"
        >
          <div className="py-2">
            <Link
              to="/mens"
              onClick={() => setitem(false)}
              className="flex items-center px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all duration-200 group"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="font-medium">Men's Collection</span>
            </Link>
            <Link
              to="/womens"
              onClick={() => setitem(false)}
              className="flex items-center px-4 py-3 hover:bg-pink-50 text-gray-700 hover:text-pink-600 transition-all duration-200 group"
            >
              <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="font-medium">Women's Collection</span>
            </Link>
            <Link
              to="/kids"
              onClick={() => setitem(false)}
              className="flex items-center px-4 py-3 hover:bg-green-50 text-gray-700 hover:text-green-600 transition-all duration-200 group"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="font-medium">Kids Collection</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;