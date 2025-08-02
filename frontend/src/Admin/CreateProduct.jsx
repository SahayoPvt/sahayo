


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, removeErrors, removeSuccess } from "../redux/admin/adminslice";
import { toast } from "react-toastify";
import { ImagePlus, Trash2, Package, DollarSign, Tag, FileText, Camera, Percent } from 'lucide-react';

function CreateProduct() {
  const { success, loading, error } = useSelector(state => state.admin);
  const { products } = useSelector(state => state.product);
  const dispatch = useDispatch();
   const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const [formData, setFormData] = useState({
    name: "",
    currentprice:Number,
    originalprice:Number,
    discount:Number,
    description: "",
    category: "",
    stock: "",
    newarrivals:selectedOption,
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Get unique categories from existing products
  const categories = [...new Set(products.map(item => item.category))];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Clear previous selections if not adding more
    if (e.target.files.length > 0) {
      setImageFiles([]);
      setImagePreviews([]);
    }

    files.slice(0, 5).forEach((file) => {
      if (!file.type.match('image.*')) {
        toast.error(`File ${file.name} is not an image`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`Image ${file.name} is too large (max 5MB)`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreviews(prev => [...prev, reader.result]);
          setImageFiles(prev => [...prev, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (imageFiles.length === 0) {
      // console.log("er---",err);
      
      toast.error("Please upload at least one image");
      alert("Please upload at least one image",error);
      return;
    }

    try {
      setIsUploading(true);
      
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("currentprice", formData.currentprice);
      formDataObj.append("originalprice", formData.originalprice);
      formDataObj.append("discount", formData.discount);
      formDataObj.append("description", formData.description);
      formDataObj.append("category", formData.category);
      formDataObj.append("stock", formData.stock);
      formDataObj.append("newarrivals", selectedOption);

      console.log("selec------",formDataObj);
      
   
      imageFiles.forEach(file => {
        formDataObj.append("image", file);
      });

      dispatch(createProduct(formDataObj));

    } catch (err) {
      console.error('Product creation error:', err);
      toast.error('Failed to create product');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error, { position: 'top-center', autoClose: 3000 });
      dispatch(removeErrors());
    }
    if (success) {
      toast.success("Product Created successfully", { position: 'top-center', autoClose: 3000 });
      // Reset form
      setFormData({
        name: "",
        currentprice: "",
        description: "",
        category: "",
        stock: "",
      });
      setImageFiles([]);
      setImagePreviews([]);
      dispatch(removeSuccess());
    }
  }, [dispatch, error, success]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          {/* <p className="text-gray-600">Create a new product listing for your store</p> */}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <h2 className="text-xl font-semibold text-white">Product Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8" encType="multipart/form-data">
            {/* Product Images Section */}
            <div className="rounded-xl ">
              <div className="flex items-center mb-4">
                <Camera className="w-5 h-5 text-gray-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
                <span className="ml-2 text-sm text-red-500">*</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Main
                      </div>
                    )}
                  </div>
                ))}
                
                {imagePreviews.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 group">
                    <ImagePlus size={24} className="text-gray-400 group-hover:text-blue-500 mb-2" />
                    <span className="text-xs text-gray-500 group-hover:text-blue-600 text-center px-2">
                      Add Image
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      disabled={isUploading || loading}
                    />
                  </label>
                )}
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <div className="flex items-center mr-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Upload up to 5 images
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  JPEG, PNG (max 5MB each)
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 mr-2" />
                    Product Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-gray-300   duration-200 bg-white"
                    placeholder="Enter product name"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Package className="w-4 h-4 mr-2" />
                    Category
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className="w-full p-2.5 border text-gray-500 border-gray-300 duration-200 bg-white"
                    required
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {/* newarrivals */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Package className="w-4 h-4 mr-2" />
                    NewArrival
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    className="w-full p-2.5 border text-gray-500 border-gray-300  duration-200 bg-white"
                    required
                    name="category"
                    value={selectedOption}
                    onChange={handleChange}
                  >
                    <option value="">Please choose an option</option>
                   <option value="true">True</option>
                   <option value="false">False</option>
        
                  </select>
                </div>
    
     {/* <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Tag className="w-4 h-4 mr-2" />
                     newArrivals
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-2.5 border border-gray-300   duration-200 bg-white"
                    placeholder="Enter product name"
                    required
                    name="newarrivals"
                    value={formData.newarrivals}
                    onChange={handleInputChange}
                  />
    </div> */}


                {/* Stock */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Package className="w-4 h-4 mr-2" />
                    Stock Quantity
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full p-2.5 border border-gray-300  duration-200 bg-white"
                    placeholder="Enter stock quantity"
                    required
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Pricing Section */}
                <div className=" rounded-lg px-6 ">
                
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          className="w-full pl-6 pr-4 py-2.5 border border-gray-300  duration-200 bg-white"
                          placeholder="0.00"
                          required
                          name="originalprice"
                          value={formData.originalprice}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Price
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          className="w-full pl-6 pr-4 py-2.5 border border-gray-300  duration-200 bg-white"
                          placeholder="0.00"
                          required
                          name="currentprice"
                          value={formData.currentprice}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                        <Percent className="w-4 h-4 mr-1" />
                        Discount
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          className="w-full pr-8 pl-4 py-2.5 border border-gray-300 bg-white"
                          placeholder="0"
                          required
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Product Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                className="w-full p-4 border border-gray-300  duration-200 bg-white resize-none"
                placeholder="Describe your product in detail..."
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
           
            </div>

            {/* Submit Button */}
            <div className="flex justify-center  ">
              <button
                type="submit"
                disabled={loading || isUploading}
                className={`px-8 py-3 cursor-pointer font-semibold text-white transition-all duration-200 flex items-center space-x-2 ${
                  loading || isUploading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Uploading Images...</span>
                  </>
                ) : loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating Product...</span>
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    <span >Create Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;