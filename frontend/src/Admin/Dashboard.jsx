import React, { useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PackagePlus,
  Users,
  ShoppingCart,
  Star,
  IndianRupee,
  CircleAlert,
  CircleCheck,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, fetchAllOrders } from '../redux/admin/adminslice';

function Dashboard() {
  const { products, orders, totalAmount } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter(product => product.stock === 0).length;
  const inStock = products.filter(product => product.stock > 0).length;
  const totalReviews = products.reduce((acc, product) => acc + (product.reviews.length || 0), 0);

  return (
    <>
      <div className="flex bg-gray-100 overflow-y-auto p-0">
        {/* Sidebar */}
        <div className="w-[270px] bg-blue-600 text-white p-5 pb-[50px] fixed top-[60px] h-[calc(100vh-5px)] overflow-y-auto">
          <div className="flex items-center gap-2 text-xl font-bold mb-8 pb-5 border-b border-white/10">
            <LayoutDashboard className="w-6 h-6" />
            Admin Dashboard
          </div>
          
          <nav className="flex flex-col gap-4">
            {/* Products Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-white/70 text-xs uppercase tracking-wider mb-1">Products</h3>
              <Link 
                to="/admin/products" 
                className="text-white no-underline py-3 px-4 rounded-lg transition-all flex items-center gap-3 hover:bg-white/10 hover:translate-x-1"
              >
                <Package className="w-5 h-5" />
                All Products
              </Link>
              <Link 
                to="/admin/product/create" 
                className="text-white no-underline py-3 px-4 rounded-lg transition-all flex items-center gap-3 hover:bg-white/10 hover:translate-x-1"
              >
                <PackagePlus className="w-5 h-5" />
                Create Product
              </Link>
            </div>

            {/* Users Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-white/70 text-xs uppercase tracking-wider mb-1">Users</h3>
              <Link 
                to="/admin/users" 
                className="text-white no-underline py-3 px-4 rounded-lg transition-all flex items-center gap-3 hover:bg-white/10 hover:translate-x-1"
              >
                <Users className="w-5 h-5" />
                All Users
              </Link>
            </div>

            {/* Orders Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-white/70 text-xs uppercase tracking-wider mb-1">Orders</h3>
              <Link 
                to="/admin/orders" 
                className="text-white no-underline py-3 px-4 rounded-lg transition-all flex items-center gap-3 hover:bg-white/10 hover:translate-x-1"
              >
                <ShoppingCart className="w-5 h-5" />
                All Orders
              </Link>
            </div>

            {/* Reviews Section */}
            <div className="flex flex-col gap-2">
              <h3 className="text-white/70 text-xs uppercase tracking-wider mb-1">Reviews</h3>
              <Link 
                to="/admin/reviews" 
                className="text-white no-underline py-3 px-4 rounded-lg transition-all flex items-center gap-3 hover:bg-white/10 hover:translate-x-1"
              >
                <Star className="w-5 h-5" />
                All Reviews
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 ml-[280px] mt-[60px]">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Total Products */}
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform hover:-translate-y-1">
              <Package className="text-blue-500 w-8 h-8 mb-4" />
              <h3 className="text-gray-500 text-sm font-medium my-2">Total Products</h3>
              <p className="text-3xl font-semibold text-gray-800 mt-1">{totalProducts}</p>
            </div>

            {/* Total Orders */}
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform hover:-translate-y-1">
              <ShoppingCart className="text-blue-500 w-8 h-8 mb-4" />
              <h3 className="text-gray-500 text-sm font-medium my-2">Total Orders</h3>
              <p className="text-3xl font-semibold text-gray-800 mt-1">{totalOrders}</p>
            </div>

            {/* Total Reviews */}
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform hover:-translate-y-1">
              <Star className="text-blue-500 w-8 h-8 mb-4" />
              <h3 className="text-gray-500 text-sm font-medium my-2">Total Reviews</h3>
              <p className="text-3xl font-semibold text-gray-800 mt-1">{totalReviews}</p>
            </div>

            {/* Total Revenue */}
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform hover:-translate-y-1">
              <IndianRupee className="text-blue-500 w-8 h-8 mb-4" />
              <h3 className="text-gray-500 text-sm font-medium my-2">Total Revenue</h3>
              <p className="text-3xl font-semibold text-gray-800 mt-1">{totalAmount}/-</p>
            </div>

            {/* Out of Stock */}
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform hover:-translate-y-1">
              <CircleAlert className="text-blue-500 w-8 h-8 mb-4" />
              <h3 className="text-gray-500 text-sm font-medium my-2">Out Of Stock</h3>
              <p className="text-3xl font-semibold text-gray-800 mt-1">{outOfStock}</p>
            </div>

            {/* In Stock */}
            <div className="bg-white p-6 rounded-xl shadow-sm transition-transform hover:-translate-y-1">
              <CircleCheck className="text-blue-500 w-8 h-8 mb-4" />
              <h3 className="text-gray-500 text-sm font-medium my-2">In Stock</h3>
              <p className="text-3xl font-semibold text-gray-800 mt-1">{inStock}</p>
            </div>
          </div>

          {/* Social Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Instagram */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center transition-transform hover:-translate-y-1">
              <Instagram className="text-[#E1306C] w-9 h-9 mb-4 mx-auto" />
              <h3 className="text-gray-800 text-xl font-semibold my-3">Instagram</h3>
              <p className="text-gray-500 my-2">123K Followers</p>
              <p className="text-gray-500 my-2">12 posts</p>
            </div>

            {/* LinkedIn */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center transition-transform hover:-translate-y-1">
              <Linkedin className="text-[#0077B5] w-9 h-9 mb-4 mx-auto" />
              <h3 className="text-gray-800 text-xl font-semibold my-3">LinkedIn</h3>
              <p className="text-gray-500 my-2">55K Followers</p>
              <p className="text-gray-500 my-2">6 posts</p>
            </div>

            {/* YouTube */}
            <div className="bg-white p-8 rounded-xl shadow-sm text-center transition-transform hover:-translate-y-1">
              <Youtube className="text-[#FF0000] w-9 h-9 mb-4 mx-auto" />
              <h3 className="text-gray-800 text-xl font-semibold my-3">YouTube</h3>
              <p className="text-gray-500 my-2">45K Followers</p>
              <p className="text-gray-500 my-2">500 posts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;