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
      <div className="overflow-hidden bg-white shadow-lg">
        <div className="flex cursor-pointer flex-col overflow-hidden rounded-lg">
          <Link to={`/product/${product._id}`} className="w-full">
            <img
              src={product.image[0].url}
              srcSet=""
              alt="Product 1"
              className="aspect-[2.1/3] h-64 w-full object-cover object-top transition-all hover:scale-[1.01]"
            />
          </Link>

          <div className="mt-1 mb-1 flex flex-1 flex-col px-1">
            <h5 className="line-clamp-2 px-1 text-sm text-slate-900">
              {product.name}
            </h5>

            <div className="flex items-center gap-2 px-1">
              <h6 className="mb-1 text-[16px] font-semibold text-slate-900">
                ₹{product.currentprice}
              </h6>
              <h6 className="text-[14px] text-gray-400 line-through">
                ₹{product.originalprice}
              </h6>
              <h6 className="text-[13px] text-green-600">
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
