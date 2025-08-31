import React from "react";
import { Link, useNavigate } from "react-router";

const OrderHistoryCard = ({ order, setShowProductReview }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 rounded-md border shadow-md">
      <section className="flex justify-between bg-gray-400/20 px-5 py-3">
        <div className="flex gap-5">
          <div className="flex flex-col">
            <span className="font-medium">ORDER PLACED</span>
            <span>{order.orderDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">ORDER TOTAL</span>
            <span>₹{order.orderTotal}/-</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">SHIP TO</span>
            <span>{order.orderTo}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">SHIP DATE</span>
            <span>{order.shipDate}</span>
          </div>
        </div>
        <div className="">
          <div className="">
            ORDER: <span className="font-medium">{order.orderId}</span>
          </div>
          <Link
            className="text-[#ff5c5c] hover:underline"
            to={"/order/details"}
          >
            View Order Details
          </Link>
        </div>
      </section>
      <section className="mx-10 my-2 flex items-center gap-5">
        <img
          className="h-20 w-20 object-cover object-top"
          src={order.orderImage}
          alt="orderImage"
        />
        <p>{order.orderDecription}</p>
      </section>
      <hr />
      <section className="mx-5 mb-4 flex items-center justify-between">
        <button className="">
          Order Status -{" "}
          <span className="font-medium">{order.orderStatus}</span>
        </button>
        <div className="flex gap-3">
          <button className="w-fit cursor-pointer rounded bg-[#ffc4c4] px-4 py-1 text-lg font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]">
            Track Order
          </button>
          <button
            onClick={() =>
              navigate("/order/alteration", {
                state: {
                  orderImage: order.orderImage,
                  orderDecription: order.orderDecription,
                  orderId: order.orderId,
                },
              })
            }
            className="w-fit cursor-pointer rounded bg-[#ffc4c4] px-4 py-1 text-lg font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
          >
            Alteration Request
          </button>
          <button
            onClick={() => setShowProductReview(true)}
            className="w-fit cursor-pointer rounded bg-[#ffc4c4] px-4 py-1 text-lg font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
          >
            Write a product review
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderHistoryCard;
