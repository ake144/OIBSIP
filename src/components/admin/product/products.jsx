import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPizzaAsync, selectGetItems } from '../../product/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectGetItems);

  useEffect(() => {
    dispatch(fetchAllPizzaAsync());
  }, [dispatch]);

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
