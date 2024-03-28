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
    try {
      await dispatch(deleteCartItemByIdAsync({ userId, itemName }));
      toast.success('Item removed from cart');
      // Optionally, you can fetch the updated cart after removing an item
      dispatch(fetchCartByUserIdAsync(userId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
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

      <h1 className="text-3xl font-bold text-center mb-6 text-white">Shopping Cart</h1>
      <div
        id="#product"
        className="min-h-screen my-20 flex flex-col justify-center items-center py-8 sm:py-6 px-6 sm:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-24">
        {user ? (
          cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-orange-100 rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-500 ease-in-out"
              >
                <h1 className="text-lg font-bold text-black mb-1">{item.name}</h1>
                <img
                  src={item.imageUrl}
                  className="w-full h-36 object-cover"
                  alt={item.name}
                />
                <div className="">
                  <div className="w-100 m-1">
                    <div className="w-1/2 text-black font-lg">
                      <p >Sizes:{item.size}</p>
                    </div>
                    <div className="w-1/2 text-black font-lg">
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
                      <p> <span className="text-xl font-bold text-orange-500">
                                 ${item.price}
                            </span>
                    </p>
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
      </div>
      <div className="justify-center items-center mb-6 flex flex-row">
        {cartItems && cartItems.length > 0 && (
          <>
            <h2  className='text-orange-500 mx-5'>Total: ${getTotalPrice()}</h2>
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







