import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessage,
  deleteReview,
  fetchAdminProducts,
  fetchProductReviews,
  removeErrors,
  removeSuccess,
} from "../redux/admin/adminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  Trash2,
  Star,
  Loader,
  MessageSquare,
  Package,
  User,
  Calendar,
  Eye,
  X,
  AlertTriangle,
  Search,
  Filter,
  ArrowLeft,
  TrendingUp,
  BarChart3,
  Users,
  StarHalf,
} from "lucide-react";

function ReviewsList() {
  const { products, loading, error, reviews, success, message, deleting } =
    useSelector((state) => state.admin);

  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleViewReviews = (productId, productName) => {
    setSelectedProduct(productId);
    setSelectedProductName(productName);
    setShowReviewsModal(true);
    dispatch(fetchProductReviews(productId));
  };

  const handleDeleteReview = (productId, reviewId) => {
    dispatch(deleteReview({ productId, reviewId }));
    setDeleteConfirm(null);
  };

  const closeReviewsModal = () => {
    setShowReviewsModal(false);
    setSelectedProduct(null);
    setSelectedProductName("");
    setSearchTerm("");
    setRatingFilter("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success(message, { position: "top-center", autoClose: 3000 });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      // Refresh reviews after deletion
      if (selectedProduct) {
        dispatch(fetchProductReviews(selectedProduct));
      }
    }
  }, [dispatch, error, success, message, selectedProduct]);

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const filteredReviews =
    reviews?.filter((review) => {
      const matchesRating =
        !ratingFilter || review.rating.toString() === ratingFilter;
      return matchesRating;
    }) || [];

  const getAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    if (!reviews || reviews.length === 0) return {};
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      distribution[review.rating] = (distribution[review.rating] || 0) + 1;
    });
    return distribution;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (loading && !products) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 space-y-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 animate-pulse"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                  <div className="w-20 h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <MessageSquare className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Products Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              There are no products available to manage reviews for at the
              moment.
            </p>
            <button
              onClick={() => navigate("/admin/products")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Package className="w-5 h-5 mr-2" />
              Manage Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Reviews Management
              </h1>
              <p className="text-gray-600 text-lg">
                Monitor and manage customer reviews across all products
              </p>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {products.length}
                  </p>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    <Package className="w-3 h-3 inline mr-1" />
                    With reviews
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Package className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Reviews
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {products.reduce(
                      (sum, product) => sum + product.numOfReviews,
                      0
                    )}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">
                    Customer feedback
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Avg Rating
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {products.length > 0
                      ? (
                          products.reduce(
                            (sum, product) => sum + product.ratings,
                            0
                          ) / products.length
                        ).toFixed(1)
                      : "0.0"}
                  </p>
                  <p className="text-xs text-yellow-600 font-medium mt-1">
                    Overall score
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center">
                  <Star className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Products with Reviews
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {
                      products.filter((product) => product.numOfReviews > 0)
                        .length
                    }
                  </p>
                  <p className="text-xs text-purple-600 font-medium mt-1">
                    Active feedback
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200  transition-all"
              />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Reviews
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                          <img
                            src={product.image[0]?.url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                            {product.name}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">
                            ID: {product._id.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {renderStars(Math.round(product.ratings))}
                        </div>
                        <span className="font-semibold text-gray-900">
                          {product.ratings}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-900">
                          {product.numOfReviews}
                        </span>
                        <span className="text-sm text-gray-500">reviews</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.numOfReviews > 0 ? (
                        <button
                          onClick={() =>
                            handleViewReviews(product._id, product.name)
                          }
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Reviews
                        </button>
                      ) : (
                        <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-500 font-medium rounded-xl">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          No Reviews
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reviews Modal */}
        {showReviewsModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-3xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Product Reviews
                    </h2>
                    <p className="text-gray-600 mt-1">{selectedProductName}</p>
                  </div>
                  <button
                    onClick={closeReviewsModal}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Loader className="w-8 h-8 text-white animate-spin" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Loading Reviews
                    </h3>
                    <p className="text-gray-600">
                      Please wait while we fetch the reviews...
                    </p>
                  </div>
                ) : reviews && reviews.length > 0 ? (
                  <>
                    {/* Reviews Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              Average Rating
                            </p>
                            <p className="text-3xl font-bold text-blue-600">
                              {getAverageRating()}
                            </p>
                            <div className="flex items-center mt-2">
                              {renderStars(Math.round(getAverageRating()))}
                            </div>
                          </div>
                          <Star className="w-12 h-12 text-blue-600" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              Total Reviews
                            </p>
                            <p className="text-3xl font-bold text-emerald-600">
                              {reviews.length}
                            </p>
                            <p className="text-xs text-emerald-600 font-medium mt-2">
                              Customer feedback
                            </p>
                          </div>
                          <MessageSquare className="w-12 h-12 text-emerald-600" />
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">
                              5-Star Reviews
                            </p>
                            <p className="text-3xl font-bold text-purple-600">
                              {getRatingDistribution()[5] || 0}
                            </p>
                            <p className="text-xs text-purple-600 font-medium mt-2">
                              Excellent ratings
                            </p>
                          </div>
                          <TrendingUp className="w-12 h-12 text-purple-600" />
                        </div>
                      </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                      <div className="flex items-center space-x-4">
                        <Filter className="w-5 h-5 text-gray-400" />
                        <select
                          value={ratingFilter}
                          onChange={(e) => setRatingFilter(e.target.value)}
                          className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">All Ratings</option>
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {filteredReviews.map((review) => (
                        <div
                          key={review._id}
                          className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900">
                                    {review.name}
                                  </h4>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <div className="flex items-center">
                                      {renderStars(review.rating)}
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">
                                      {review.rating}/5
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700 leading-relaxed mb-3">
                                {review.comment}
                              </p>
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(
                                  review.createdAt || Date.now()
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            <button
                              onClick={() => setDeleteConfirm(review._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-4"
                              title="Delete Review"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquare className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      No Reviews Yet
                    </h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      This product hasn't received any customer reviews yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all">
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Delete Review
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Are you sure you want to delete this review? This action
                  cannot be undone and will permanently remove the customer's
                  feedback.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteReview(selectedProduct, deleteConfirm)
                    }
                    className="flex-1 px-6 py-3 bg-red-600 text-white hover:bg-red-700 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center font-medium"
                  >
                   
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewsList;
