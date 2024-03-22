import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Password and Confirm Password do not match.');
      return;
    }

    axios
      .post('http://localhost:3001/register', { name, email, password })
      .then((result) => {
        console.log(result.data); 
        navigate('/verify')// Assuming the server sends back the saved user data
      })
      .catch((err) => {
        console.error('Error during registration:', err);
      });
  };

  return (
    <>
      <div>Signup</div>
      <div className="flex items-center justify-center">
        <form className="flex flex-col justify-center items-center p-5 m-7" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="bg-blue-500 text-white p-2 mt-3 rounded-md">Sign Up</button>
        </form>

        <div className="flex flex-col justify-center items-center p-4 m-4">
          <p>Already have an account?</p>
          <button className="text-blue-500" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
