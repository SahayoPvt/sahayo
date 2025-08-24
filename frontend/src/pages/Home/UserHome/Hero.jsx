import React from "react";

const Hero = () => {
  return (
    <div className="flex h-50 flex-col items-center justify-center gap-4 bg-[#ffe5d7] sm:h-70">
      <h2 className="flex flex-col tracking-wider sm:tracking-wide text-center text-4xl text-shadow-lg sm:text-6xl">
        <span>WELCOME TO</span>
        <span>OUR STORE</span>
      </h2>
      <p className="text-xl sm:text-2xl">Discover Our New Collection</p>
    </div>
  );
};

export default Hero;
