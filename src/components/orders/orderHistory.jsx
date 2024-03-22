import React, { useState, useEffect } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('userID');

  useEffect(() => {
    // Fetch order history from backend API
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`/api/orders/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order history');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, [userId]); // Include userId in the dependency array to fetch orders when userId changes

  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id}>
            <p>Order ID: {order._id}</p>
                <p>Date: {order.date}</p>
                <p>Total: ${order.total}</p>


          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderHistory;
