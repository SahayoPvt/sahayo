import React from "react";

const PriceCard = ({ price }) => {
  return (
    <div className="flex justify-between gap-3 rounded bg-[#ffe5d7] px-4 py-2 shadow-md">
      <div>
        {price.styles.map((style, index) => (
          <p key={index}>{style}</p>
        ))}
      </div>
      <div className="my-auto">
        {price.price}
        /-<span className="text-xl text-red-500">*</span>
      </div>
    </div>
  );
};

export default PriceCard;
