import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = () => {
  const reviews = [
    {
      userName: "Yash",
      rating: 4.6,
      reviewNote:
        "“loremLorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem est tenetur aliquid iusto nesciunt voluptatem! Minus, non molestiae! Sequi quos maxime dicta laudantium porro quo repudiandae dolores tempora amet qui!”",
    },
    {
      userName: "Shivam",
      rating: 4,
      reviewNote:
        "loremLorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem est tenetur aliquid iusto nesciunt voluptatem! Minus, non molestiae! Sequi quos maxime dicta laudantium porro quo repudiandae dolores tempora amet qui!",
    },
    {
      userName: "Divyansh",
      rating: 4.5,
      reviewNote:
        "“loremLorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem est tenetur aliquid iusto nesciunt voluptatem! Minus, non molestiae! Sequi quos maxime dicta laudantium porro quo repudiandae dolores tempora amet qui!”",
    },
  ];
  return (
    <div className="mx-8 flex flex-col gap-3 sm:mx-20">
      <h2 className="text-2xl uppercase text-shadow-md">Reviews</h2>
      <section className="flex flex-col gap-3">
        {reviews.map((review) => (
          <ReviewCard
            userName={review.userName}
            rating={review.rating}
            reviewNote={review.reviewNote}
          />
        ))}
      </section>
    </div>
  );
};

export default Reviews;
