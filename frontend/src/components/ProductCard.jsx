import React from "react";
import { Link, useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="flex w-fit cursor-pointer flex-col overflow-hidden rounded-md bg-white shadow-lg"
    >
      <img
        src={product.image[0].url}
        srcSet=""
        alt="Product 1"
        className="aspect-[2.5/3] h-60 object-cover object-top"
      />

      <div className="my-1 flex flex-col px-2">
        <h3 className="text-sm text-slate-900">{product.name}</h3>

        <div className="flex items-center gap-2">
          <h6 className="mb-1 text-lg font-semibold text-slate-900">
            ₹{product.currentprice}
          </h6>
          <h6 className="text-sm text-gray-400 line-through">
            ₹{product.originalprice}
          </h6>
          <h6 className="text-sm text-green-600">{product.discount}% off</h6>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
