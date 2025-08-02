import GenderCollection from "../pages/GenderCollection";
import Hero from "../pages/Hero";
import NewArrivals from "../pages/NewArrival";
import ProductCategories from "../pages/ProductCategories";
import Products from "../pages/Products";
import React from "react";
const Home = () => {
  return (
    <div className="pt-16 px-3 md:px-6">
      <Hero />
      <NewArrivals />
      <ProductCategories />
      <Products />
      <GenderCollection/>
      <img src="https://pictures.kartmax.in/live/original/0x0/sites/aPfvUDpPwMn1ZadNKhP7/theme/3-6a08e385-d73b-4641-a86c-aa9b3560085e.jpg" alt="" srcSet="" />
    </div>
  );
};

export default Home;
