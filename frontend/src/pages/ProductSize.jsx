import React from 'react';

const SizeSelector = ({ sizes, selectedSize, onSizeSelect }) => {
  return (
    <div className="space-y-2 mt-2">
      <label className="font-semibold text-gray-800 text-sm">Select Size</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={`w-11 h-9 border text-sm font-medium 
              ${
                selectedSize === size
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800 border-gray-400'
              }
              transition duration-200`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;