import React, { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import StarRating from "../Home/Reviews/StarRating";

const ProductReview = ({ setShowProductReview }) => {
  const [reviewComment, setReviewComment] = useState();
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowProductReview(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm select-none"
      ref={modalRef}
    >
      <div className="relative flex w-fit flex-col items-center gap-3 rounded-xl bg-[#FFF2EB] p-7 px-20">
        <IoClose
          onClick={() => setShowProductReview(false)}
          className="absolute top-2 right-2 cursor-pointer rounded-full text-4xl hover:bg-white/80"
        />

        <h2 className="text-2xl uppercase text-shadow-md">Product Review</h2>

        <StarRating rating={4} />
        <div className="flex flex-col items-center">
          <label htmlFor="reviewComment" className="text-xl font-medium">
            Write a Comment
          </label>
          <input
            type="text"
            placeholder="Write your experience with the product..."
            id="reviewComment"
            className="w-75 rounded border px-2 py-1"
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />
        </div>

        <label
          htmlFor="reviewImages"
          className="relative w-75 cursor-pointer rounded border py-10 text-center text-xl font-medium hover:bg-gray-50/50"
        >
          Upload Images
          <span className="absolute right-0 bottom-1 w-full text-xs font-normal text-gray-500">
            Supported formats PNG, JPG
          </span>
        </label>
        <input type="file" name="" id="reviewImages" className="hidden" />

        <button
          onClick={() => setShowProductReview(false)}
          type="button"
          className="w-fit cursor-pointer rounded-lg bg-[#ffc4c4] px-5 py-1 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProductReview;
