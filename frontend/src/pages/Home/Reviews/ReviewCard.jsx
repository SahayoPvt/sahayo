import { Star, StarHalf, UserRound } from "lucide-react";
import React from "react";
import StarRating from "./StarRating";

const ReviewCard = ({ userName, reviewNote, rating }) => {
  return (
    <div className="flex flex-col gap-3 rounded bg-[#ffe5d7] px-4 py-2 shadow-md">
      <section className="flex items-center gap-2">
        <div className="rounded-full bg-white p-2">
          <UserRound />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold">{userName}</span>
          <span className="flex">
            <StarRating rating={rating} />
          </span>
        </div>
      </section>
      <section>“{reviewNote}”</section>
    </div>
  );
};

export default ReviewCard;
