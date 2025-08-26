import React from "react";

const PriceCard = ({ price, selectedStyles }) => {
  const selectedStylesArray = Object.values(selectedStyles).filter(
    (style) => style !== "",
  );
  return (
    <div className="flex justify-between gap-3 rounded bg-[#ffe5d7] px-4 py-2 shadow-md">
      <div>
        <h3 className="text-lg font-semibold">Selected specifications</h3>
        {selectedStylesArray.map((style, index) => (
          <li key={index}>{style}</li>
        ))}
      </div>
      <div className="my-auto">
        Total Price: ₹{price.price}
        /-<span className="text-xl text-red-500">*</span>
      </div>
    </div>
  );
};

export default PriceCard;
