import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import Product from "./Product";
import { createReview, getProductDetails } from "../redux/productSlice";
import { removeErrors } from "../redux/cartSlice";
import {
  Star,
  MessageCircle,
  Truck,
  Shield,
  RotateCcw,
  Send,
  Edit3,
} from "lucide-react";
import Product from "../pages/Product";
import ReviewCard from "../pages/Home/Reviews/ReviewCard";

const ProductDetails = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { loading, error, product, products, reviewSuccess, reviewLoading } =
    useSelector((state) => state.product);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { _id } = useParams();

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "fill-current text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  // Helper functions for reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const relatedProduct = products.filter(
    (p) =>
      p &&
      product &&
      p.category &&
      product.category &&
      p.category === product.category &&
      p._id !== product._id,
  );

  const getRatingDistribution = (reviews) => {
    if (!reviews || reviews.length === 0) return {};
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  useEffect(() => {
    if (_id) {
      dispatch(getProductDetails(_id));
    }
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, _id]);

  return (
    <div className="mt-24 flex flex-col gap-5">
      {/* Product Details Section */}
      <section className="flex">
        {/* Product Images */}
        <div className="flex w-1/2 flex-col items-center gap-5">
          <img
            src={
              product?.image?.[selectedImageIndex]?.url ||
              product?.image?.[0]?.url
            }
            alt={product?.name}
            className="aspect-square w-[70%] rounded-2xl object-cover transition-transform duration-300 hover:scale-104"
          />
          {product?.image && product.image.length > 1 && (
            <div className="flex gap-3">
              {product.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className="h-20 w-20 cursor-pointer transition-all"
                >
                  <img
                    src={img.url}
                    alt={`${product.name} ${index + 1}`}
                    className={`h-full w-full rounded-lg border-2 object-cover ${
                      selectedImageIndex === index
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex w-1/2 flex-col gap-4">
          {/* Product Title & Category */}
          <div>
            <p className="text-sm uppercase">{product?.category}</p>
            <h2 className="text-3xl font-bold">{product?.name}</h2>

            {/* Rating Need to change this*/}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {renderStarRating(
                  Math.round(calculateAverageRating(product?.reviews || [])),
                )}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {calculateAverageRating(product?.reviews || [])}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                ({product?.reviews?.length || 0} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product?.currentprice}
              </span>
              {product?.originalprice && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.originalprice}
                </span>
              )}
              {product?.discount && (
                <span className="rounded bg-green-200 px-3 py-px text-sm font-medium">
                  {product.discount}% Off
                </span>
              )}
            </div>
            <p className="text-sm font-medium">Inclusive of all taxes</p>
          </div>

          <hr className="w-[90%]" />

          {/* Features */}
          <div className="">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Truck className="h-5 w-5 text-green-600" />
              <span>Free delivery on orders above ₹999</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RotateCcw className="h-5 w-5 text-blue-600" />
              <span>Easy 30-day returns</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Shield className="h-5 w-5 text-purple-600" />
              <span>Some Feature</span>
            </div>
          </div>

          <hr className="w-[90%]" />

          {/* Description */}
          <div className="">
            <h3 className="text-lg font-semibold text-gray-900">
              Item Description
            </h3>
            <p className="text-gray-600">{product?.description}</p>
          </div>

          <button
            onClick={() => navigate("/blouseCustomDesign")}
            className="w-[90%] cursor-pointer rounded-lg bg-[#ffc4c4] py-1.5 text-xl font-semibold text-gray-800 shadow-md transition-colors hover:bg-[#ffb5b5]"
          >
            Customize Now
          </button>
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        {/* Reviews Section */}
        <div className="mt-8">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Reviews Header */}
            <div className="mb-8 border-b border-gray-200 pb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl uppercase text-shadow-md">
                  Customer Reviews
                </h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="inline-flex cursor-pointer items-center rounded-lg bg-[#ffc4c4] px-4 py-2 transition-colors hover:bg-[#ffb5b5]"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Write a Review
                </button>
              </div>

              {product?.reviews && product.reviews.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                  {/* Rating Summary */}
                  <div className="text-center lg:text-left">
                    <div className="mb-2 text-4xl font-bold text-gray-900">
                      {calculateAverageRating(product.reviews)}
                    </div>
                    <div className="mb-2 flex justify-center lg:justify-start">
                      {renderStarRating(
                        Math.round(calculateAverageRating(product.reviews)),
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      Based on {product.reviews.length} review
                      {product.reviews.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="lg:col-span-2">
                    {Object.entries(getRatingDistribution(product.reviews))
                      .reverse()
                      .map(([rating, count]) => {
                        const percentage =
                          (count / product.reviews.length) * 100;
                        return (
                          <div
                            key={rating}
                            className="mb-2 flex items-center gap-3"
                          >
                            <span className="w-8 text-sm font-medium text-gray-700">
                              {rating}★
                            </span>
                            <div className="h-2 flex-1 rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-yellow-400 transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-8 text-sm text-gray-600">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-gray-600">
                    No reviews yet. Be the first to review!
                  </p>
                </div>
              )}
            </div>

            {/* Review Submission Form -- *****NEED TO CHANGE IT***** */}
            {showReviewForm && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Write Your Review
                </h3>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  {/* Rating Selection */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Your Rating *
                    </label>
                    <div className="flex items-center space-x-1">
                      {renderInteractiveStars(
                        reviewFormData.rating,
                        handleReviewRatingChange,
                      )}
                      <span className="ml-2 text-sm text-gray-600">
                        {reviewFormData.rating > 0 &&
                          `${reviewFormData.rating}/5`}
                      </span>
                    </div>
                    {reviewErrors.rating && (
                      <p className="mt-1 text-sm text-red-600">
                        {reviewErrors.rating}
                      </p>
                    )}
                  </div>

                  {/* Comment Input */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Your Review *
                    </label>
                    <textarea
                      value={reviewFormData.comment}
                      onChange={handleReviewCommentChange}
                      rows={4}
                      maxLength={500}
                      className={`w-full resize-none rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        reviewErrors.comment
                          ? "border-red-300 bg-red-50"
                          : "border-gray-300"
                      }`}
                      placeholder="Share your experience with this product..."
                    />
                    <div className="mt-1 flex items-center justify-between">
                      {reviewErrors.comment && (
                        <p className="text-sm text-red-600">
                          {reviewErrors.comment}
                        </p>
                      )}
                      <p className="ml-auto text-sm text-gray-500">
                        {reviewFormData.comment.length}/500
                      </p>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center space-x-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmittingReview ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-0.5 h-4 w-4" />
                          Submit Review
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setReviewFormData({ rating: 0, comment: "" });
                        setReviewErrors({});
                      }}
                      className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            {product?.reviews && product.reviews.length > 0 ? (
              <section className="flex flex-col gap-3">
                {product?.reviews.map((review) => (
                  <ReviewCard
                    userName={review.name}
                    rating={review.rating}
                    reviewNote={review.comment}
                  />
                ))}
              </section>
            ) : (
              !showReviewForm && (
                <div className="py-12 text-center">
                  <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No reviews yet
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Be the first to share your thoughts about this product!
                  </p>
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Write a Review
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section>
        {relatedProduct.length > 0 && (
          <div className="mx-10 flex flex-col gap-3">
            <h2 className="text-2xl uppercase text-shadow-md">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {relatedProduct.map((product) => (
                <Product key={product?._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetails;
