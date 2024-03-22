// ProductList.js
import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Our Pizzas</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            <p>{product.name}</p>
            <p>Price: ${product.price}</p>
            <button>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
