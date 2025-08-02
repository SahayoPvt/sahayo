import React, { useEffect } from "react";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productSlice";

const Mens = () => {

  const { products }= useSelector(state=>state.product)
 console.log(products);
 
   const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch]) 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" mt-24 mx-auto px-3  ">
      <h2 class="text-2xl font-bold text-slate-900 mb-6">Mens Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
        {products
          .filter((item) => item.Category === "Men")
          .map((product) => (
            <Product key={product.Id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Mens;
