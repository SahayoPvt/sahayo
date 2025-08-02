
import { getAllMyOrders } from '../redux/orderSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import { 
  Package, Calendar, MapPin, Phone, User, CreditCard, Download, ShoppingBag, 
  ChevronRight, Search, Filter, Truck, CheckCircle, Clock, XCircle, 
  Star, ArrowLeft, MoreHorizontal, RefreshCw, MessageCircle, RotateCcw,
  Home, ChevronDown, Eye, AlertCircle
} from 'lucide-react';

const MyOrders = () => {
  const { orders, loading, error } = useSelector(state => state.order)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(getAllMyOrders());
  }, [dispatch, updateId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return {
          color: 'bg-green-50 text-green-700 border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        };
      case 'processing':
        return {
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: Clock,
          iconColor: 'text-blue-600'
        };
      case 'shipped':
        return {
          color: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: Truck,
          iconColor: 'text-purple-600'
        };
      case 'cancelled':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-600'
        };
    }
  };

  const getOrderProgress = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing': return 25;
      case 'shipped': return 75;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  const filteredOrders = orders?.filter(order => {
    const matchesSearch = order.orderItems?.some(item => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No orders yet</h2>
          <p className="text-gray-600 mb-8">Start exploring and add items to your cart to place your first order.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2 text-sm">
                <Home className="w-4 h-4 text-gray-400" />
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Account</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">My Orders</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MessageCircle className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">{orders.length} orders found</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by product name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Orders</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order, index) => {
            const { orderItems, shippingInfo, paymentInfo, _id, orderStatus, createdAt, totalPrice, taxPrice, shippingPrice, deliveredAt } = order;
            const statusConfig = getStatusConfig(orderStatus);
            const StatusIcon = statusConfig.icon;
            const progress = getOrderProgress(orderStatus);
            
            return (
              <div key={_id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="border-b bg-gray-50/50 px-6 py-4 rounded-t-xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">Order #{(index + 1).toString().padStart(6, '0')}</h3>
                        <p className="text-sm text-gray-600 mt-1">Placed on {formatDate(createdAt)}</p>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                        <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                        {orderStatus?.charAt(0).toUpperCase() + orderStatus?.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-gray-900">₹{totalPrice?.toLocaleString()}</span>
                      <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {orderStatus !== 'cancelled' && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Order Progress</span>
                        <span>{progress}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Order Items */}
                  <div className=" mb-6">
                    {orderItems?.map((item, itemIndex) => (
                      <div key={item._id || itemIndex} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-20 h-20 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                          <img 
                            src={item.image || 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg'} 
                            alt={item.name || 'Product'} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              e.target.src = 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg';
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{item.name || 'Product Name'}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Qty: {item.quantity || 1}</span>
                            <span>₹{item.price?.toLocaleString() || 0}</span>
                          </div>
                          {orderStatus === 'delivered' && (
                            <div className="flex items-center gap-4 mt-2">
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Rate & Review
                              </button>
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                                <RotateCcw className="w-3 h-3" />
                                Return
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ₹{((item.price * item.quantity) || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info & Order Summary Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Shipping Information */}
                    {shippingInfo && (
                      <div className="bg-blue-50 rounded-lg p-6">
                        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                          Delivery Address
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-900 font-medium">{shippingInfo.address}</p>
                          <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.country}</p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {shippingInfo.phoneNo}
                          </p>
                        </div>
                        {deliveredAt && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <p className="text-green-800 text-sm font-medium">
                              Delivered on {formatDate(deliveredAt)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Order Summary</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="text-gray-900">₹{(totalPrice - (taxPrice || 0) - (shippingPrice || 0)).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-gray-900">{shippingPrice ? `₹${shippingPrice.toLocaleString()}` : 'FREE'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span className="text-gray-900">₹{(taxPrice || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-300">
                          <span className="font-semibold text-gray-900">Total</span>
                          <span className="font-bold text-gray-900 text-lg">₹{totalPrice?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Truck className="w-4 h-4" />
                      Track Order
                    </button>
                    <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                    <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Get Help
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {filteredOrders.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors">
              Load More Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;