// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
// import { getProductDetails } from "../redux/productSlice";
// import { removeErrors, removeSuccess, updateProduct } from "../redux/admin/adminSlice";
// import { toast } from "react-toastify";
// import { ImagePlus } from "lucide-react";

// function UpdateProduct() {
//   const [name, setName] = useState("");
//   const [currentprice, setcurrentPrice] = useState(Number);
//   const [originalprice, setoriginalPrice] = useState(Number);
//   const [discount, setdiscount] = useState(Number);
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [stock, setStock] = useState("");
//   const [image, setImage] = useState([]);
//   const [oldImage, setOldImage] = useState([]);
//   const [imagePreview, setImagePreview] = useState([]);

//   const { product } = useSelector(state => state.product);
//   const { success, error, loading } = useSelector(state => state.admin);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { updateId } = useParams();

//   const {products}=useSelector((state)=>state.product)
//   const categories = [...new Set(products.map(item => item.category))];

//   useEffect(() => {
//     dispatch(getProductDetails(updateId));
//   }, [dispatch, updateId]);

//   useEffect(() => {
//     if (product) {
//       setName(product.name);
//       setcurrentPrice(product.currentprice);
//       setoriginalPrice(product.originalprice);
//       setdiscount(product.discount);
//       setDescription(product.description);
//       setCategory(product.category);
//       setStock(product.stock);
//       setOldImage(product.image);
//     }
//   }, [product]);

// //   const handleImageChange = (e) => {
// //     const files = Array.from(e.target.files);

// //     setImage([]);
// //     setImagePreview([]);

// //     files.forEach((file) => {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         if (reader.readyState === 2) {
// //           setImagePreview((old) => [...old, reader.result]);
// //           setImage((old) => [...old, reader.result]);
// //         }
// //       };
// //       reader.readAsDataURL(file);
// //     });
// //   };

// const handleImageChange = (e) => {
//   const files = Array.from(e.target.files);

//   setImage(files); // Store actual File objects
//   setImagePreview([]); // Clear previous previews

//   files.forEach((file) => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview((prev) => [...prev, reader.result]); // base64 only for UI preview
//     };
//     reader.readAsDataURL(file);
//   });
// };

// //   const updateProductSubmit = (e) => {
// //     e.preventDefault();
// //     const myForm = new FormData();
// //     myForm.set('name', name);
// //     myForm.set('currentprice', currentprice);
// //     myForm.set('originalprice', originalprice);
// //     myForm.set('discount', discount);
// //     myForm.set('description', description);
// //     myForm.set('category', category);
// //     myForm.set('stock', stock);
// //     image.forEach((img) => {
// //       myForm.append("image", img);
// //     });
// //     console.log("foirmm--",myForm);

// //     dispatch(updateProduct({ id: updateId, formData: myForm }));

// //   };

// const updateProductSubmit = (e) => {
//   e.preventDefault();
//   const myForm = new FormData();

//   myForm.set('name', name);
//   myForm.set('currentprice', currentprice);
//   myForm.set('originalprice', originalprice);
//   myForm.set('discount', discount);
//   myForm.set('description', description);
//   myForm.set('category', category);
//   myForm.set('stock', stock);

//   image.forEach((img) => {
//     myForm.append("image", img); // ✅ now 'img' is a real File
//   });

//   dispatch(updateProduct({ id: updateId, productData: myForm }));
// };

//   useEffect(() => {
//     if (success) {
//       toast.success("Product Updated Successfully", { position: 'top-center', autoClose: 3000 });
//       dispatch(removeSuccess());
//       navigate('/admin/products');
//     }
//     if (error) {
//       toast.error(error, { position: 'top-center', autoClose: 3000 });
//       dispatch(removeErrors());
//     }
//   }, [dispatch, error, success, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 mt-16">
//       <div className="max-w-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow rounded-lg p-6 sm:p-8">
//           <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">Update Product</h1>

//           <form onSubmit={updateProductSubmit} className="space-y-6">
//             {/* Product Name */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Product Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

//               />
//             </div>

//             {/* Price and Stock */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="currentprice" className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Price
//                 </label>
//                 <input
//                   type="number"
//                   id="currentprice"
//                   name="currentprice"
//                   value={currentprice}
//                   onChange={(e) => setcurrentPrice(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

//                 />
//               </div>
//               <div>
//                 <label htmlFor="currentprice" className="block text-sm font-medium text-gray-700 mb-1">
//                   original Price
//                 </label>
//                 <input
//                   type="number"
//                   id="originalprice"
//                   name="originalprice"
//                   value={originalprice}
//                   onChange={(e) => setoriginalPrice(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

//                 />
//               </div>
//               <div>
//                 <label htmlFor="currentprice" className="block text-sm font-medium text-gray-700 mb-1">
//                 discount
//                 </label>
//                 <input
//                   type="number"
//                   id="discount"
//                   name="discount"
//                   value={discount}
//                   onChange={(e) => setdiscount(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

//                 />
//               </div>

//               <div>
//                 <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
//                   Product Stock
//                 </label>
//                 <input
//                   type="number"
//                   id="stock"
//                   name="stock"
//                   value={stock}
//                   onChange={(e) => setStock(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
//                 Product Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                 Product Category
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"

//               >
//                 <option value="">Choose a Category</option>
//                 {categories.map((item) => (
//                   <option value={item} key={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Image Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Product Images
//               </label>

//               {/* File Input */}
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                   <div className="flex text-sm text-gray-600 justify-center">
//                     <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
//                       <span>Upload images</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         className="sr-only"
//                         onChange={handleImageChange}
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
//                 </div>
//               </div>

//               {/* New Image Previews */}
//               {imagePreview.length > 0 && (
//                 <div className="mt-4">
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">New Images</h3>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                     {imagePreview.map((img, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={img}
//                           alt={`Preview ${index}`}
//                           className="w-full h-24 object-cover rounded-md border"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Old Images */}
//               {oldImage.length > 0 && (
//                 <div className="mt-4">
//                   <h3 className="text-sm font-medium text-gray-700 mb-2">Current Images</h3>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                     {oldImage.map((img, index) => (
//                       <div key={index} className="relative">
//                         <img
//                           src={img.url}
//                           alt={`Current ${index}`}
//                           className="w-full h-24 object-cover rounded-md border"
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
//                   loading ? 'opacity-70 cursor-not-allowed' : ''
//                 }`}
//               >
//                 {loading ? 'Updating...' : 'Update Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UpdateProduct;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getProductDetails } from "../redux/productSlice";
import {
  removeErrors,
  removeSuccess,
  updateProduct,
} from "../redux/admin/adminSlice";
import { toast } from "react-toastify";
import {
  ImagePlus,
  Upload,
  X,
  Save,
  ArrowLeft,
  Package,
  DollarSign,
  Hash,
  FileText,
  Tag,
  Loader,
  CheckCircle,
  AlertCircle,
  Camera,
  Trash2,
} from "lucide-react";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [currentprice, setcurrentPrice] = useState("");
  const [originalprice, setoriginalPrice] = useState("");
  const [discount, setdiscount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { product } = useSelector((state) => state.product);
  const { success, error, loading } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateId } = useParams();

  const { products } = useSelector((state) => state.product);
  const categories = [...new Set(products?.map((item) => item.category) || [])];

  useEffect(() => {
    dispatch(getProductDetails(updateId));
  }, [dispatch, updateId]);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setcurrentPrice(product.currentprice || "");
      setoriginalPrice(product.originalprice || "");
      setdiscount(product.discount || "");
      setDescription(product.description || "");
      setCategory(product.category || "");
      setStock(product.stock || "");
      setOldImage(product.image || []);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImage(files);
    setImagePreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index) => {
    const newImages = image.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setImage(newImages);
    setImagePreview(newPreviews);
  };

  const updateProductSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("currentprice", currentprice);
    myForm.set("originalprice", originalprice);
    myForm.set("discount", discount);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    image.forEach((img) => {
      myForm.append("image", img);
    });

    try {
      await dispatch(updateProduct({ id: updateId, productData: myForm }));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Product Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      dispatch(removeSuccess());
      navigate("/admin/products");
    }
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error, success, navigate]);

  if (loading && !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Loading Product Details
          </h2>
          <p className="text-gray-600">
            Please wait while we fetch the product information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/admin/products")}
            className="mb-6 inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-white hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </button>

          <div className="text-center">
            <h1 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent">
              Update Product
            </h1>
            <p className="text-lg text-gray-600">
              Modify your product details and inventory
            </p>
          </div>
        </div>

        {/* Main Form */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl">
          <form onSubmit={updateProductSubmit} className="space-y-8 p-8">
            {/* Product Images Section */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <div className="mb-6 flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Product Images
                  </h3>
                  <p className="text-sm text-gray-600">
                    Upload new images or keep existing ones
                  </p>
                </div>
              </div>

              {/* Current Images */}
              {oldImage.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-700">
                    Current Images
                  </h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {oldImage.map((img, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={img.url}
                          alt={`Current ${index}`}
                          className="h-24 w-full rounded-xl border-2 border-white object-cover shadow-sm"
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="text-xs font-medium text-white">
                            Current
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Image Upload */}
              <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-white/50 p-6 text-center transition-colors hover:border-blue-400">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-blue-500" />
                  <p className="mb-2 text-lg font-medium text-gray-900">
                    Upload New Images
                  </p>
                  <p className="text-gray-500">
                    Click to select or drag and drop new images
                  </p>
                </label>
              </div>

              {/* New Image Previews */}
              {imagePreview.length > 0 && (
                <div className="mt-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-700">
                    New Images
                  </h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {imagePreview.map((img, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={img}
                          alt={`Preview ${index}`}
                          className="h-24 w-full rounded-xl border-2 border-green-200 object-cover shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-1 left-1 rounded bg-green-500 px-2 py-1 text-xs text-white">
                          New
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="mb-3 flex items-center text-sm font-semibold text-gray-900">
                    <Package className="mr-2 h-4 w-4 text-blue-600" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="mb-3 flex items-center text-sm font-semibold text-gray-900">
                    <Tag className="mr-2 h-4 w-4 text-blue-600" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a Category</option>
                    {categories.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Stock */}
                <div>
                  <label className="mb-3 flex items-center text-sm font-semibold text-gray-900">
                    <Hash className="mr-2 h-4 w-4 text-blue-600" />
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter stock quantity"
                    min="0"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Current Price */}
                <div>
                  <label className="mb-3 flex items-center text-sm font-semibold text-gray-900">
                    <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                    Current Price (₹)
                  </label>
                  <input
                    type="number"
                    value={currentprice}
                    onChange={(e) => setcurrentPrice(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="mb-3 flex items-center text-sm font-semibold text-gray-900">
                    <DollarSign className="mr-2 h-4 w-4 text-gray-600" />
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={originalprice}
                    onChange={(e) => setoriginalPrice(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="mb-3 flex items-center text-sm font-semibold text-gray-900">
                    <Tag className="mr-2 h-4 w-4 text-red-600" />
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setdiscount(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="mb-3 flex items-center text-sm font-semibold text-gray-900">
                <FileText className="mr-2 h-4 w-4 text-blue-600" />
                Product Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Enter detailed product description..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 border-t border-gray-200 pt-8">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="rounded-xl bg-gray-100 px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`flex transform items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
                  isSubmitting || loading
                    ? "transform-none cursor-not-allowed opacity-70"
                    : ""
                }`}
              >
                {isSubmitting || loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Updating Product...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5" />
                    <span>Update Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Success/Error States */}
        {isSubmitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="mx-4 w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
              <div className="mx-auto mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600">
                <Loader className="h-8 w-8 animate-spin text-white" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Updating Product
              </h3>
              <p className="text-gray-600">
                Please wait while we save your changes...
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProduct;
