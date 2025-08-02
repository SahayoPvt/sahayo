import express from 'express';
const router=express.Router();

import {createProducts, createReviewForProduct, deleteProduct, deleteReview, getAdminProducts, getAllProducts, getProductReviews, getSingleProduct, updateProduct } from '../controllers/productController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';
import { upload } from '../middleware/multer.js';


// Routes
router.route("/products")
.get(getAllProducts);

router.route("/admin/products")
.get(verifyUserAuth,roleBasedAccess("admin"), getAdminProducts);
router.route("/admin/product/create").post(verifyUserAuth,roleBasedAccess("admin"),upload.array('image',10),createProducts);

router.route("/admin/product/:id")
.put(verifyUserAuth,roleBasedAccess("admin"),upload.array('image', 5),updateProduct)
.delete(verifyUserAuth,roleBasedAccess("admin"),deleteProduct);

router.route("/product/:id").get(getSingleProduct)
router.route("/review").put(verifyUserAuth,createReviewForProduct)
router.route("/admin/reviews").get(verifyUserAuth,roleBasedAccess("admin"),getProductReviews).delete(verifyUserAuth,roleBasedAccess("admin"),deleteReview)

export default router;