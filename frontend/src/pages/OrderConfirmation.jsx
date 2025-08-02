import React, { useEffect, useState } from "react";
import { MapPin, Package, CreditCard, Check, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/orderSlice";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { clearCart } from "../redux/cartSlice";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { shippingInfo, } = useSelector((state) => state.cart);
    const { loading,totalPrice, cartItems, error, success, message } = useSelector(state => state.newcart);
  
  console.log("item" ,cartItems);


   

 
  const tax = 5.0
  const delivery=0.0
  const total = Number(totalPrice)+Number(tax)

  const orderData={
         shippingInfo: {
          address: shippingInfo.address || '',
          city: shippingInfo.city || '',
          state: shippingInfo.state || '',
          country: shippingInfo.country || '',
          pinCode: shippingInfo.pinCode, 
          phoneNo: shippingInfo.phoneNo || ''
        },
        orderItems: cartItems.map(item => ({
          name: item.name || '',
          price: item.price || 0,
          quantity: item.quantity || 1,
          image: item.image || '',
          product: item.product_id || item._id || '' 
        })),
        paymentInfo: {
          id: `pay_${Math.random().toString(36).substr(2, 9)}`,
          status: "succeeded"
        },
        itemPrice: totalPrice,
        taxPrice: tax,
        totalPrice: total
      };




const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const result = await dispatch(createOrder(orderData)).unwrap();
    toast.success("Order placed successfully!");
   
  } catch (error) {
    // Show backend error
    toast.error(error?.message || "Order creation failed");
    console.log("Order creation failed:", error);
  }finally{
       setIsSubmitting(false);

  }
};
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h2>

      {/* Shipping Information Section */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Shipping Details</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-gray-700">{user?.name}</p>
              <p className="text-gray-600">{shippingInfo.address}</p>
              <p className="text-gray-600">
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.pinCode}
              
              </p>
              <p className="text-gray-600">{shippingInfo.country}</p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {shippingInfo.phoneNo}
              </p>
            </div>
          </div>
        </div>

   
    {/* Order Items */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Package className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Your Items</h3>
        </div>
        <div className=" rounded-lg overflow-hidden">
          {cartItems?.map((item, index) => (
            <div key={index} className="px-2 py-4 border-b last:border-b-0 flex items-start gap-4">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-18 object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80";
                }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">Size: {item.size || 'N/A'}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
               
              </div>
              <div className="text-right">
                {/* <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p> */}
                <p className="text-sm text-gray-500">₹{item.price.toFixed(2)} </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="">
        <div className="flex items-center gap-2 ">
          <CreditCard className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">Credit/Debit Card</p>
          <p className="text-sm text-gray-600 mt-1">Billing address same as shipping</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg ">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Items</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Delivery</span>
            <span>₹{delivery}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Marketplace Fee</span>
            <span>₹{tax}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-bold text-blue-600">₹{total}</span>
          </div>
        </div>
      </div>
     <button
        onClick={handleSubmit}
        disabled={isSubmitting }
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-md transition-colors ${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            Processing...
          </>
        ) : (
          <>
            <Check size={18} />
            Confirm and Place Order
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 mt-4 text-center">
        By placing your order, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default OrderConfirmation;