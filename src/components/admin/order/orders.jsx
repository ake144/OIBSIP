// components/Orders.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOrderAsync, selectOrders } from '../../orders/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getAllOrderAsync());
  }, [dispatch]);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
