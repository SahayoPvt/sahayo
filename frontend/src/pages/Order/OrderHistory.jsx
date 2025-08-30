import React from "react";
import OrderHistoryCard from "./OrderHistoryCard";
import blouseImg from "../../assets/blouse.jpg";
import kurtiImg from "../../assets/Kurti.jpg";

const OrderHistory = () => {
  const date = new Date();
  const shipDate = new Date();
  shipDate.setDate(shipDate.getDate() + 10);

  const orders = [
    {
      orderId: "#SAH1234",
      orderDate: date.toDateString(),
      orderTotal: 499,
      orderTo: "Yash Singhal",
      shipDate: shipDate.toDateString(),
      orderDecription: "Designer Kurti",
      orderImage: blouseImg,
      orderStatus: "Delivered",
    },
    {
      orderId: "#SAH5678",
      orderDate: date.toDateString(),
      orderTotal: 799,
      orderTo: "Shivam Verma",
      shipDate: shipDate.toDateString(),
      orderDecription: "Designer Blouse",
      orderImage: kurtiImg,
      orderStatus: "Shipped",
    },
  ];

  return (
    <div className="mx-8 mt-24 flex flex-col gap-5">
      <h2 className="text-2xl uppercase text-shadow-md">Order History</h2>

      <section className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <OrderHistoryCard order={order} />
        ))}
      </section>
    </div>
  );
};

export default OrderHistory;
