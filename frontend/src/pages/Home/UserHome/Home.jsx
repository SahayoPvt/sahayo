import React from "react";
import Hero from "./Hero";
import Category from "./Category/Category";
import Reviews from "../Reviews/Reviews";
import NewArrivals from "../../NewArrival";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 pt-16">
      <Hero />
      <Category />
      <Reviews />
      <NewArrivals />
    </div>
  );
};

export default Home;
