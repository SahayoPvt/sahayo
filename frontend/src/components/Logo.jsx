import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className="flex cursor-pointer items-center gap-1 text-2xl text-shadow-md"
    >
      <img src={logo} alt="" className="mb-1 w-14" />
    </div>
  );
};

export default Logo;
