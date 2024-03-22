import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [base, setBase] = useState('');
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [veggies, setVeggies] = useState([]);
  const [size, setSize] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [bases, setBases] = useState([]);

  useEffect(() => {
    // Fetch ingredients data from the backend
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/inventory');
      const { bases, sauces, cheeses, veggies } = response.data;
  
      // Check if bases array is not empty and has at least one item
      if (Array.isArray(bases) && bases.length > 0) {
        setBase(bases[0]._id); // Assuming the first base is selected by default
        setBases(bases); // Store bases in state
      }
  
      setSauces(sauces.map((sauce) => sauce._id));
      setCheeses(cheeses.map((cheese) => cheese._id));
      setVeggies(veggies.map((veggie) => veggie._id));
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      price,
      base,
      sauces,
      cheeses,
      veggies,
      size,
      imageUrl,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/admin/add-product', product);
      console.log(response.data); // Assuming the server sends back the saved product data
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      <div>Product</div>
      <div className="flex items-center justify-center">
        <form className="flex flex-col justify-center items-center p-5 m-7" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor="base">Base:</label>
          <select id="base" value={base} onChange={(e) => setBase(e.target.value)}>
            {bases?.map((base) => (
              <option key={base._id} value={base._id}>{base.item}</option>
            ))}
          </select>
          <label htmlFor="sauces">Sauces:</label>
          <select multiple id="sauces" value={sauces} onChange={(e) => setSauces(Array.from(e.target.selectedOptions, option => option.value))}>
            {sauces?.map((sauce) => (
              <option key={sauce._id} value={sauce._id}>{sauce.item}</option>
            ))}
          </select>
          <label htmlFor="cheeses">Cheeses:</label>
          <select multiple id="cheeses" value={cheeses} onChange={(e) => setCheeses(Array.from(e.target.selectedOptions, option => option.value))}>
            {cheeses.map((cheese) => (
              <option key={cheese._id} value={cheese._id}>{cheese.item}</option>
            ))}
          </select>
          <label htmlFor="veggies">Veggies:</label>
          <select multiple id="veggies" value={veggies} onChange={(e) => setVeggies(Array.from(e.target.selectedOptions, option => option.value))}>
            {veggies.map((veggie) => (
              <option key={veggie._id} value={veggie._id}>{veggie.item}</option>
            ))}
          </select>
          <label htmlFor='size'>Size:</label>
          <input type="text" id="size" onChange={(e) => setSize(e.target.value)} />
          <label htmlFor="imageUrl">Image URL:</label>
          <input type="text" id="imageUrl" onChange={(e) => setImageUrl(e.target.value)} />
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" onChange={(e) => setPrice(e.target.value)} />
          <button className='' type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
};

export default Product;
