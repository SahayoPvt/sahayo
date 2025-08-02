// import React, { useEffect, useState } from 'react';
// import { Loader2, Package, CheckCircle, XCircle, Truck, Clock, ChevronDown, ChevronUp } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllOrders } from './../redux/admin/adminSlice';

// const OrderList = () => {
// //   const [loading, setLoading] = useState(true);
//   const [expandedRows, setExpandedRows] = useState([]);
// const {orders ,erorr ,loading}=useSelector(state=>state.admin)

// console.log("oo",orders);

// const dispatch=useDispatch()
// useEffect(()=>{

//     dispatch(fetchAllOrders())
// },[dispatch])

//   const toggleRow = (orderId) => {
//     setExpandedRows((prev) =>
//       prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
//     );
//   };

//   const getStatusIcon = (status) => {
//     const base = 'inline-block mr-1';
//     switch (status) {
//       case 'Delivered':
//         return <CheckCircle className={`${base} text-green-500`} size={16} />;
//       case 'Shipped':
//         return <Truck className={`${base} text-blue-500`} size={16} />;
//       case 'Processing':
//         return <Clock className={`${base} text-yellow-500`} size={16} />;
//       case 'Cancelled':
//         return <XCircle className={`${base} text-red-500`} size={16} />;
//       default:
//         return <Package className={`${base} text-gray-500`} size={16} />;
//     }
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="animate-spin text-blue-500" size={32} />
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <Package className="mx-auto text-gray-400" size={48} />
//         <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-8 lg:p-16 bg-white rounded shadow mt-12">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Order List</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm border border-gray-200">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="px-4 py-2 border">#Order ID</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Items</th>
//               <th className="px-4 py-2 border">Total</th>
//               <th className="px-4 py-2 border">Shipping</th>
//               <th className="px-4 py-2 border">Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <React.Fragment key={order._id}>
//                 <tr className="hover:bg-gray-50">
//                   <td className="px-4 py-2 border">{order._id}</td>
//                   <td className="px-4 py-2 border">{formatDate(order.createdAt)}</td>
//                   <td className="px-4 py-2 border">
//                     <span className="flex items-center">
//                       {getStatusIcon(order.orderStatus)}
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td className="px-4 py-2 border">{order.orderItems.length}</td>
//                   <td className="px-4 py-2 border font-medium">₹{order.totalPrice.toFixed(2)}</td>
//                   <td className="px-4 py-2 border">{order.shippingInfo.city}</td>
//                   <td className="px-4 py-2 border text-center">
//                     <button
//                       onClick={() => toggleRow(order._id)}
//                       className="text-blue-600 hover:underline flex items-center justify-center"
//                     >
//                       {expandedRows.includes(order._id) ? (
//                         <ChevronUp size={16} />
//                       ) : (
//                         <ChevronDown size={16} />
//                       )}
//                     </button>
//                   </td>
//                 </tr>

//                 {expandedRows.includes(order._id) && (
//                   <tr className="bg-gray-50">
//                     <td colSpan={7} className="p-4 border-t text-sm">
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <h4 className="font-semibold mb-2">Items</h4>
//                           <ul className="space-y-2">
//                             {order.orderItems.map((item) => (
//                               <li key={item._id} className="flex items-center gap-4">
//                                 <img src={item.image} alt={item.name} className="h-12 w-12 rounded object-cover" />
//                                 <div>
//                                   <p className="font-medium">{item.name}</p>
//                                   <p className="text-gray-500 text-sm">
//                                     ₹{item.price.toFixed(2)} × {item.quantity}
//                                   </p>
//                                 </div>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold mb-2">Shipping Info</h4>
//                           <p>{order.shippingInfo.address}</p>
//                           <p>
//                             {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pinCode}
//                           </p>
//                           <p>{order.shippingInfo.country}</p>
//                           <p>Phone: {order.shippingInfo.phoneNo}</p>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderList;





// import React, { useEffect, useState } from "react";
// import {
//   Loader2,
//   Package,
//   CheckCircle,
//   XCircle,
//   Truck,
//   Clock,
//   ChevronDown,
//   ChevronUp,
//   Edit,
//   Trash2,
//   MoreVertical,
// } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllOrders } from "./../redux/admin/adminSlice";

// const OrderList = () => {
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [actionMenu, setActionMenu] = useState(null);
//   const { orders, error, loading } = useSelector((state) => state.admin);
//   const [status, setStatus] = useState("");
//   const dispatch = useDispatch();

//   const updatestatus = () => {};
//   useEffect(() => {
//     dispatch(fetchAllOrders());
//   }, [dispatch]);

//   const toggleRow = (orderId) => {
//     setExpandedRows((prev) =>
//       prev.includes(orderId)
//         ? prev.filter((id) => id !== orderId)
//         : [...prev, orderId]
//     );
//   };

//   const toggleActionMenu = (orderId) => {
//     setActionMenu(actionMenu === orderId ? null : orderId);
//   };

//   // const getStatusBadge = (status) => {
//   //   const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
//   //   switch (status) {
//   //     case 'Delivered':
//   //       return <span className={`${baseClasses} bg-green-100 text-green-800`}>{status}</span>;
//   //     case 'Shipped':
//   //       return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>{status}</span>;
//   //     case 'Processing':
//   //       return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>{status}</span>;
//   //     case 'Cancelled':
//   //       return <span className={`${baseClasses} bg-red-100 text-red-800`}>{status}</span>;
//   //     default:
//   //       return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
//   //   }
//   // };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const handleDelete = (orderId) => {
//     // Add your delete logic here
//     console.log("Delete order:", orderId);
//     setActionMenu(null);
//   };

//   const handleEdit = (orderId) => {
//     // Add your edit logic here
//     console.log("Edit order:", orderId);
//     setActionMenu(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="animate-spin text-blue-500" size={32} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <XCircle className="h-5 w-5 text-red-400" />
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (orders.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <Package className="mx-auto text-gray-400" size={48} />
//         <h3 className="mt-4 text-lg font-medium text-gray-900">
//           No orders found
//         </h3>
//         <p className="mt-1 text-sm text-gray-500">
//           There are currently no orders in the system.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 sm:px-6 lg:px-8">
//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all orders including their details and status.
//           </p>
//         </div>
//       </div>

//       <div className="mt-8 flow-root">
//         <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
//               <table className="min-w-full divide-y divide-gray-300">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th
//                       scope="col"
//                       className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
//                     >
//                       Order ID
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Date
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Status
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Items
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Total
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Shipping
//                     </th>
//                     <th
//                       scope="col"
//                       className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
//                     >
//                       Actions
//                     </th>
//                     <th
//                       scope="col"
//                       className="relative py-3.5 pl-3 pr-4 sm:pr-6"
//                     >
//                       <span className="sr-only">Details</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {orders.map((order) => (
//                     <React.Fragment key={order._id}>
//                       <tr className="hover:bg-gray-50">
//                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
//                           <span className="truncate max-w-[120px] inline-block">
//                             {order._id}
//                           </span>
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {formatDate(order.createdAt)}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex">
//                           {/* <Link to={`/admin/order/update/${order._id}`} >{order.orderStatus}</Link> */}

//                           <select
//                             value={status}
//                             onChange={(e) => setStatus(e.target.value)}
//                             className="border px-3 py-2 rounded"
//                           >
//                             <option value="Processing">Processing</option>
//                             <option value="Shipped">Shipped</option>
//                             <option value="Delivered">Delivered</option>
//                             <option value="Cancelled">Cancelled</option>
//                           </select>
//                           <button className="bg-blue-600 px-2 rounded-md text-white">
//                             save
//                           </button>
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {order.orderItems.length}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
//                           ₹{order.totalPrice.toFixed(2)}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {order.shippingInfo.city}
//                         </td>
//                         <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                           <div className="relative">
//                             <button
//                               onClick={() => toggleActionMenu(order._id)}
//                               className="text-gray-400 hover:text-gray-600"
//                             >
//                               <MoreVertical className="h-5 w-5" />
//                             </button>
//                             {actionMenu === order._id && (
//                               <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                 <button
//                                   onClick={() => handleEdit(order._id)}
//                                   className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
//                                 >
//                                   <Edit className="mr-2 h-4 w-4" />
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={() => handleDelete(order._id)}
//                                   className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
//                                 >
//                                   <Trash2 className="mr-2 h-4 w-4" />
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                         <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
//                           <button
//                             onClick={() => toggleRow(order._id)}
//                             className="text-blue-600 hover:text-blue-900"
//                           >
//                             {expandedRows.includes(order._id) ? (
//                               <ChevronUp className="h-5 w-5" />
//                             ) : (
//                               <ChevronDown className="h-5 w-5" />
//                             )}
//                           </button>
//                         </td>
//                       </tr>

//                       {expandedRows.includes(order._id) && (
//                         <tr>
//                           <td colSpan={8} className="bg-gray-50 px-6 py-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                               <div>
//                                 <h3 className="text-sm font-medium text-gray-900 mb-2">
//                                   Order Items
//                                 </h3>
//                                 <div className="space-y-4">
//                                   {order.orderItems.map((item) => (
//                                     <div
//                                       key={item._id}
//                                       className="flex items-start"
//                                     >
//                                       <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md border border-gray-200">
//                                         <img
//                                           src={item.image}
//                                           alt={item.name}
//                                           className="h-full w-full object-cover object-center"
//                                           onError={(e) => {
//                                             e.target.src =
//                                               "https://via.placeholder.com/80";
//                                           }}
//                                         />
//                                       </div>
//                                       <div className="ml-4 flex-1">
//                                         <h4 className="text-sm font-medium text-gray-900">
//                                           {item.name}
//                                         </h4>
//                                         <p className="mt-1 text-sm text-gray-500">
//                                           ₹{item.price.toFixed(2)} ×{" "}
//                                           {item.quantity} = ₹
//                                           {(item.price * item.quantity).toFixed(
//                                             2
//                                           )}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                               <div>
//                                 <h3 className="text-sm font-medium text-gray-900 mb-2">
//                                   Shipping Information
//                                 </h3>
//                                 <div className="text-sm text-gray-500 space-y-1">
//                                   <p>{order.shippingInfo.address}</p>
//                                   <p>
//                                     {order.shippingInfo.city},{" "}
//                                     {order.shippingInfo.state}{" "}
//                                     {order.shippingInfo.pinCode}
//                                   </p>
//                                   <p>{order.shippingInfo.country}</p>
//                                   <p>Phone: {order.shippingInfo.phoneNo}</p>
//                                 </div>
//                                 <div className="mt-4">
//                                   <h3 className="text-sm font-medium text-gray-900 mb-2">
//                                     Payment
//                                   </h3>
//                                   <p className="text-sm text-gray-500">
//                                     Status:{" "}
//                                     <span className="font-medium">
//                                       {order.paymentInfo.status}
//                                     </span>
//                                   </p>
//                                   <p className="text-sm text-gray-500">
//                                     ID: {order.paymentInfo.id}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderList;




import React, { useEffect, useState } from "react";
import {
  Loader2,
  Package,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../redux/admin/adminSlice";

const OrderList = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [actionMenu, setActionMenu] = useState(null);
  const [statusMap, setStatusMap] = useState({}); // Track status per order
  const dispatch = useDispatch();


  
  const { orders, error, loading } = useSelector((state) => state.admin);
  

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders?.length) {
      const map = {};
      orders.forEach((order) => {
        map[order._id] = order.orderStatus;
      });
      setStatusMap(map);
    }
  }, [orders]);

  const toggleRow = (orderId) => {
    setExpandedRows((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const toggleActionMenu = (orderId) => {
    setActionMenu(actionMenu === orderId ? null : orderId);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleStatusChange = (orderId, value) => {
    setStatusMap((prev) => ({
      ...prev,
      [orderId]: value,
    }));
  };

const handleStatusSave = async (orderId) => {
  const newStatus = statusMap[orderId];
  if (!newStatus) return;

  await dispatch(updateOrderStatus({ orderId, status: newStatus }));
  dispatch(fetchAllOrders()); // ✅ Refetch after update
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto text-gray-400" size={48} />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No orders found</h3>
        <p className="mt-1 text-sm text-gray-500">
          There are currently no orders in the system.
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all orders including their details and status.
          </p>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Order ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Items</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Total</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Shipping</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900 truncate max-w-[120px]">
                          {order._id}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 flex items-center gap-2">
                          <select
                            value={statusMap[order._id] || ""}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="border px-2 py-1 rounded"
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => handleStatusSave(order._id)}
                            className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
                          >
                            Save
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {order.orderItems.length}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          ₹{order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          {order.shippingInfo.city}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          <div className="relative">
                            <button
                              onClick={() => toggleActionMenu(order._id)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <MoreVertical className="h-5 w-5" />
                            </button>
                            {actionMenu === order._id && (
                              <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                                <button
                                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </button>
                                <button
                                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center text-sm">
                          <button
                            onClick={() => toggleRow(order._id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {expandedRows.includes(order._id) ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {expandedRows.includes(order._id) && (
                        <tr>
                          <td colSpan={8} className="bg-gray-50 px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">
                                  Order Items
                                </h3>
                                <div className="space-y-4">
                                  {order.orderItems.map((item) => (
                                    <div
                                      key={item._id}
                                      className="flex items-start"
                                    >
                                      <div className="flex-shrink-0 h-16 w-16 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                          src={item.image}
                                          alt={item.name}
                                          className="h-full w-full object-cover object-center"
                                          onError={(e) => {
                                            e.target.src =
                                              "https://via.placeholder.com/80";
                                          }}
                                        />
                                      </div>
                                      <div className="ml-4 flex-1">
                                        <h4 className="text-sm font-medium text-gray-900">
                                          {item.name}
                                        </h4>
                                        <p className="mt-1 text-sm text-gray-500">
                                          ₹{item.price.toFixed(2)} ×{" "}
                                          {item.quantity} = ₹
                                          {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-2">
                                  Shipping Info
                                </h3>
                                <div className="text-sm text-gray-500 space-y-1">
                                  <p>{order.shippingInfo.address}</p>
                                  <p>
                                    {order.shippingInfo.city},{" "}
                                    {order.shippingInfo.state}{" "}
                                    {order.shippingInfo.pinCode}
                                  </p>
                                  <p>{order.shippingInfo.country}</p>
                                  <p>Phone: {order.shippingInfo.phoneNo}</p>
                                </div>
                                <div className="mt-4">
                                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                                    Payment Info
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    Status:{" "}
                                    <span className="font-medium">
                                      {order.paymentInfo.status}
                                    </span>
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    ID: {order.paymentInfo.id}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
