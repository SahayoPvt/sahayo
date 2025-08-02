// import React, { useState, useRef, useEffect } from "react";
// import {
//   FaEnvelope,
//   FaCalendarAlt,
//   FaPen,
//   FaLock,
//   FaCamera,
//   FaTimes,
//   FaSpinner,
// } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { 
//   removeErrors, 
//   removeSuccess, 
//   updatePassword,
//   updateProfile 
// } from "../redux/userSlice";
// import toast from "react-hot-toast";

// const UserProfileCard = () => {
//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isEditingImage, setIsEditingImage] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);

//   const { user, error, success ,loading} = useSelector((state) => state.user);

// const [tempImage, setTempImage] = useState(
//   user?.avatar?.url || "https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp"
// );
//   const dispatch = useDispatch();

//   const handleImageError = (e) => {
//     e.target.src = "https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp";
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
    
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setTempImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSaveImage = async () => {
//     if (!tempImage) return;
    
//     try {
//       setIsUploading(true);
//       const formData = new FormData();
//       if (fileInputRef.current.files[0]) {
//         formData.set("avatar", fileInputRef.current.files[0]);
//       }
//       dispatch(updateProfile(formData));
      
//       // Reset the editing state after successful upload
//       setIsEditingImage(false);
//       setTempImage(null);
//     } catch (error) {
//       toast.error("Failed to update profile image",error);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleCancelImageEdit = () => {
//     setIsEditingImage(false);
//     setTempImage(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handlePasswordUpdate = (e) => {
//     e.preventDefault();
//     const myForm = new FormData();
//     myForm.set("oldPassword", oldPassword);
//     myForm.set("newPassword", newPassword);
//     myForm.set("confirmPassword", confirmPassword);

//     dispatch(updatePassword(myForm));
//     setShowPasswordModal(false);
//     setOldPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   useEffect(() => {
//     if (error) {
//       toast.error(error?.message, { position: 'top-center', autoClose: 3000 });
//       dispatch(removeErrors());
//     }
//   }, [dispatch, error]);

//   useEffect(() => {
//     if (success) {
//       toast.success(success?.message, { position: 'top-center', autoClose: 3000 });
//       dispatch(removeSuccess());
//     }
//   }, [dispatch, success]);





//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-10">
//       {/* Password Update Modal */}
//       {showPasswordModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">
//                 Update Password
//               </h3>
//               <button
//                 onClick={() => setShowPasswordModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//             <form onSubmit={handlePasswordUpdate}>
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Current Password
//                   </label>
//                   <input
//                     type="password"
//                     value={oldPassword}
//                     onChange={(e) => setOldPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm New Password
//                   </label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full px-4 py-2 border border-gray-300"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setShowPasswordModal(false)}
//                   className="px-4 py-2 border border-gray-500  text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white  hover:bg-blue-700 transition-colors"
//                 >
//                   {loading ? <> <div className="animate-spin">h</div><div class>...updating</div> </>:"Update Password"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Profile Card */}
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
//         {/* Gradient Header with Profile Image */}
//         <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
//           <div className="relative mx-auto w-32 h-32 mb-4 group">
//             <img
//               src={
//                 isEditingImage && tempImage && user 
//                   ? tempImage 
//                   : user?.avatar?.url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d"
//               }
//               alt={`${user?.name}'s profile picture`}
//               onError={handleImageError}
//               loading="lazy"
//               className={`w-full h-full rounded-full border-4 border-white shadow-lg transition-all ${
//                 isEditingImage ? "ring-2 ring-yellow-400" : ""
//               }`}
//             />

//             {/* Camera button positioned inside the image on right side */}
//             <button
//               className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
//               onClick={() => setIsEditingImage(!isEditingImage)}
//               aria-label="Edit profile picture"
//             >
//               <FaCamera className="text-blue-600" />
//             </button>

//             {isEditingImage && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full">
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   className="hidden"
//                 />
//                 <button
//                   onClick={() => fileInputRef.current.click()}
//                   className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-medium mb-2"
//                 >
//                   Change Photo
//                 </button>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={handleCancelImageEdit}
//                     className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSaveImage}
//                     disabled={!tempImage || isUploading}
//                     className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium flex items-center gap-1 disabled:opacity-50"
//                   >
//                     {isUploading ? (
//                       <>
//                         <FaSpinner className="animate-spin" />
//                         Saving...
//                       </>
//                     ) : (
//                       "Save"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Profile Content */}
//         <div className="p-3">
//           <h1 className="text-2xl font-bold text-center text-gray-800 mb-1">
//             {user?.name}
//           </h1>
      

//           <div className="space-y-4 mb-6">
//             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//               <FaEnvelope className="text-blue-500 flex-shrink-0" />
//               <div>
//                 <p className="text-xs text-gray-500">Email</p>
//                 <p className="text-gray-800">{user?.email}</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
//               <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
//               <div>
//                 <p className="text-xs text-gray-500">Member Since</p>
//                 <p className="text-gray-800">
//                   {user?.createdAt
//                     ? new Date(user.createdAt).toLocaleDateString("en-GB", {
//                         day: "numeric",
//                         month: "long",
//                         year: "numeric",
//                       })
//                     : "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col space-y-3">
//             <button
//               onClick={() => setShowPasswordModal(true)}
//               className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-800 transition-colors"
//             >
//               <FaLock className="text-blue-500" />
//               <span>Update Password</span>
//             </button>
//             <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
//               Edit Profile Information
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfileCard;

import React, { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Calendar,
  Edit3,
  Lock,
  Camera,
  X,
  Loader2,
  Check,
  Eye,
  EyeOff,
  Upload,
  User,
  Settings
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  removeErrors, 
  removeSuccess, 
  updatePassword,
  updateProfile 
} from '../redux/userSlice';
import toast from 'react-hot-toast';

const UserProfile = () => {
  // Redux state
  const { user, error, success, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // State management
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  // Profile edit state
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || ''
  });

  // Image handling
  const [tempImage, setTempImage] = useState(null);
  const fileInputRef = useRef(null);

  // Update edit form when user data changes
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || ''
      });
    }
  }, [user]);

  // Handle Redux errors and success messages
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
      toast.success(success?.message || 'Operation successful', { 
        position: 'top-center', 
        duration: 3000 
      });
      dispatch(removeSuccess());
    }
  }, [dispatch, success]);

  // Password validation
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    
    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial
    };
  };

  const passwordValidation = validatePassword(passwordForm.newPassword);
  const passwordsMatch = passwordForm.newPassword === passwordForm.confirmPassword;

  // Image error handler
  const handleImageError = (e) => {
    e.target.src = "https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp";
  };

  // Event handlers
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempImage(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (!tempImage || !fileInputRef.current?.files[0]) return;
    
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.set("avatar", fileInputRef.current.files[0]);
      dispatch(updateProfile(formData));
      setIsEditingImage(false);
      setTempImage(null);
    } catch (error) {
      toast.error("Failed to update profile image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelImageEdit = () => {
    setIsEditingImage(false);
    setTempImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (!passwordValidation.isValid || !passwordsMatch) return;

    const myForm = new FormData();
    myForm.set("oldPassword", passwordForm.oldPassword);
    myForm.set("newPassword", passwordForm.newPassword);
    myForm.set("confirmPassword", passwordForm.confirmPassword);

    dispatch(updatePassword(myForm));
    setShowPasswordModal(false);
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", editForm.name);
    formData.set("email", editForm.email);
    if (editForm.role) {
      formData.set("role", editForm.role);
    }
    
    dispatch(updateProfile(formData));
    setShowEditModal(false);
  };

  // Don't render if no user data
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 py-12 mt-12">
      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Update Password</h3>
                <p className="text-gray-500 mt-1">Keep your account secure with a strong password</p>
              </div>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.old ? 'text' : 'password'}
                    value={passwordForm.oldPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, oldPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    required
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, old: !prev.old }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.old ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    required
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Requirements */}
                {passwordForm.newPassword && (
                  <div className="mt-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`flex items-center gap-1 ${passwordValidation.minLength ? 'text-green-600' : 'text-gray-400'}`}>
                        <Check size={12} className={passwordValidation.minLength ? 'opacity-100' : 'opacity-30'} />
                        8+ characters
                      </div>
                      <div className={`flex items-center gap-1 ${passwordValidation.hasUpper ? 'text-green-600' : 'text-gray-400'}`}>
                        <Check size={12} className={passwordValidation.hasUpper ? 'opacity-100' : 'opacity-30'} />
                        Uppercase letter
                      </div>
                      <div className={`flex items-center gap-1 ${passwordValidation.hasLower ? 'text-green-600' : 'text-gray-400'}`}>
                        <Check size={12} className={passwordValidation.hasLower ? 'opacity-100' : 'opacity-30'} />
                        Lowercase letter
                      </div>
                      <div className={`flex items-center gap-1 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-gray-400'}`}>
                        <Check size={12} className={passwordValidation.hasNumber ? 'opacity-100' : 'opacity-30'} />
                        Number
                      </div>
                      <div className={`flex items-center gap-1 ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-gray-400'}`}>
                        <Check size={12} className={passwordValidation.hasSpecial ? 'opacity-100' : 'opacity-30'} />
                        Special character
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                    required
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordForm.confirmPassword && !passwordsMatch && (
                  <p className="text-red-500 text-xs mt-2">Passwords do not match</p>
                )}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!passwordValidation.isValid || !passwordsMatch || loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg mx-4 animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Edit Profile</h3>
                <p className="text-gray-500 mt-1">Update your personal information</p>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Role
                </label>
                <input
                  type="text"
                  value={editForm.role}
                  onChange={(e) => setEditForm(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Your role or title"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2 min-w-[120px] justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form> */}
          </div>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden transition-all hover:shadow-2xl border border-white/20 animate-in slide-in-from-bottom-6 duration-500">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
          
          {/* Profile Picture */}
          <div className="relative mx-auto w-36 h-36 mb-6 group">
            <div className="relative w-full h-full rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-white">
              <img
                src={
                  isEditingImage && tempImage 
                    ? tempImage 
                    : user?.avatar?.url || 'https://res.cloudinary.com/dbzcmxy5f/image/upload/v1749755464/avatar/junykrityyehenm0nfmp.webp'
                }
                alt={`${user?.name}'s profile`}
                onError={handleImageError}
                loading="lazy"
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isEditingImage ? 'scale-110' : 'group-hover:scale-105'
                }`}
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <Camera className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" size={24} />
              </div>
            </div>

            {/* Edit Button */}
            <button
              className="absolute -bottom-2 -right-2 p-3 bg-white rounded-full shadow-lg hover:shadow-xl text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
              onClick={() => setIsEditingImage(!isEditingImage)}
              aria-label="Edit profile picture"
            >
              <Camera size={18} />
            </button>

            {/* Image Edit Overlay */}
            {isEditingImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 rounded-full p-4 animate-in fade-in duration-200">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-semibold mb-3 hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Upload size={16} />
                  Choose Photo
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelImageEdit}
                    className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveImage}
                    disabled={!tempImage || isUploading}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-full text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        Saving
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Status Badge */}
          <div className="absolute top-6 right-6">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              Active
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-8 pb-8 -mt-12 relative z-10">
          {/* User Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.name}
              </h1>
              {user?.role==="admin" && (
                <p className="text-blue-600 font-medium text-sm mb-2">Admin</p>
              )}
            </div>

            {/* Info Grid */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
                  <Mail size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Email Address</p>
                  <p className="text-gray-900 font-medium truncate">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="p-3 bg-green-100 rounded-xl text-green-600">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Member Since</p>
                  <p className="text-gray-900 font-medium">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* <button
              onClick={() => setShowEditModal(true)}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-white transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <Edit3 size={18} />
              <span>Edit Profile</span>
            </button> */}
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 transition-all duration-300 border border-gray-200 font-medium hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <Lock size={16} />
                <span>Password</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 transition-all duration-300 border border-gray-200 font-medium hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
                <Settings size={16} />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;