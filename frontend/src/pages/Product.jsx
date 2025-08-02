import React from "react";
import { Link } from "react-router";
// import { motion } from 'framer-motion';

const Product = ({ product }) => {
  return (
    <>
    {/* <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="bg-white  shadow-lg overflow-hidden"
    > */}
    <div className="bg-white  shadow-lg overflow-hidden"
>
      <div className="flex flex-col rounded overflow-hidden  cursor-pointer hover:scale-[1.01] transition-all">
        <Link to={`/product/${product._id}`} className="w-full">
          <img
            src={product.image[0].url}
            srcSet=""
            alt="Product 1"
            className=" h-64 object-cover object-top aspect-[230/307]"
          />
        </Link>

        <div className="mt-1 flex-1 px-1 flex flex-col mb-1">
          <h5 className="px-1 text-sm text-slate-900 line-clamp-2">
            {product.name}
          </h5>
          
         
          <div className="flex items-center gap-2 px-1">
             <h6 className="text-[16px] font-semibold text-slate-900 mb-1">
            ₹{product.currentprice}
          </h6>
              <h6 className="text-[14px]  text-gray-400 line-through">
            ₹{product.originalprice}
          </h6>
          <h6 className="text-[13px]  text-green-600">
            {product.discount}% off
          </h6>
        
          </div>
         
        </div>
      </div>
      </div>
      {/* </motion.div> */}
    </>
  );
};

export default Product;
