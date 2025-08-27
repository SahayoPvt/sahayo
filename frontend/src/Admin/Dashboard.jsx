import React, { useEffect } from "react";
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
  Youtube,
} from "lucide-react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts, fetchAllOrders } from "../redux/admin/adminslice";

function Dashboard() {
  const { products, orders, totalAmount } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const outOfStock = products.filter((product) => product.stock === 0).length;
  const inStock = products.filter((product) => product.stock > 0).length;
  const totalReviews = products.reduce(
    (acc, product) => acc + (product.reviews.length || 0),
    0,
  );

  return (
    <>
      <div className="flex overflow-y-auto bg-gray-100 p-0">
        {/* Sidebar */}
        <div className="fixed top-18 h-[calc(100vh-5px)] w-[270px] overflow-y-auto bg-blue-600 p-5 pb-[50px] text-white">
          <div className="mb-8 flex items-center gap-2 border-b border-white/10 pb-5 text-xl font-bold">
            <LayoutDashboard className="h-6 w-6" />
            Admin Dashboard
          </div>

          <nav className="flex flex-col gap-4">
            {/* Products Section */}
            <div className="flex flex-col gap-2">
              <h3 className="mb-1 text-xs tracking-wider text-white/70 uppercase">
                Products
              </h3>
              <Link
                to="/admin/products"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-white no-underline transition-all hover:translate-x-1 hover:bg-white/10"
              >
                <Package className="h-5 w-5" />
                All Products
              </Link>
              <Link
                to="/admin/product/create"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-white no-underline transition-all hover:translate-x-1 hover:bg-white/10"
              >
                <PackagePlus className="h-5 w-5" />
                Create Product
              </Link>
            </div>

            {/* Users Section */}
            <div className="flex flex-col gap-2">
              <h3 className="mb-1 text-xs tracking-wider text-white/70 uppercase">
                Users
              </h3>
              <Link
                to="/admin/users"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-white no-underline transition-all hover:translate-x-1 hover:bg-white/10"
              >
                <Users className="h-5 w-5" />
                All Users
              </Link>
            </div>

            {/* Orders Section */}
            <div className="flex flex-col gap-2">
              <h3 className="mb-1 text-xs tracking-wider text-white/70 uppercase">
                Orders
              </h3>
              <Link
                to="/admin/orders"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-white no-underline transition-all hover:translate-x-1 hover:bg-white/10"
              >
                <ShoppingCart className="h-5 w-5" />
                All Orders
              </Link>
            </div>

            {/* Reviews Section */}
            <div className="flex flex-col gap-2">
              <h3 className="mb-1 text-xs tracking-wider text-white/70 uppercase">
                Reviews
              </h3>
              <Link
                to="/admin/reviews"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-white no-underline transition-all hover:translate-x-1 hover:bg-white/10"
              >
                <Star className="h-5 w-5" />
                All Reviews
              </Link>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="mt-[60px] ml-[280px] flex-1 p-8">
          {/* Stats Grid */}
          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Total Products */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <Package className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="my-2 text-sm font-medium text-gray-500">
                Total Products
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-800">
                {totalProducts}
              </p>
            </div>

            {/* Total Orders */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <ShoppingCart className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="my-2 text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-800">
                {totalOrders}
              </p>
            </div>

            {/* Total Reviews */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <Star className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="my-2 text-sm font-medium text-gray-500">
                Total Reviews
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-800">
                {totalReviews}
              </p>
            </div>

            {/* Total Revenue */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <IndianRupee className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="my-2 text-sm font-medium text-gray-500">
                Total Revenue
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-800">
                {totalAmount}/-
              </p>
            </div>

            {/* Out of Stock */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <CircleAlert className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="my-2 text-sm font-medium text-gray-500">
                Out Of Stock
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-800">
                {outOfStock}
              </p>
            </div>

            {/* In Stock */}
            <div className="rounded-xl bg-white p-6 shadow-sm transition-transform hover:-translate-y-1">
              <CircleCheck className="mb-4 h-8 w-8 text-blue-500" />
              <h3 className="my-2 text-sm font-medium text-gray-500">
                In Stock
              </h3>
              <p className="mt-1 text-3xl font-semibold text-gray-800">
                {inStock}
              </p>
            </div>
          </div>

          {/* Social Stats */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Instagram */}
            <div className="rounded-xl bg-white p-8 text-center shadow-sm transition-transform hover:-translate-y-1">
              <Instagram className="mx-auto mb-4 h-9 w-9 text-[#E1306C]" />
              <h3 className="my-3 text-xl font-semibold text-gray-800">
                Instagram
              </h3>
              <p className="my-2 text-gray-500">123K Followers</p>
              <p className="my-2 text-gray-500">12 posts</p>
            </div>

            {/* LinkedIn */}
            <div className="rounded-xl bg-white p-8 text-center shadow-sm transition-transform hover:-translate-y-1">
              <Linkedin className="mx-auto mb-4 h-9 w-9 text-[#0077B5]" />
              <h3 className="my-3 text-xl font-semibold text-gray-800">
                LinkedIn
              </h3>
              <p className="my-2 text-gray-500">55K Followers</p>
              <p className="my-2 text-gray-500">6 posts</p>
            </div>

            {/* YouTube */}
            <div className="rounded-xl bg-white p-8 text-center shadow-sm transition-transform hover:-translate-y-1">
              <Youtube className="mx-auto mb-4 h-9 w-9 text-[#FF0000]" />
              <h3 className="my-3 text-xl font-semibold text-gray-800">
                YouTube
              </h3>
              <p className="my-2 text-gray-500">45K Followers</p>
              <p className="my-2 text-gray-500">500 posts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
