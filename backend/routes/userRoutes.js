
// import express from 'express';
// import {deleteUser, getSingleUser, getUserDetails, getUsersList, loginUser, logout, registerUser, requestPasswordReset, resetPassword, updatePassword, updateProfile, updateUserRole} from '../controllers/userController.js';
// import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
// import { upload } from '../middleware/multer.js';

// const router=express.Router();
// router.route("/register").post(upload.single("avatar"),registerUser)
// router.route("/login").post(loginUser)
// router.route("/logout").post(logout)
// router.route("/password/forgot").post(requestPasswordReset)
// router.route("/reset/:token").post(resetPassword);
// router.route("/profile").get(verifyUserAuth, getUserDetails);
// router.route("/password/update").put(verifyUserAuth, updatePassword);
// router.route("/profile/update").patch(verifyUserAuth, updateProfile);
// router.route("/admin/users").get(verifyUserAuth, roleBasedAccess('admin'), getUsersList);
// router.route("/admin/user/:id")
// .get(verifyUserAuth, roleBasedAccess('admin'), getSingleUser)
// .put(verifyUserAuth, roleBasedAccess('admin'),updateUserRole)
// .delete(verifyUserAuth, roleBasedAccess('admin'),deleteUser)
// export default router;


import express from 'express';
import {
    deleteUser,
    getSingleUser,
    getUserDetails,
    getUsersList,
    loginUser,
    logout,
    registerUser,
    requestPasswordReset,
    resetPassword,
    updatePassword,
    updateProfile,
    updateUserRole,
    verifyEmail,
    resendVerificationOTP,
    SendOtpOnMail
} from '../controllers/userController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

// Authentication Routes
router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/verify-email").post(verifyEmail);
router.route("/sendotp").post(SendOtpOnMail);
router.route("/resend-otp").post(resendVerificationOTP);

router.route("/login").post(loginUser);
router.route("/logout").post(logout);

// Password Reset Routes
router.route("/password/forgot").post(requestPasswordReset);
router.route("/password/reset/:token").put(resetPassword);

// Authenticated User Routes
router.route("/profile")
    .get(verifyUserAuth, getUserDetails);

router.route("/password/update")
    .put(verifyUserAuth, updatePassword);

router.route("/profile/update")
    .patch(verifyUserAuth, upload.single("avatar"), updateProfile);

// Admin Routes
router.route("/admin/users")
    .get(verifyUserAuth, roleBasedAccess('admin'), getUsersList);

router.route("/admin/user/:id")
    .get(verifyUserAuth, roleBasedAccess('admin'), getSingleUser)
    .put(verifyUserAuth, roleBasedAccess('admin'), updateUserRole)
    .delete(verifyUserAuth, roleBasedAccess('admin'), deleteUser);

export default router;



