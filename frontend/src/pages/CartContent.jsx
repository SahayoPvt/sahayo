// import { removeItemFromCart } from "../redux/cartSlice";
// import React from "react";
// import { RiDeleteBin3Line } from "react-icons/ri";
// import { useSelector, useDispatch } from "react-redux";
//  import {
 
//    incrementQuantity,
//    decrementQuantity,
//  } from "../redux/cartSlice";
// import Swal from "sweetalert2/dist/sweetalert2.js";
// import toast from "react-hot-toast";
// const CartContent = ({ toggleCartDrawer }) => {

  
//   const dispatch = useDispatch();
//     const {loading,cart,successs,messagess}=useSelector(state => state.newcart);
//     console.log("cart--", cart);
    
//   const { isAuthenticated, user } = useSelector((state) => state.user);
//   console.log("user--", user );
  

//   const {loading:cartLoading,error:cartError,success,message,cartItems}=useSelector((state)=>state.cart);
   
//   const handleDelete = async (id) => {
//     const response = await Swal.fire({
//       title: "Are you sure , want to delete?",
//       // text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });
//     if (response.isConfirmed) {
//       Swal.fire({
//         title: "Done!",
//         text: "Item has been Deleted.",
//         icon: "success",
//       });
//       dispatch(removeItemFromCart(id));
//       toggleCartDrawer(false);
//     }
//   };


//   const handleDecrement = (product) => {
//     if (product.quantity <= 1) {
//       toast.error("Quantity cannot be less than 1", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       return;
//     }
//     dispatch(decrementQuantity(product.product_id));
//   };

//   const handleIncrement = (product) => {
//     if (product.quantity >= product.stock) {
//       toast.error("Cannot exceed available Stock!", {
//         position: "top-center",
//         autoClose: 3000,
//       });
//       return;
//     }
//     dispatch(incrementQuantity(product.product_id));
//   };

//   return (
//     <div>
//       {cart?.map((product) => (
//         <div
//           key={product.product_id}
//           className="flex items-center justify-between py-2 border-b "
//         >
//           <div className="flex items-start">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-16 h-16 mr-2"
//             />
//             <div>
//               <h3 className="text-sm font-semibold -mt-1">{product.name}</h3>
//               {/* <p className='text-gray-500 text-sm'>Size: {product.size} | Color: {product.color}</p> */}
//               <div className="flex items-center mt-2  ">
//                 <button
//                   className="border rounded px-2  font-medium"
//                    onClick={() => handleDecrement(product)}
//             // disabled={product.quantity <= 1}
//                 >
//                   -
//                 </button>
//                 <span className="mx-2">{product.quantity}</span>
//                 <button
//                   className="border rounded px-2  font-medium"
//                            onClick={() => handleIncrement(product)}
//                             // disabled={product.quantity >= product.stock}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-y-1 -mt-6">
//             <div className="flex  items-center">
//               ₹{" "}
//               <p className=" font-semibold  flex">
//                 {(product.quantity * product.price).toFixed(2)}
//               </p>
//             </div>
//             <button
//               className="flex justify-center  items-center gap-2"
//               onClick={() => handleDelete(product.product_id)}
//             >
//               <p className="bg-black px-2 text-white h-6 w-8">{product.size}</p>
//               <RiDeleteBin3Line />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CartContent;



// import { removeItemFromCart } from "../redux/cartSlice";
import React, { useEffect } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { 
  decrementQuantity,
  // incrementQuantity,
  // decrementQuantity,
  fetchUserCart,
  incrementQuantity,
  removeFromCart,
  // removeFromCart
} from "../redux/newcartslice"; // Update import path
import Swal from "sweetalert2/dist/sweetalert2.js";
import toast from "react-hot-toast";

const CartContent = ({ toggleCartDrawer }) => {
  const dispatch = useDispatch();
  
  // Use the new cart slice state
  const { loading,totalPrice, cartItems, error, success, message } = useSelector(state => state.newcart);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserCart());
    }
  }, [dispatch, isAuthenticated]);

  // const handleDelete = async (productId) => {
  //   const response = await Swal.fire({
  //     title: "Are you sure , want to delete?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   });
    
  //   if (response.isConfirmed) {
  //     try {
  //       await dispatch(removeFromCart(productId)).unwrap();
  //       Swal.fire({
  //         title: "Done!",
  //         text: "Item has been Deleted.",
  //         icon: "success",
  //       });
  //       toggleCartDrawer(false);
  //     } catch (error) {
  //       toast.error(error.message || "Failed to remove item");
  //     }
  //   }
  // };

const handleIncrement = (product) => {
  // if (product.quantity >= product.product.stock) {
  //   toast.error("Cannot exceed available Stock!", {
  //     position: "top-center",
  //     autoClose: 3000,
  //   });
  //   return;
  // }

  dispatch(incrementQuantity({
    productId: product.product._id,
  }));
};

const handleDelete = async (productId, size) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      await dispatch(removeFromCart({ productId, size })).unwrap();
      Swal.fire("Deleted!", "Item has been removed.", "success");
    } catch (err) {
      toast.error(err.message || "Failed to remove item");
    }
  }
};


const handleDecrement = (product) => {
  if (product.quantity <= 1) {
    toast.error("Quantity cannot be less than 1", {
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

  dispatch(decrementQuantity({
    productId: product.product._id,
  }));
};


  // const handleDecrement = (product) => {
  //   if (product.quantity <= 1) {
  //     toast.error("Quantity cannot be less than 1", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }
  //   dispatch(decrementQuantity({
  //     productId: product.product._id, // Updated to match new structure
  //     quantity: product.quantity - 1
  //   }));
  // };

  // const handleIncrement = (product) => {
  //   if (product.quantity >= product.product.stock) { // Updated to match new structure
  //     toast.error("Cannot exceed available Stock!", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }
  //   dispatch(incrementQuantity({
  //     productId: product.product._id, // Updated to match new structure
  //     quantity: product.quantity + 1
  //   }));
  // };

  // if (loading) {
  //   return <div className="p-4">Loading cart...</div>;
  // }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div className="p-4">Your cart is empty</div>;
  }

  return (
    <div>
      {cartItems?.map((item) => (
        <div
          key={item.product._id} // Updated to use product._id
          className="flex items-center justify-between py-2 border-b"
        >
          <div className="flex items-start">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 mr-2"
            />
            <div>
              <h3 className="text-sm font-semibold -mt-1">{item.name}</h3>
              <div className="flex items-center mt-2">
                <button
                  className="border rounded px-2 font-medium"
                  // onClick={() => handleDecrement(item)}
                    onClick={() => handleDecrement(item)}

                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="border rounded px-2 font-medium"
                  // onClick={() => handleIncrement(item)}
                    onClick={() => handleIncrement(item)}

                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-1 -mt-6">
            <div className="flex items-center">
              ₹{" "}
              <p className="font-semibold flex">
                {item.price}
              </p>
            </div>
            <button
              className="flex justify-center items-center gap-2"
              // onClick={() => handleDelete(item.product._id)} // Updated to use product._id
              onClick={() => handleDelete(item.product._id)}

            >
              <p className="bg-black px-2 text-white h-6 w-8">{item.size}</p>
              <RiDeleteBin3Line />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
