import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Loader,
  Pencil,
  Trash2,
  Search,
  Filter,
  Plus,
  Star,
  Package,
  Calendar,
  Eye,
  MoreVertical,
  TrendingUp,
  AlertTriangle,
  ChevronDown,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
  removeErrors,
  removeSuccess,
} from "../redux/admin/adminSlice";
import { toast } from "react-toastify";
import { MdDiscount } from "react-icons/md";

function ProductsList() {
  const { products, loading, error, deleting } = useSelector(
    (state) => state.admin
  );
  
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  const handleDelete = (productId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (isConfirmed) {
      dispatch(deleteProduct(productId)).then((action) => {
        if (action.type === "admin/deleteProduct/fulfilled") {
          toast.success("Product deleted successfully", {
            position: "top-center",
            autoClose: 3000,
          });
          dispatch(removeSuccess());
        }
      });
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getSortIcon = (field) => {
    if (sortBy !== field)
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  const filteredProducts =
    products?.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "currentprice":
        comparison = a.currentprice - b.currentprice;
        break;
      case "originalprice":
        comparison = a.originalprice - b.originalprice;
        break;
      case "discount":
        comparison = a.discount - b.discount;
        break;
      case "rating":
        comparison = a.ratings - b.ratings;
        break;
      case "stock":
        comparison = a.stock - b.stock;
        break;
      case "category":
        comparison = a.category.localeCompare(b.category);
        break;
      case "newarrivals":
        comparison = a.newarrivals.localeCompare(b.newarrivals);
        break;
      case "createdAt":
        comparison = new Date(a.createdAt) - new Date(b.createdAt);
        break;
      default:
        comparison = new Date(b.createdAt) - new Date(a.createdAt);
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const categories = [
    ...new Set(products?.map((product) => product.category) || []),
  ];

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStockStatus = (stock) => {
    if (stock === 0)
      return {
        label: "Out of Stock",
        color: "bg-red-100 text-red-800",
        dotColor: "bg-red-500",
      };
    if (stock < 10)
      return {
        label: "Low Stock",
        color: "bg-amber-100 text-amber-800",
        dotColor: "bg-amber-500",
      };
    return {
      label: "In Stock",
      color: "bg-emerald-100 text-emerald-800",
      dotColor: "bg-emerald-500",
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 space-y-4">
              {[...Array(8)].map((_, i) => (
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Package className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No Products Yet
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start building your inventory by adding your first product to the
              store.
            </p>
            <Link
              to="/admin/product/new"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Product
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 mt-22">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Product Management
              </h1>
              <p className="text-gray-600 text-lg">
                Manage and organize your product inventory
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-3 lg:mt-0">
              <Link
                to="/admin/product/create"
                className="inline-flex items-center px-3 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </Link>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Products
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {products.length}
                  </p>
                  <p className="text-sm text-emerald-600 font-medium mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    Active inventory
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Package className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    In Stock
                  </p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {products.filter((p) => p.stock > 0).length}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Available items
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <Package className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Low Stock
                  </p>
                  <p className="text-3xl font-bold text-amber-600">
                    {products.filter((p) => p.stock > 0 && p.stock < 10).length}
                  </p>
                  <p className="text-sm text-amber-600 font-medium mt-1">
                    Needs attention
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Out of Stock
                  </p>
                  <p className="text-3xl font-bold text-red-600">
                    {products.filter((p) => p.stock === 0).length}
                  </p>
                  <p className="text-sm text-red-600 font-medium mt-1">
                    Urgent restock
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-3 shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name, category, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-200 transition-all"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 focus:ring-2  min-w-[140px]"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-4 py-3 border border-gray-200 focus:ring-2 min-w-[100px]"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th
                    className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("category")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Category</span>
                      {getSortIcon("category")}
                    </div>
                  </th>
                  <th
                    className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("currentprice")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>CP</span>
                      {getSortIcon("currentprice")}
                    </div>
                  </th>
                  <th
                    className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("originalprice")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>SP</span>
                      {getSortIcon("originalprice")}
                    </div>
                  </th>
                  <th
                    className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("discount")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Discount</span>
                      {getSortIcon("discount")}
                    </div>
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors">
                    <div className="flex items-center space-x-1">
                      <span>newarrivals</span>
                    </div>
                  </th>
                  <th
                    className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("stock")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Stock</span>
                      {getSortIcon("stock")}
                    </div>
                  </th>
                  <th
                    className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("rating")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Rating</span>
                      {getSortIcon("rating")}
                    </div>
                  </th>

                  <th
                    className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSort("createdAt")}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Created</span>
                      {getSortIcon("createdAt")}
                    </div>
                  </th>
                  <th className="px-3 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedProducts.map((product) => {
                  const stockStatus = getStockStatus(product.stock);
                  const isDeleting = deleting[product._id];

                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 overflow-hidden flex-shrink-0 shadow-sm">
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
                            <p className="text-sm text-gray-500 truncate">
                              ID: {product._id.slice(-8)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-1">
                          {/* <DollarSign className="w-4 h-4 text-emerald-600" /> */}
                          <span className="font-semibold text-gray-900 text-sm">
                            ₹{product.currentprice}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-1">
                          {/* <DollarSign className="w-4 h-4 text-emerald-600" /> */}
                          <span className="font-semibold text-gray-900 text-sm">
                            ₹{product.originalprice}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-1">
                          <MdDiscount className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-gray-900 text-sm">
                            ₹{product.discount}%
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-2 justify-center">
                          {/* <div className={`w-2 h-2 rounded-full ${stockStatus.dotColor}`}></div> */}
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center px-1 py-1 rounded-full text-sm font-medium ${""}`}
                            >
                              {product.newarrivals}
                            </span>
                            {/* <p className='text-sm'>units</p> */}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-2 justify-center">
                          {/* <div className={`w-2 h-2 rounded-full ${stockStatus.dotColor}`}></div> */}
                          <div className="flex items-center">
                            <span
                              className={`inline-flex items-center px-1 py-1 rounded-full text-sm font-medium ${""}`}
                            >
                              {product.stock}
                            </span>
                            <p className="text-sm">units</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-gray-900">
                            {product.ratings}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="text-sm text-gray-600">
                          <div>
                            {new Date(product.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-400">
                            {new Date(product.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center">
                          <Link
                            to={`/admin/product/${product._id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product._id)}
                            disabled={isDeleting}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Product"
                          >
                            {isDeleting ? (
                              <Loader className="w-4 h-4 animate-spin text-red-900" />
                            ) : (
                              <Trash2 className="w-4 h-4 text-red-700" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-3 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(startIndex + itemsPerPage, sortedProducts.length)}{" "}
                  of {sortedProducts.length} products
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  <div className="flex items-center space-x-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum =
                        Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                        i;
                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "text-gray-600 bg-white border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State for Filtered Results */}
        {sortedProducts.length === 0 && (searchTerm || categoryFilter) && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No products found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any products matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setCurrentPage(1);
              }}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;
