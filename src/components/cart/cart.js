import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowCircleLeft } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [pizzaOrders, setPizzaOrders] = useState([]); // Initialize pizzaOrders state
  const userId = localStorage.getItem('userID');

  const getSelectedPizza = async () => {
    try {
      const selectedPizza = await axios.get('http://localhost:3001/api/getCartItems/' + userId);
      setCart(selectedPizza.data);
      console.log(selectedPizza.data);
      // Initialize pizzaOrders with default size and quantity
      setPizzaOrders(selectedPizza.data.map(() => ({ size: 'small', quantity: 1 })));
    } catch (error) {
      console.error('Error fetching selected pizza:', error);
    }
  };

  useEffect(() => {
    getSelectedPizza();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch(`/api/getCartItems/${userId}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const checkout = async () => {
    try {
      const { data: { key } } = await axios.get('http://localhost:3001/api/checkout/key');
      const { data: { order } } = await axios.post('http://localhost:3001/api/checkout', { cart, key });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Ayushi Narang",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `http://localhost:3001/api/checkout/paymentVerification/${userId}`,
        prefill: {
          name: "Ayushi Narang",
          email: "ayushinarang21@gmail.com",
          contact: "8053225445"
        },
        notes: {
          address: "Pizzadoe Office"
        },
        theme: {
          color: "#3399cc"
        }
      }

      const razor = new window.Razorpay(options);

      razor.open();

      razor.on('payment.success', async (response) => {
        console.log('Payment Success:', response);
        // Redirect to success page
       navigate('/checkout');

      });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  }


  const removeItemFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`/api/cart/remove/${userId}/${itemId}`);
      setCart(prevCart => prevCart.filter(item => item._id !== itemId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  

  const getTotal = () => {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price * pizzaOrders[index].quantity;
    });
    return total;
  };
  

  useEffect(() => {
    fetchCart();
  }, []);

  const handleSizeChange = (index, newSize) => {
    setPizzaOrders(prevOrders => {
      const newOrders = [...prevOrders];
      newOrders[index].size = newSize;
      return newOrders;
    });
  };

  const handleQuantityChange = (index, newQuantity) => {
    setPizzaOrders(prevOrders => {
      const newOrders = [...prevOrders];
      newOrders[index].quantity = newQuantity;
      return newOrders;
    });
  };

  return (
    <div>
      <Link to="/">
        <HiArrowCircleLeft />
      </Link>

      <h1 className="justify-center items-center text-2xl">Shopping Cart</h1>
      <div className="justify-center items-center flex flex-row">
        {cart.map((item, index) => (
          <div key={index} className="shadow-lg p-3 mb-5 bg-white rounded-lg mx-3 my-3 w-1/3">
            <h1 className="text-3xl font-bold p-5 m-5">{item.name}</h1>
            <img src={item.imageUrl} className="h-25 w-1/2 img-fluid" alt={item.name} />
            <div className="flex flex-col">
              <div className="w-100 m-1">
                <div className='w-1/2'>
                  <p>Sizes</p>
                  <select
                    className="form-select"
                    value={pizzaOrders[index].size}
                    onChange={(e) => handleSizeChange(index, e.target.value)}
                    aria-label="Default select example"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className='w-1/2'>
                  <p>Quantity</p>
                  <select
                    className="form-select"
                    value={pizzaOrders[index].quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                    aria-label="Default select example"
                  >
                    {[...Array(10)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="w-100 m-1">
                <h1 className='mt-1 text-black'>Price: {item.price * pizzaOrders[index].quantity  }</h1>
              </div>
              <div className="w-100 m-1">
              <button className="bg-black text-white p-3 m-3 border-2" onClick={() => removeItemFromCart(item._id)}>
                      REMOVE FROM CART
              </button>

              </div>
            </div>
          </div>
        ))}
      </div>
      <div  className='justify-center items-center flex flex-row'>
        <h2>Total: ${getTotal()}</h2>
        <button className="bg-black text-white p-3 m-4 border-1 " onClick={checkout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
