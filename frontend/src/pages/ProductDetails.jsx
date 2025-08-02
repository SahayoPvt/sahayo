import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Product from "./Product";
import { createReview, getProductDetails } from "../redux/productSlice";
import { addItemsToCart, removeErrors, removeMessage } from "../redux/cartSlice";
import { 
  Minus, 
  Plus, 
  ThumbsUp, 
  User, 
  Calendar, 
  Star, 
  MessageCircle,
  CheckCircle,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Send,
  Edit3
} from "lucide-react";
import SizeSelector from "./ProductSize";
import { AddToCart } from "../redux/newcartSlice";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    comment: ''
  });
  const [reviewErrors, setReviewErrors] = useState({});
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  
  const navigate = useNavigate();

  const {
    loading: cartLoading,
    error: cartError,
    success,
    message,
    cartItems,
  } = useSelector((state) => state.cart);

  const {cart,successs,messagess}=useSelector(state => state.newcart);

  
  
  // console.log("---success",successs);
  // console.log("---messagess",messagess);
  // console.log("---newcart",cart);


  // useEffect(()=>{
  //   dispatch(AddToCart({_id,quantity,size: selectedSize}));
    
  // },[])
  
  const { loading, error, product, products, reviewSuccess, reviewLoading } =
    useSelector((state) => state.product);

  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { _id } = useParams();
 
  

  useEffect(() => {
    if (_id) {
      dispatch(getProductDetails(_id));
    }
    return () => {
      dispatch(removeErrors());
    };
  }, [dispatch, _id]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (cartError) {
      toast.error(cartError, { position: "top-center", autoClose: 3000 });
    }
  }, [dispatch, error, cartError]);

  useEffect(() => {
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeMessage());
    }
  }, [dispatch, success, message]);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success("Review submitted successfully!", {
        position: "top-center",
        autoClose: 3000
      });
      // Refresh product details to show the new review
      dispatch(getProductDetails(_id));
      setShowReviewForm(false);
      setReviewFormData({ rating: 0, comment: '' });
      setReviewErrors({});
      setIsSubmittingReview(false);
    }
  }, [dispatch, reviewSuccess, _id]);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart", {
        position: "top-center",
      });
      navigate("/sign-in");
      return;
    }
    // dispatch(addItemsToCart({ _id, quantity, selectedSize }));
    
    // dispatch(AddToCart({_id:id, quantity:quantity,size: selectedSize}));
    // When adding to cart
dispatch(AddToCart({
  _id: _id,
  quantity: quantity,
  size: selectedSize
}));

  };

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Review form handlers
  const handleReviewRatingChange = (rating) => {
    setReviewFormData(prev => ({ ...prev, rating }));
    if (reviewErrors.rating) {
      setReviewErrors(prev => ({ ...prev, rating: '' }));
    }
  };

  const handleReviewCommentChange = (e) => {
    const comment = e.target.value;
    setReviewFormData(prev => ({ ...prev, comment }));
    if (reviewErrors.comment) {
      setReviewErrors(prev => ({ ...prev, comment: '' }));
    }
  };

  const validateReviewForm = () => {
    const errors = {};
    
    if (!reviewFormData.rating || reviewFormData.rating === 0) {
      errors.rating = 'Please select a rating';
    }
    
    if (!reviewFormData.comment.trim()) {
      errors.comment = 'Please write a comment';
    } else if (reviewFormData.comment.trim().length < 10) {
      errors.comment = 'Comment must be at least 10 characters long';
    }
    
    setReviewErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to submit a review", {
        position: "top-center",
      });
      navigate("/sign-in");
      return;
    }

    if (!validateReviewForm()) {
      return;
    }

    setIsSubmittingReview(true);
    try {
      await dispatch(createReview({
        rating: reviewFormData.rating,
        comment: reviewFormData.comment,
        productId: _id
      }));
    } catch (error) {
      toast.error("Failed to submit review. Please try again.", {
        position: "top-center",
      });
      setIsSubmittingReview(false);
    }
  };

  const renderInteractiveStars = (currentRating, onRatingChange, size = "w-6 h-6") => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => onRatingChange(index + 1)}
        className={`${size} transition-colors hover:scale-110 transform ${
          index < currentRating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 hover:text-yellow-300'
        }`}
      >
        <Star className="w-full h-full" />
      </button>
    ));
  };

  // Helper functions for reviews
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = (reviews) => {
    if (!reviews || reviews.length === 0) return {};
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      if (distribution[review.rating] !== undefined) {
        distribution[review.rating]++;
      }
    });
    return distribution;
  };

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const relatedProduct = products.filter(
    (p) =>
      p &&
      product &&
      p.category &&
      product.category &&
      p.category === product.category &&
      p._id !== product._id
  );
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Details Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <img
                  src={product?.image?.[selectedImageIndex]?.url || product?.image?.[0]?.url}
                  alt={product?.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product?.image && product.image.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Product Title & Category */}
              <div>
                <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                  {product?.category}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">
                  {product?.name}
                </h1>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {renderStarRating(Math.round(calculateAverageRating(product?.reviews || [])))}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {calculateAverageRating(product?.reviews || [])}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({product?.reviews?.length || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product?.currentprice}
                  </span>
                  {product?.originalprice && (
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalprice}
                    </span>
                  )}
                  {product?.discount && (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600 font-medium">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Size Selector */}
              {product?.sizes && (
                <div>
                  <SizeSelector
                    sizes={product.sizes}
                    selectedSize={selectedSize}
                    onSizeSelect={handleSizeSelect}
                  />
                </div>
              )}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={addToCart}
                  disabled={cartLoading}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{cartLoading ? "Adding to Cart..." : "Add to Cart"}</span>
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span>Free delivery on orders above ₹999</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                  <span>Easy 30-day returns</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-purple-600" />
                  <span>1-year warranty included</span>
                </div>
              </div>

              {/* Product Description */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Product Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
          {/* Reviews Header */}
          <div className="border-b border-gray-200 pb-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-2xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Write a Review
              </button>
            </div>
            
            {product?.reviews && product.reviews.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Rating Summary */}
                <div className="text-center lg:text-left">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {calculateAverageRating(product.reviews)}
                  </div>
                  <div className="flex justify-center lg:justify-start mb-2">
                    {renderStarRating(Math.round(calculateAverageRating(product.reviews)))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="lg:col-span-2">
                  {Object.entries(getRatingDistribution(product.reviews))
                    .reverse()
                    .map(([rating, count]) => {
                      const percentage = (count / product.reviews.length) * 100;
                      return (
                        <div key={rating} className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-700 w-8">
                            {rating}★
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>

          {/* Review Submission Form */}
          {showReviewForm && (
            <div className="bg-gray-50 rounded-2xl p-6  border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Write Your Review
              </h3>
              
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating *
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderInteractiveStars(reviewFormData.rating, handleReviewRatingChange)}
                    <span className="ml-2 text-sm text-gray-600">
                      {reviewFormData.rating > 0 && `${reviewFormData.rating}/5`}
                    </span>
                  </div>
                  {reviewErrors.rating && (
                    <p className="text-red-600 text-sm mt-1">{reviewErrors.rating}</p>
                  )}
                </div>

                {/* Comment Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewFormData.comment}
                    onChange={handleReviewCommentChange}
                    rows={4}
                    maxLength={500}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                      reviewErrors.comment ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Share your experience with this product..."
                  />
                  <div className="flex items-center justify-between mt-1">
                    {reviewErrors.comment && (
                      <p className="text-red-600 text-sm">{reviewErrors.comment}</p>
                    )}
                    <p className="text-sm text-gray-500 ml-auto">
                      {reviewFormData.comment.length}/500
                    </p>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmittingReview ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-0.5" />
                        Submit Review
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewFormData({ rating: 0, comment: '' });
                      setReviewErrors({});
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {product?.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div
                  key={review._id || index}
                  className="bg-gray-50 rounded-2xl px-4 py-2 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {review.name || 'Anonymous User'}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStarRating(review.rating)}
                          <span className="text-sm text-gray-600 ml-1">
                            {review.rating}/5
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {review.createdAt && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="mb-2">
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment || review.review || 'No comment provided'}
                    </p>
                  </div>

                  {/* Review Footer */}
                  <div className="flex items-center justify-between  border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      {review.verified && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    
                    <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !showReviewForm && (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 mx-auto text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No reviews yet
                </h3>
                <p className="mt-2 text-gray-600">
                  Be the first to share your thoughts about this product!
                </p>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="mt-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Write a Review
                </button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProduct.length > 0 && (
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {relatedProduct.map((product) => (
                <Product key={product?._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;