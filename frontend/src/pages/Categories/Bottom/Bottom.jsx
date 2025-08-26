import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../redux/productSlice";
import ProductCard from "../../../components/ProductCard";

const Bottom = () => {
  const { products } = useSelector((state) => state.product);
  // console.log(products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="mx-10 mt-22 flex flex-col gap-10">
      <h2 className="mx-auto text-3xl font-semibold underline text-shadow-md">
        Bottom
      </h2>
      <section className="flex flex-wrap gap-4">
        {products
          ?.filter((product) => product.category === "bottom")
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </section>
    </div>
  );
};

export default Bottom;
