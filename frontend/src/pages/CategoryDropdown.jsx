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

  const { products } = useSelector((state) => state.product);

  const men = products.filter((item) => item.category === "Men");
  const women = products.filter((item) => item.category === "Women");
  const kid = products.filter((item) => item.category === "Kid");

  return (
    <div className="dropdown relative inline-flex">
      <button
        onClick={() => setitem(!item)}
        type="button"
        data-target="dropdown-default"
        className="dropdown-toggle group inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 font-medium text-gray-700 transition-all duration-300 hover:bg-blue-50 hover:text-blue-600"
      >
        <Tag className="h-4 w-4" />
        Categories
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            item ? "rotate-180" : ""
          }`}
        />
      </button>

      {item && (
        <div
          id="dropdown-default"
          className="dropdown-menu animate-in slide-in-from-top-2 absolute top-full left-0 mt-4 w-48 overflow-hidden rounded-b-xl border border-gray-100 bg-white shadow-xl duration-200"
          aria-labelledby="dropdown-default"
        >
          <div className="py-2">
            <Link
              to="/blouse"
              onClick={() => setitem(false)}
              className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <span className="font-medium">Blouse</span>
            </Link>
            <Link
              to="/kurti"
              onClick={() => setitem(false)}
              className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <span className="font-medium">Kurti</span>
            </Link>
            <Link
              to="/bottom"
              onClick={() => setitem(false)}
              className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <span className="font-medium">Bottom</span>
            </Link>
            <Link
              to="/kurti-set"
              onClick={() => setitem(false)}
              className="group flex items-center px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <div className="mr-3 h-2 w-2 rounded-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100"></div>
              <span className="font-medium">Kurti Set</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
