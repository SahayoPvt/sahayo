import React from "react";
import Hero from "./Hero";
import Category from "./Category/Category";
import Reviews from "../Reviews/Reviews";
import NewArrivals from "../../NewArrival";

const Home = () => {
  return (
    <div className="pt-16 flex flex-col gap-4">
      <Hero />
      <NewArrivals />
      <Category />
      <Reviews />
    </div>
  );
};

export default Home;
