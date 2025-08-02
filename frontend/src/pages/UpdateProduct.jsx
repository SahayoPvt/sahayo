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
import { removeErrors, removeSuccess, updateProduct } from "../redux/admin/adminSlice";
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
  Trash2
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
  
  const { product } = useSelector(state => state.product);
  const { success, error, loading } = useSelector(state => state.admin);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { updateId } = useParams();
  
  const { products } = useSelector((state) => state.product);
  const categories = [...new Set(products?.map(item => item.category) || [])];

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
    myForm.set('name', name);
    myForm.set('currentprice', currentprice);
    myForm.set('originalprice', originalprice);
    myForm.set('discount', discount);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);

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
      toast.success("Product Updated Successfully", { position: 'top-center', autoClose: 3000 });
      dispatch(removeSuccess());
      navigate('/admin/products');
    }
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
  }, [dispatch, error, success, navigate]);

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Product Details</h2>
          <p className="text-gray-600">Please wait while we fetch the product information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/products')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Update Product
            </h1>
            <p className="text-gray-600 text-lg">Modify your product details and inventory</p>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={updateProductSubmit} className="p-8 space-y-8">
            {/* Product Images Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
                  <p className="text-sm text-gray-600">Upload new images or keep existing ones</p>
                </div>
              </div>

              {/* Current Images */}
              {oldImage.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Current Images</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {oldImage.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img.url} 
                          alt={`Current ${index}`} 
                          className="w-full h-24 object-cover rounded-xl border-2 border-white shadow-sm"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-xs font-medium">Current</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* New Image Upload */}
              <div className="border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors bg-white/50">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload New Images</p>
                  <p className="text-gray-500">Click to select or drag and drop new images</p>
                </label>
              </div>

              {/* New Image Previews */}
              {imagePreview.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">New Images</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {imagePreview.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img} 
                          alt={`Preview ${index}`} 
                          className="w-full h-24 object-cover rounded-xl border-2 border-green-200 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          New
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <Package className="w-4 h-4 mr-2 text-blue-600" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <Tag className="w-4 h-4 mr-2 text-blue-600" />
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  <label className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <Hash className="w-4 h-4 mr-2 text-blue-600" />
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  <label className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                    Current Price (₹)
                  </label>
                  <input
                    type="number"
                    value={currentprice}
                    onChange={(e) => setcurrentPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-600" />
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={originalprice}
                    onChange={(e) => setoriginalPrice(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                    <Tag className="w-4 h-4 mr-2 text-red-600" />
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setdiscount(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-900 mb-3">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                Product Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter detailed product description..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-8 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl transition-all font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  (isSubmitting || loading) ? 'opacity-70 cursor-not-allowed transform-none' : ''
                }`}
              >
                {isSubmitting || loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Updating Product...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Update Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Success/Error States */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Loader className="w-8 h-8 text-white animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Updating Product</h3>
              <p className="text-gray-600">Please wait while we save your changes...</p>
              <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateProduct;