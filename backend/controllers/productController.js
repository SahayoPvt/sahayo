import Product from "../models/productModel.js";
import HandleError from "../utils/handleError.js";
import handleAsyncError from "../middleware/handleAsyncError.js";
import APIFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadImageOnCloudnary } from "../utils/cloudinary.js";


// 1️⃣Creating Products
export const createProducts = handleAsyncError(async (req, res, next) => {
  let imageLinks = [];  
  // If files are uploaded
  if (req.files && req.files.length > 0) {
    imageLinks = await Promise.all(
      req.files.map((file) => uploadImageOnCloudnary(file.path, "products"))
    );
    // Map to required format
    imageLinks = imageLinks.map((link) => ({
      public_id: link.public_id,
      url: link.secure_url,
    }));
  }

  if(!imageLinks.length)
  {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one image",
    });
  }
  // Validate all images have both fields
  if (
    !imageLinks.length ||
    imageLinks.some((img) => !img.public_id || !img.url)
  ) {
    return res.status(400).json({
      success: false,
      message: "All images must have public_id and url.",
    });
  }

  req.body.image = imageLinks;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  return res.status(201).json({
    success: true,
    message:"Product created successfully",
    product,
  });
});

// 2️⃣Get all products
export const getAllProducts = handleAsyncError(async (req, res, next) => {
  const resultsPerPage =16;
  const apiFeatures = new APIFunctionality(Product.find().sort({ createdAt: -1 }), req.query)
    .search()
    .filter();

  //Getting filtered query before pagination
  const filteredQuery = apiFeatures.query.clone();
  const productCount = await filteredQuery.countDocuments();

  //Calculate totalPages based on filtered count
  const totalPages = Math.ceil(productCount / resultsPerPage);
  const page = Number(req.query.page) || 1;

  if (page > totalPages && productCount > 0) {
    return next(new HandleError("This page doesn't exist", 404));
  }

  //Apply pagination
  apiFeatures.pagination(resultsPerPage);
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new HandleError("No Product Found", 404));
  }
  return res.status(200).json({
    success: true,
    products,
    productCount,
    resultsPerPage,
    totalPages,
    currentPage: page,
  });
});

export const updateProduct = handleAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  // Handle new images if provided
  let imageLinks = product.image; // default to existing images
  if (req.files && req.files.length > 0) {
    // Delete old images from Cloudinary
    for (let img of product.image) {
      await cloudinary.uploader.destroy(img.public_id);
    }
    // Upload new images
    imageLinks = await Promise.all(
      req.files.map(file => uploadImageOnCloudnary(file.path, "products"))
    );
    imageLinks = imageLinks.map(link => ({
      public_id: link.public_id,
      url: link.secure_url
    }));
  }

  // Update product fields
  const updatedData = {
    ...req.body,
    image: imageLinks
  };

  product = await Product.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
  });

 return res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }

  // Delete all images from Cloudinary
  for (let img of product.image) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  // Delete product from database
  await product.deleteOne();

  return res.status(200).json({
    success: true,
    message: "Product Deleted successfully",
  });
});

// 5️⃣Accessing Single Product
export const getSingleProduct = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new HandleError("Product Not Found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

//6️⃣ Creating and Updating Review
export const createReviewForProduct = handleAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    const product = await Product.findById(productId);
    if (!product) {
      return next(new HandleError("Product not found", 400));
    }
    const reviewExists = product.reviews.find(
      (review) => review.user.toString() === req.user.id.toString()
    );
    if (reviewExists) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user.id.toString()) {
          (review.rating = rating), (review.comment = comment);
        }
      });
    } else {
      product.reviews.push(review);
    }
    product.numOfReviews = product.reviews.length;
    let sum = 0;
    product.reviews.forEach((review) => {
      sum += review.rating;
    });
    product.ratings =
      product.reviews.length > 0 ? sum / product.reviews.length : 0;
    await product.save({ validateBeforeSave: false });
    return res.status(200).json({
      success: true,
      product,
    });
  }
);

// 7️⃣Getting reviews
export const getProductReviews = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  return res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// 8️⃣Deleting Reviews
export const deleteReview = handleAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new HandleError("Product not found", 400));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let sum = 0;
  reviews.forEach((review) => {
    sum += review.rating;
  });
  const ratings = reviews.length > 0 ? sum / reviews.length : 0;
  const numOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Review Deleted Successfully",
  });
});

// 9️⃣Admin - Getting all products
export const getAdminProducts = handleAsyncError(async (req, res, next) => {
  const products = await Product.find();
  return res.status(200).json({
    success: true,
    products,
  });
});
