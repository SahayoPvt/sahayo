import React from "react";
import { Link } from "react-router";
import { FaInstagram } from "react-icons/fa";
import { AiFillFacebook, AiOutlineTwitter } from "react-icons/ai";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-white mx-auto max-w-screen-xl space-y-8 px-3 md:px-6 py-16 lg:space-y-16 ">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div>
          <div className="text-teal-600 font-bold text-2xl">
           Your Shop
          </div>

          <p className="mt-4 max-w-xs text-gray-500">
          Your one-stop shop for all your needs. Quality products, competitive prices, and excellent customer service.
          </p>

          <ul className="mt-8 flex gap-4">
            <li>
              <Link
                to="#"
                rel="noreferrer"
                target="_blank"
                className="footer-link"
              >
                <span className="sr-only">Facebook</span>

                <AiFillFacebook className="text-2xl" />
              </Link>
            </li>

            <li>
              <Link
                to="#"
                rel="noreferrer"
                target="_blank"
                className="footer-link"
              >
                <span className="sr-only">Instagram</span>

                <FaInstagram className="text-2xl"  />
              </Link>
            </li>

            <li>
              <Link
                to="#"
                rel="noreferrer"
                target="_blank"
                className="footer-link"
              >
                <span className="sr-only">Twitter</span>

               <AiOutlineTwitter className="text-2xl"  />
              </Link>
            </li>

            <li>
              <Link
                to="#"
                rel="noreferrer"
                target="_blank"
                className="footer-link"
              >
                <span className="sr-only">GitHub</span>

                <BsGithub className="text-2xl"  />
              </Link>
            </li>

          </ul>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
          <div>
            <p className="footer-heading">Services</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Coaching{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Company Review{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Accounts Review{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  HR Consulting{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  SEO Optimisation{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Company</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  to="/"
                  className="footer-link"
                >
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="footer-link"
                >
                  {" "}
                  About{" "}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="footer-link"
                >
                  {" "}
                  Contact{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Accounts Review{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Helpful Links</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="footer-link"
                >
                  {" "}
                  Contact{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  FAQs{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Live Chat{" "}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="footer-heading">Legal</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Accessibility{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Returns Policy{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  {" "}
                  Refund Policy{" "}
                </Link>
              </li>

              <li>
                <Link
                  to="#"
                  className="footer-link"
                >
                  Hiring-3 Statistics
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        &copy; 2024. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
