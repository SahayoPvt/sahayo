import React, { useEffect } from "react";
// import { products } from "../utils/ProductData";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productSlice";

const Products = () => {
 const { products }= useSelector(state=>state.product)
 
   const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch]) 
 return (
      <div className=" mt-4 mx-auto  ">
        <h2 className="text-2xl font-bold text-slate-900 mb-10">
          Explore All Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
  );
};

export default Products;
