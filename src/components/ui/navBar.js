import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartByUserIdAsync, selectCartItems } from "../cart/cartSlice";
import {
  selectLoggedInUser,
  logoutAsync,
  selectLogoutStatus
} from "../auth/AuthSlice";

export default function Navbar({user}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const userId = user?._id

  useEffect(() => {
    
    if (userId) {
      dispatch(fetchCartByUserIdAsync(userId));
    }
  }, [dispatch]);

  const handleLogOut = () => {
    window.open("http://localhost:3001/auth/logout", "_self");
    localStorage.setItem('user', JSON.stringify({ isLoggedIn: false }));
  };
  

  const handleCart = () => {
    navigate("/cart");
  };

  return (
    <div className="navbar bg-orange-100">
            <div className="flex-1  m-1 p-0">
                <a href="/">
              <img src="/chef-pizza.png" className="mx-6 h-14 w-23 " alt="logo" />
              </a>
            </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn   btn-ghost btn-circle">
            <div className="indicator  ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className=""
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm text-red-500 indicator-item">{cartItems?.length > 0 ? cartItems?.length : 0 }</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              {/* <span className="font-bold text-lg">{cartItems?.length > 0 ? cartItem?.length : 0 } Items</span> */}
              <span className="text-info">Subtotal: $$</span>
              <div className="card-actions">
                <button className="btn btn-primary text-2xl btn-block"  onClick={handleCart}>View cart</button>
              </div>
            </div>
          </div>
        </div>
      
      {user ? (
        // If user is logged in
        <div className="dropdown dropdown-end">
          {/* Dropdown menu for user */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            {/* User avatar */}
            <div className="w-10 rounded-full">
            <img
            src={user.name}
            alt="User Avatar"
            />

            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* Dropdown menu items */}
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        // If user is not logged in
        <div className="justify-center items-center text-black mx-5">
          <Link
            className="hover:text-xl hover:text-bg-slate-500 font-serif"
            to='/login'
          >
            Login
          </Link>
        </div>
      )}
    </div>
    </div>
  );
}
