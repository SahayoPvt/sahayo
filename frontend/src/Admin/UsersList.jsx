import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  Loader2, 
  Edit3, 
  Trash2, 
  Plus, 
  Users, 
  Search,
  Filter,
  Crown,
  UserCheck,
  Calendar,
  Mail,
  MoreVertical,
  Eye
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage, deleteUser, fetchUsers, removeErrors } from '../redux/admin/adminSlice';
import { toast } from 'react-toastify';
import Swal from "sweetalert2/dist/sweetalert2.js";

function UsersList() {
  const { users, loading, error, message } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id, userName) => {
    const response = await Swal.fire({
      title: "Delete User",
      text: `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete user",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-lg px-6 py-2',
        cancelButton: 'rounded-lg px-6 py-2'
      }
    });
    
    if (response.isConfirmed) {
      dispatch(deleteUser(id));
      Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        customClass: {
          popup: 'rounded-2xl'
        }
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (message) {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  // Filter users based on search term and role
  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200';
      case 'user': return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-3 h-3" />;
      case 'user': return <UserCheck className="w-3 h-3" />;
      default: return <UserCheck className="w-3 h-3" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="w-8 h-8 mr-3 text-indigo-600" />
                User Management
              </h1>
              <p className="text-gray-600 mt-2">Manage user accounts, roles, and permissions</p>
            </div>
            <Link 
              to="/admin/user/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New User
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-6">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              
              {/* Role Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white min-w-[150px]"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing {filteredUsers.length} of {users?.length || 0} users
              </span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Crown className="w-4 h-4 mr-1 text-purple-600" />
                  {users?.filter(u => u.role === 'admin').length || 0} Admins
                </span>
                <span className="flex items-center">
                  <UserCheck className="w-4 h-4 mr-1 text-blue-600" />
                  {users?.filter(u => u.role === 'user').length || 0} Users
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Joined
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Verified User
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1 capitalize">{user.role}</span>
                        </span>
                      </td>
                     
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                       <td className="px-6 py-4 ">
                          
                          <span className="ml-1 ">{user.isVerified ? "Yes":"No"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Link
                            to={`/admin/user/${user._id}`}
                            className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-all transform hover:scale-110"
                            title="Edit Role"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(user._id, user.name)}
                            className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-all transform hover:scale-110"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Users className="w-12 h-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                        <p className="text-gray-500 mb-4">
                          {searchTerm || roleFilter !== 'all' 
                            ? 'Try adjusting your search or filter criteria'
                            : 'Get started by adding your first user'
                          }
                        </p>
                        {!searchTerm && roleFilter === 'all' && (
                          <Link 
                            to="/admin/user/create"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add First User
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;