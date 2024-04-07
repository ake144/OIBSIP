import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync, selectLoginStatus, selectLoginError, clearLoginError } from './AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector(selectLoginStatus);
  const loginError = useSelector(selectLoginError);

  // Clear login error on component mount
  useEffect(() => {
    return () => {
      dispatch(clearLoginError());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginAsync({ email, password }));
  };

  // Handle login status change
  useEffect(() => {
    if (loginStatus === 'fulfilled') {
      toast.success('Successfully logged in. Welcome to AkejaPizza!');
      navigate('/');
    } else if (loginStatus === 'rejected') {
      toast.error(loginError || 'Wrong email or password. Please try again.');
    }
  }, [loginStatus, loginError, navigate]);

  const handleForgot = () => {
    navigate('/forgotpassword');
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center">
        <form className="" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className="bg-black text-white p-3 m-4 border-1" type="submit" disabled={loginStatus === 'pending'}>
            {loginStatus === 'pending' ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <div className="justify-center items-center">
          <button className="bg-black text-white p-3 m-4 border-1" onClick={handleForgot}>
            Forgot Password
          </button>
        </div>
        <div className="item-center justify-center flex flex-col p-4 m-4 w-1/4">
          <p className="p-5 m-">Don't have an account?</p>
          <button className="" onClick={() => navigate('/signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
