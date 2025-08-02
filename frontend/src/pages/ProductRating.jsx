import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductRating = ({ ratings, count }) => {
  const fullStars = Math.floor(ratings);
  const halfStar = ratings - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
       <span className="font-semibold text-lg">
        {ratings.toFixed(1)}
      </span>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500 size-5" />
      ))}
      {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-500 size-5" />
      ))}
       <span className="font-semibold ">
        {count !== undefined && ` (${count} reviews)`}
      </span>
     
    </div>
  );
};

export default ProductRating;