import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowCircleLeft } from 'react-icons/hi';



const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`http://localhost:5000/api/orders/${userID}`)
      .then(response => response.json())
      .then(data => {
        setOrders(data.Orders);
      })
      .catch(error => console.error('Error fetching cart items:', error));
  };

  useEffect(() => {
    fetchOrders();
  }, []); 

  return (
    <div className='custom-container'>
      <Link to="/">
        <HiArrowCircleLeft className="back-arrow" />
      </Link>
      <div className="screen">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders made</p>
        ) : (
          <ul>
            {orders.map(item => (
              <li key={item.id}>
                {item.img !== "" ? (
                  <>
                    <img src={item.img} height="100" width="135" alt={item.name}></img>
                  </>
                ) : (
                  <>
                    <p>No image</p>
                  </>
                )}
                <div className="item">
                  <div className="item-description">
                    <h4>{item.name}</h4>
                    <p className='price'> Rs. {item.price} </p>
                  </div>
                  <div className="status">
                    {item.Status}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Orders;