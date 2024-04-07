import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderByUserIdAsync, resetOrderFetchStatus, selectOrderFetchStatus, selectOrders } from './orderSlice';
import { toast } from 'react-toastify';
import { selectLoggedInUser } from '../auth/AuthSlice';

const  UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const user = useSelector(selectLoggedInUser)
  const orderFetchStatus = useSelector(selectOrderFetchStatus);

  const id = user._id

  useEffect(() => {
    dispatch(getOrderByUserIdAsync(id));
  }, [dispatch]);

  useEffect(() => {
    if (orderFetchStatus === 'rejected') {
      toast.error('Error fetching orders, please try again later');
    }
  }, [orderFetchStatus]);

  useEffect(() => {
    return () => {
      dispatch(resetOrderFetchStatus());
    };
  }, [dispatch]);

  return (
    <div>
      {orderFetchStatus === 'pending' ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <h4>Order History</h4>
          <p>Check the status of the recent orders</p>
          {orders &&
            orders.map((order) => (
              <div key={order._id}>
                <p>Order Number: {order._id}</p>
                <p>Date of placed: {new Date(order.createdAt).toDateString()}</p>
                <p>Total Amount: ${order.total}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;