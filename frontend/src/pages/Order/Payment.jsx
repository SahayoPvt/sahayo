import React, { useState } from "react";
import { useNavigate } from "react-router";

const Payment = () => {
  const [selectedPayMethod, setSelectedPayMethod] = useState();
  const isAddressSaved = true;
  const savedAddress = {
    deliveringTo: "Yash",
    deliveryAddress: "76, Vijay Nagar, Indore, M.P.",
  };

  const navigate = useNavigate();

  const handleNewAddress = () => {};

  const handleChangeAddress = () => {};

  return (
    <div className="mx-8 mt-24 flex flex-col gap-5">
      {/* Delivery */}
      {isAddressSaved && (
        <section className="">
          <p className="text-xl font-semibold">
            Delevering to {savedAddress?.deliveringTo}
          </p>
          <p>{savedAddress?.deliveryAddress}</p>
          <button
            onClick={handleChangeAddress}
            className="mt-2 w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-3 text-lg font-medium text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
          >
            Change Address
          </button>
        </section>
      )}

      {!isAddressSaved && (
        <section>
          <button
            onClick={handleNewAddress}
            className="w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-3 text-lg font-medium text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
          >
            Add New Address
          </button>
        </section>
      )}

      {/* Payment Method */}
      <section className="">
        <h2 className="text-xl uppercase text-shadow-md">Payment Method</h2>
        <button
          onClick={() => navigate("/order/success")}
          className="mt-2 w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-3 text-lg font-medium text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
        >
          Proceed To Pay
        </button>
      </section>
    </div>
  );
};

export default Payment;
