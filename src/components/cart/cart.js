import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowCircleLeft } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  fetchCartByUserIdAsync,
  deleteCartItemByIdAsync,
  decreaseQuantity,
  increaseQuantity,
  clearCartAsync,
  selectCartItems
} from './cartSlice';
import { createOrderAsync } from '../orders/orderSlice';

const stripePromise = loadStripe("pk_test_51P01fXAYcNrWXb0ztEt8lIVOpr0StaaCDMIZgti1y0k8DSxfUxmtl8vBQdke3pQ4SB7fwzGkrFPRToEOcMJ5bCMn00nlxzLYQE");

const Cart = ({ user }) => {
  const dispatch = useDispatch();
  const userId = user?._id;

  const cartItems = useSelector(selectCartItems);

  console.log(cartItems);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartByUserIdAsync(userId)); // Fetch cart items for the logged-in user
    }
  }, [dispatch, userId]);

  const removeItemFromCart = async (itemName) => {
    try {
      await dispatch(deleteCartItemByIdAsync({ userId, itemName }));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });

    return totalPrice;
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseQuantity({ itemId }));
  };

  const handleIncrease = (itemId) => {
    dispatch(increaseQuantity({ itemId }));
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const checkout = async () => {
      try {
        const body = {
          userId,
          cartItems
        };
        const headers = {
          "Content-Type": "application/json"
        };
        const res = await fetch("http://localhost:3001/api/checkout", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body)
        });

        const session = await res.json();
        const result = await stripe.redirectToCheckout({
          sessionId: session.id
        });

        console.log("the result of payment ", result)

        if (result.error) {
          throw new Error(result.error.message);
        } else {
          console.log("Payment successful");
          await dispatch(createOrderAsync({ userId, cartItems }));
          await dispatch(clearCartAsync(userId));
          console.log("Cart items removed successfully");
        }
      } catch (error) {
        console.error('Error during checkout:', error);
        toast.error('Failed to process checkout');
      }
    };

    return (
      <button onClick={checkout} className="btn btn-info">
        Checkout
      </button>
    );
  };


  return (
    <div>
      <ToastContainer />
      <Link to="/">
        <HiArrowCircleLeft />
      </Link>

      <h1 className="text-3xl font-bold text-center mb-6 text-white">Shopping Cart</h1>
      <div className="min-h-screen my-20 flex flex-col justify-center items-center py-8 sm:py-6 px-6 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-24">
        {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="bg-orange-100 rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-500 ease-in-out">
                  <h1 className="text-lg font-bold text-black mb-1">{item.product.name}</h1>
                  <img src={item.product.imageUrl} className="w-full h-36 object-cover" alt={item.product.name} />
                  <div className="w-100 m-1">
                    <div className="w-1/2 text-black font-lg">
                      <p>Sizes: {item.product.size}</p>
                    </div>
                    <div className="w-1/2 text-black font-lg">
                      <p>Quantity: {item.quantity}</p>
                      <div className="flex items-center">
                        <button className="text-2xl gap-4 mx-4" onClick={() => handleDecrease(item._id)}>-</button>
                        <span>{item.quantity}</span>
                        <button className="text-2xl gap-4 mx-4" onClick={() => handleIncrease(item._id)}>+</button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-100 m-1">
                      <p><span className="text-xl font-bold text-orange-500">${item.product.price}</span></p>
                    </div>
                    <div className="w-30 align-end items-end m-1">
                      <button onClick={() => removeItemFromCart(item.product.name)} className="btn align-end items btn-error">REMOVE FROM CART</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4>No items in the cart</h4>
            )}

        </div>
      </div>
      <div className="justify-center items-center mb-6 flex flex-row">
        {user?.cartItem?.length > 0 && (
          <>
            <h2 className='text-orange-500 mx-5'>Total: ${getTotalPrice()}</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
