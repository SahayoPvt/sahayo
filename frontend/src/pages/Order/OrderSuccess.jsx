import { Mail } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";
import { FaRegQuestionCircle } from "react-icons/fa";
import giftImage from "../../assets/Gift.jpg";

const OrderSuccess = () => {
  const orderNum = "#SAH1234";
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 10);

  const navigate = useNavigate();

  return (
    <div className="mx-8 mt-24 flex flex-col gap-5">
      {/* Greetings/Success card */}
      <section className="flex items-center gap-20 bg-[#ffe5d7] p-5">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-medium">Thank You for Your Order!</h2>
          <p>
            Your payment has been successfully processed, and your order has
            been placed. Currently the order is under review and our team will
            call you back shortly. We're excited for you to receive your
            beautiful item!
          </p>

          <p>
            Order Number: <span className="font-medium">{orderNum}</span>
          </p>
          <p>
            Estimated Delivery:
            <span className="font-medium">
              {estimatedDelivery.toDateString()}
            </span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-fit cursor-pointer rounded bg-[#ffc4c4] px-4 py-1 text-lg font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/order/history")}
              className="w-fit cursor-pointer rounded bg-[#ffc4c4] px-4 py-1 text-lg font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
            >
              View Order History
            </button>
          </div>
        </div>
        <img
          src={giftImage}
          alt="giftImage"
          className="w-100 rounded-md object-cover"
        />
      </section>

      {/* Order Summary */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl uppercase text-shadow-md">Order Summary</h2>

        <div className="grid w-[60%] grid-cols-2 gap-10">
          <div className="flex flex-col font-medium">
            <span>Category Name</span>
            <span>Item</span>
            <span>Additional Description</span>
          </div>
          <div className="flex flex-col">
            <span>Blouse</span>
            <span>Regular Blouse With Padding and Lining</span>
            <span>Extra margin and slightly loose</span>
          </div>
        </div>
        <hr className="w-[60%]" />

        <div className="grid w-[60%] grid-cols-2 gap-10">
          <div className="flex flex-col font-medium">
            <span>Item Cost</span>
            <span>Delivery Charge</span>
            <span className="font-bold">Additional Description</span>
          </div>
          <div className="flex flex-col">
            <span>₹499/-</span>
            <span>Free</span>
            <span className="font-bold">₹499/-</span>
          </div>
        </div>
      </section>

      {/* Delivery Details */}
      <section className="flex flex-col gap-4">
        <h2 className="text-2xl uppercase text-shadow-md">Order Details</h2>
        <div className="">
          <p className="ml-3 text-lg font-medium">Shipping Address</p>
          <p className="ml-3 w-50">
            Tata Consultancy Services, Tigariya Badshah, Indore, 452001 M.P.
            INDIA
          </p>
        </div>
        <div className="">
          <p className="ml-3 text-lg font-medium">Estimated Delivery</p>
          <p className="ml-3">{estimatedDelivery.toDateString()}</p>
        </div>
      </section>

      <section className="flex gap-5">
        <button
          onClick={() => navigate("/contact")}
          className="flex cursor-pointer items-center gap-2 rounded bg-[#ffc4c4] px-3 py-1 font-medium shadow-md hover:bg-[#ffb5b5]"
        >
          <Mail size={20} />
          Contact Support
        </button>
        <button
          onClick={() => navigate("/faq")}
          className="flex cursor-pointer items-center gap-2 rounded bg-[#ffc4c4] px-3 py-1 font-medium shadow-md hover:bg-[#ffb5b5]"
        >
          <FaRegQuestionCircle className="text-xl" /> View FAQs
        </button>
      </section>
    </div>
  );
};

export default OrderSuccess;
