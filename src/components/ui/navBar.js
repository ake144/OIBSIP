import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userID");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getuser/" + userId)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Fetch cart items count
    axios
      .get("http://localhost:3001/api/getCartItemsCount/" + userId)
      .then((res) => {
        console.log(res);
        setCartItemsCount(res.data.cartItemsCount);
        console.log(res.data.cartItemsCount);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userId]); // Add userId to dependency array to re-fetch count when user changes

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogOut = () => {
    localStorage.removeItem("userID");
    setUser(null);
    navigate('/')
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only  text-white">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between w-full">
            <div>
              <img src="/akeja.png" className="h-12 w-12" alt="logo" />
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link to="#" className="text-white hover:text-gray-300">
                About
              </Link>
              <Link to="#" className="text-white hover:text-gray-300">
                Market
              </Link>
              <Link to="#" className="text-white hover:text-gray-300">
                Restaurants
              </Link>
              <Link to="#" className="text-white hover:text-gray-300">
                Drinks
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-white">
                <HiOutlineShoppingCart className="h-8 w-8" />
                {cartItemsCount > 0 && (
                  <span className="absolute  -top-1 w-5  bg-red-500 text-white rounded-full px-5 py-1 text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div>
                  <Link to="/profile" className="text-white">
                    <CgProfile className="h-8 w-8" />
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    to={handleSignupClick}
                    className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-800 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
              <button
                onClick={handleLogOut}
                className="text-white border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-800 transition duration-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
