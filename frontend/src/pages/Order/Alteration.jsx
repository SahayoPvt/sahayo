import React from "react";
import { useLocation } from "react-router";

const Alteration = () => {
  const location = useLocation();
  console.log(location);
  const { orderImage, orderDecription, orderId } = location.state;

  return (
    <div className="mx-8 mt-24">
      <h2 className="text-2xl uppercase text-shadow-md">Order Details</h2>
      <section className="flex flex-col gap-2">
        <div className="">
          ORDER: <span className="font-medium">{orderId}</span>
        </div>
        <div className="flex items-center gap-5">
          <img
            className="h-20 w-20 object-cover object-top"
            src={orderImage}
            alt="orderImage"
          />
          <p>{orderDecription}</p>
        </div>
      </section>
    </div>
  );
};

export default Alteration;
