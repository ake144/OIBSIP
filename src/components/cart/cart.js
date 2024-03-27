import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addToCartAsync,
  fetchCartByUserIdAsync,
  deleteCartItemByIdAsync,
  decreaseQuantity,
  increaseQuantity,
  selectCartItems,
  selectCartItemAddStatus,
  selectCartItemRemoveStatus
} from './cartSlice';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItemAddStatus = useSelector(selectCartItemAddStatus);
  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus);
  const userId = localStorage.getItem("userID");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(fetchCartByUserIdAsync(userId));
  }, [userId, dispatch]);

  const removeItemFromCart = async (userId, itemName) => {
    dispatch(deleteCartItemByIdAsync({ userId, itemName }));
    toast.success('Item removed from cart');
  };

  const checkout = async (e) => {
    // Checkout logic
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    return totalPrice;
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity({ itemId }));
  };

  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity({ itemId }));
  };

  return (
    <div>
      <ToastContainer />
      <Link to="/">
        <HiArrowCircleLeft />
      </Link>

      <h1 className="justify-center items-center text-2xl">Shopping Cart</h1>
      <div
        id="#product"
        className="flex flex-wrap justify-center items-center gap-7"
      >
        {user ? (
          cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex  flex-wrap  shadow-lg p-3 mb-5 bg-white rounded-lg mx-3 my-3 w-1/3"
              >
                <h1 className="text-1xl font-bold p-5 m-5">{item.name}</h1>
                <img
                  src={item.imageUrl}
                  className="h-18 w-20 img-fluid"
                  alt={item.name}
                />
                <div className="">
                  <div className="w-100 m-1">
                    <div className="w-1/2">
                      <p>Sizes:{item.size}</p>
                    </div>
                    <div className="w-1/2">
                      <p>Quantity:</p>
                      <div className="flex items-center">
                        <button
                          className="text-2xl gap-4 mx-4"
                          onClick={() => handleDecrease(item._id)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="text-2xl gap-4 mx-4"
                          onClick={() => handleIncrease(item._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="w-100 m-1">
                    <h1 className="mt-1 text-black">
                      Price: {item.price * item.quantity}
                    </h1>
                  </div>
                  <div className="w-30 align-end items-end m-1">
                    <button
                      onClick={() => removeItemFromCart(userId, item.name)}
                      className="btn align-end items btn-error"
                    >
                      REMOVE FROM CART
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4>No items in the cart</h4>
          )
        ) : (
          <h4>You don't have any item in the cart, please Login</h4>
        )}
      </div>
      <div className="justify-center items-center flex flex-row">
        {user?.cartItems && user?.cartItems.length > 0 && (
          <>
            <h2>Total: ${getTotalPrice()}</h2>
            <button onClick={checkout} className="btn btn-info">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
