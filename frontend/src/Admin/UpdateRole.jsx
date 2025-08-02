import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  X, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Save,
  Loader2,
  Crown,
  UserCheck
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrors, removeSuccess } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import {
  clearMessage,
  getSingleUser,
  updateUserRole,
} from '../redux/admin/adminSlice';

const UpdateRole = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const { _id } = useParams();
  const { user, error, success, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      dispatch(getSingleUser(_id));
    }
  }, [dispatch, _id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || 'An error occurred', { 
        position: 'top-center', 
        duration: 3000 
      });
      dispatch(removeErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (success) {
      toast.success(success?.message || 'Role updated successfully!', {
        position: 'top-center',
        duration: 3000,
      });
      dispatch(removeSuccess());
      dispatch(clearMessage());
      navigate('/admin/users');
    }
  }, [dispatch, success, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role) {
      toast.error('Please select a role');
      return;
    }
    dispatch(updateUserRole({ _id, role: formData.role }));
  };

  const handleClose = () => {
    navigate('/admin/users');
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'user': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'user': return <UserCheck className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  if (loading && !user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-t-2xl p-6 text-white">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white border-opacity-30">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold">Update User Role</h2>
              <p className="text-indigo-100 text-sm">Manage user permissions and access</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Current Role Display */}
          {user && (
            <div className="mb-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Current Role</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user.role)}`}>
                    {getRoleIcon(user.role)}
                    <span className="ml-2 capitalize">{user.role}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Member since</p>
                  <p className="text-sm font-medium text-gray-700">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Shield className="w-4 h-4 mr-2 text-gray-500" />
                User Role
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select role</option>
                  <option value="user">👤 User - Standard Access</option>
                  <option value="admin">👑 Admin - Full Access</option>
                </select>
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Role Description */}
            {formData.role && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {formData.role === 'admin' ? (
                      <Crown className="w-5 h-5 text-purple-600 mt-0.5" />
                    ) : (
                      <UserCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900 capitalize">
                      {formData.role} Permissions
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {formData.role === 'admin' 
                        ? 'Full system access including user management, settings, and all administrative functions.'
                        : 'Standard user access with basic functionality and personal account management.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-red-700">{error?.message || 'An error occurred'}</span>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-sm text-green-700">{success?.message || 'Role updated successfully!'}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading || !formData.role}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 transform hover:scale-105 font-medium shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2 inline" />
                    Update Role
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRole;