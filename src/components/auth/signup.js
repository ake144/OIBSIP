import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signupAsync, clearSignupError, selectSignupStatus, selectSignupError } from './AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const signupStatus = useSelector(selectSignupStatus);
  const signupError = useSelector(selectSignupError);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      console.error('Password and Confirm Password do not match.');
      toast.error('Password and Confirm Password do not match.');
      return;
    }
  
    dispatch(signupAsync({ name, email, password }));
  };
  

  useEffect(() => {
    console.log("Login Status Changed:", signupStatus);
    if (signupStatus === 'fulfilled') {
      showToast();
      navigate('/verify');
    } else{
      showToast2();
    }
  }, [signupStatus, navigate]);

  const showToast2 = () => {
    toast.error("Signup failed. Please try again."); // Or show signupError.message if it's available
  };


  const showToast = () => {
    toast.success('Successfully registered! Please check your email.');
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center">
        <form className="flex flex-col justify-center items-center p-5 m-7" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" autocomplete='username' onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password:</label>
          <input  autocomplete="new-password" type="password" id="password" onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
          autocomplete='current-password'
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
        {signupError && (
          <div className="justify-center items-center">
            <p className="text-red-600  p-6 m-6 text-md">{signupError.message}</p> {/* Access message property */}
          </div>
        )}
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
