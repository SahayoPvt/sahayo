import React from "react";
import Logo from "../Logo";
import SiteLinks from "./SiteLinks";
import { Link } from "react-router";
import { FaLinkedin } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebookSquare } from "react-icons/fa";
import instaLogo from "../../assets/instagram.png";
import linkedinLogo from "../../assets/linkedin.png";
import facebookLogo from "../../assets/facebook.png";

const Footer = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-between bg-[#ffe5d7] sm:max-h-50">
      <section className="flex w-full flex-col items-center justify-around gap-3 py-5 sm:w-[70%] sm:flex-row sm:justify-between sm:gap-7 sm:py-7 lg:gap-0">
        <div className="flex flex-col items-center">
          <Logo />
          <span className="mr-1 text-center text-sm leading-4 font-semibold">
            Tailer Your Dreams
          </span>
        </div>
        <SiteLinks />
      </section>
      <hr className="w-[90%]" />
      <section className="my-3 flex w-[90%] items-center justify-between sm:w-[70%]">
        <select className="cursor-pointer bg-[#FFF2EB] px-2 py-1" name="" id="">
          <option value="">English</option>
          <option value="">Hindi</option>
        </select>
        <div className="hidden gap-2 sm:flex">
          <span>&copy; 2025 Boutique</span>•<Link>Privacy</Link>•
          <Link>Terms</Link>•<Link>Sitemap</Link>
        </div>
        <div className="flex items-center gap-3">
          {/* <PiInstagramLogoFill className="cursor-pointer text-3xl" />
          <FaLinkedin className="cursor-pointer text-[28px]" />
          <FaFacebookSquare className="cursor-pointer text-[28px]" /> */}

          <img className="w-7 cursor-pointer" src={instaLogo} alt="" />
          <img className="w-7 cursor-pointer" src={linkedinLogo} alt="" />
          <img className="w-7 cursor-pointer" src={facebookLogo} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Footer;
