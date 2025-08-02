import { IoMdClose } from "react-icons/io";
import CartContent from "./CartContent";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { clearCartThunk } from "../redux/newcartslice";

const CartDrawer = ({ draweOpen, toggleCartDrawer }) => {
  const islogin = localStorage.getItem("isAuthenticated");
  const { totalPrice, cartItems } = useSelector((state) => state.newcart);
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate(`/shipping`);
    toggleCartDrawer();
  };
  const dispatch = useDispatch();
  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "Clear entire cart?",
      text: "This will remove all items.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(clearCartThunk()).unwrap();
        Swal.fire("Cleared!", "Your cart is now empty.", "success");
      } catch (error) {
        toast.error(error.message || "Failed to clear cart");
      }
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white transform transition-transform duration-300 flex flex-col z-50 border-l-sky-200 shadow-2xl ${
        draweOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="flex-grow px-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

        {islogin && <CartContent toggleCartDrawer={toggleCartDrawer} />}
      </div>

      {cartItems?.length && (
        <div className="p-3 bg-white sticky bottom-0">
          <div className="flex justify-between items-center mb-2 text-xl">
            <p className="font-semibold">Total Price</p>
            <div className="flex justify-center">
              ₹<h1>{totalPrice}</h1>
            </div>
          </div>
          <button
            className="w-full bg-black text-white py-3 rounded-lg font-semibold mb-2"
            onClick={handleCheckout}
          >
            ChecKout
          </button>
          <button
            className="w-full bg-black text-white py-3 rounded-lg font-semibold"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
