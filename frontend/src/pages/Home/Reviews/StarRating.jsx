import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= 1) {
      stars.push(1);
      rating -= 1;
    } else if (rating > 0) {
      stars.push(rating);
      rating = 0;
    } else {
      stars.push(0);
    }
  }

  return (
    <div className="flex gap-1">
      {stars.map((star, index) => {
        return star === 1 ? (
          <IoStar key={index} className="text-yellow-500" />
        ) : star === 0 ? (
          <IoStarOutline key={index} className="text-yellow-500" />
        ) : (
          <IoStarHalf key={index} className="text-yellow-500" />
        );
      })}
    </div>
  );
};

export default StarRating;
