import React, { useEffect, useState } from "react";
import Navlinks from "./Navlinks";
import DeliveryLocation from "./DeliveryLocation";
import Right from "./Right";
import { Menu, X } from "lucide-react";
import Logo from "../Logo";

const Navbar = () => {
  return (
    <nav className="fixed flex h-18 w-full items-center justify-around gap-20 bg-[#FFF2EB] shadow-lg">
      <Logo />
      <DeliveryLocation />
      <Navlinks />
      <Right />
    </nav>
  );
};

export default Navbar;
