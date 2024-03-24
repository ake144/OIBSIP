import React, { useState, useEffect } from 'react';
import CustomToast from './ui/toast';
import axios from 'axios';



function Home() {

  const [pizzas, setPizzas] = useState([]);
  const [pizzaOrders, setPizzaOrders] = useState([]);
  const [selectedPizzaIndex, setSelectedPizzaIndex] = useState(null);

  const getAllPizzas = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/getPizzas');
      return res.data;
    } catch (error) {
      console.error('Error fetching pizzas:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pizzasData = await getAllPizzas();
        setPizzas(pizzasData);
        setPizzaOrders(pizzasData.map(() => ({ quantity: 1 })));
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };
    fetchData();
  }, []);

  const handleQuantityChange = (index, newQuantity) => {
    setPizzaOrders(prevOrders => {
      const newOrders = [...prevOrders];
      if (newOrders[index]) {
        newOrders[index].quantity = newQuantity;
      }
      return newOrders;
    });
  };
  
  const closeModal = () => {
    setSelectedPizzaIndex(null);
  };

  const addToCart = (selectedFood, index) => {
    if (selectedFood) {
      const currentTime = new Date();
      const cartItem = {
        id: selectedFood._id,
        name: selectedFood.name,
        description: selectedFood.description,
        base: selectedFood.base,
        sauces: selectedFood.sauces,
        veggies: selectedFood.veggies,
        cheeses: selectedFood.cheeses,
        price: selectedFood.price,
        size: selectedFood.size,
        img: selectedFood.image_url,
        timeAdded: currentTime.toLocaleString(),
      };
      const userId = localStorage.getItem('userID');
      fetch(`http://localhost:3001/api/add-to-cart/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Server response:', data);
          if (data.error) {
            if (data.error === 'Item already in cart') {
              showToastForCaseOne();
            } else if (data.message === 'Item already in cart. Please select different size option') {
              showToastForCaseTwo();
            } else if (data.error === 'User not found') {
              showToastForCaseThree();
            }
          } else if (data.message && data.message === 'Item added to cart') {
            showToast();
          }
        })
        .catch(error => console.error('Error adding to cart:', error));
    }
  };

  const showToastForCaseOne = () => {
    CustomToast({ message: 'Item already in cart', type: 'error' });
  };

  const showToastForCaseTwo = () => {
    CustomToast({ message: 'Item already in cart. Please select different quantity', type: 'error' });
  };

  const showToastForCaseThree = () => {
    CustomToast({ message: 'You need to sign in first!', type: 'error' });
  };

  const showToast = () => {
    CustomToast({ message: 'Item added to cart', type: 'success' });
  };
  return (
    <>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('/pizza1.jpg')` }}>
        <div className=" flex flex-col pt-12 items-center justify-center">
          <h1 className="text-2xl gap-5 p-3 text-white">
            We Have{' '}
            <span className="text-white font-bold">The BEST PIZZA</span>
          </h1>
          <p className="font-mono p-3 text-white">Time to Enjoy our delicious Pizza</p>
          <button className="bg-black text-white p-3 m-3 border-2">
            Order Now
          </button>
        </div>
      </div>

      <h2 className='text-3xl justify-center items-center'>Trending Recipes</h2>
      <div className='flex flex-wrap justify-center items-center gap-10'>
        {pizzas.map((pizza, index) => (
          <div key={index} className="shadow-lg p-3 mb-5 bg-white rounded-lg mx-3 my-3 w-1/3">
            <h1 className="text-3xl font-bold p-5 m-5">{pizza.name}</h1>
            <img
              src={pizza.imageUrl}
              className="h-25 w-1/2 img-fluid"
              alt={pizza.name}
              onClick={() => setSelectedPizzaIndex(index)}
            />
            <div className="flex flex-col">
              <div className="w-100 m-1">
                <div className='w-1/2'>
                  <p>Sizes</p>
                    {pizza.size}
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
                <h1 className='mt-1 text-black'>Price: {pizza.price * pizzaOrders[index].quantity}</h1>
              </div>
              <div className="w-100 m-1">
                <button className="bg-black text-white p-3 m-3 border-2" onClick={() => addToCart(pizza)}>
                  ADD TO CART
                </button>
              </div>
            </div>

            {selectedPizzaIndex === index && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute bg-white rounded-lg shadow-lg max-w-lg mx-auto" onClick={(e) => e.stopPropagation()}>
                  {/* Modal content */}
                  <div className="p-4 md:p-5 space-y-4">
                    <button type="button" className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700" onClick={closeModal}>
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <img src={pizza.imageUrl} className="h-25 w-1/2 img-fluid" alt={pizza.name} onClick={closeModal} />
                    <h3 className="text-xl font-medium text-gray-900">{pizza.name}</h3>
                    <p className="text-base leading-relaxed text-gray-500">{pizza.description}</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
      {/* Rest of content */}
      <div className="flex flex-col items-center justify-center p-10 m-10">
        <h1 className="text-3xl font-bold p-5 m-5">About Us</h1>
        <p>Lorem ipsum dolor sit amr,</p>
        <p>ispumln the iolrst oprmum sor dol yisnnsk</p>
        <p>Lorem ipsum dolor sit amr,</p>
        <p>ispumln the iolrst oprmum sor dol yisnnsk</p>
      </div>
      <div className="flex flex-col items-center justify-center p-5 m-3">
        <h1 className="text-3xl font-bold p-5 m-5">CONTACT US</h1>
        <p>+46 738 123 234</p>
      </div>
    </>
  );
}

export default Home;

