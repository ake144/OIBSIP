import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {signupAsync,  clearSignupError, selectSignupStatus, selectSignupError} from './AuthSlice'
import { useDispatch, useSelector } from 'react-redux';



const Signup = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const signupStatus = useSelector(selectSignupStatus)
  const signupError = useSelector(selectSignupError)


  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Password and Confirm Password do not match.');
      return;
    }
    dispatch(signupAsync({ name, email, password }))
  };

  React.useEffect(() => {
    if (signupStatus === 'fulfilled') {
      alert('successfully registered, please check your email ')
      console.log('Signup successful');
      navigate('/verify');
    }
  }, [signupStatus, navigate]);

  // Handle signup error change
  React.useEffect(() => {
    if (signupError) {
      console.error('Signup error:', signupError);
      // Clear signup error after displaying it
      dispatch(clearSignupError());
    }
  }, [signupError, dispatch]);

  return (
    <>
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

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 mt-3 rounded-md"
            disabled={signupStatus === 'pending'}
          >
            {signupStatus === 'pending' ? 'Signing Up...' : 'Sign Up'}
          </button>
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
