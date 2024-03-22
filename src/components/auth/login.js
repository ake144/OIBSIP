import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
const [error , setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

    // Assuming the server sends a user object with an ID upon successful login
    const { _id } = response.data;

    // Handle successful login, for example, store user ID in local storage
    const user = response.data;
    
    localStorage.setItem('userID', _id);

      console.log('Login successful:', user);

      // Redirect to a protected route (e.g., dashboard) after successful login
      navigate('/');
    } catch (error) {
      // Handle login errors, for example, display an error message
      console.log('Login failed:', error.response ? error.response.data : error.message);
    setError(error.response.data || 'Check your credentials and try again')
  };

}
const handleForgot=()=>{
  navigate('/forgotpassword')
}

  return (
    <>
      <div>Login</div>
      <div className='flex flex-col justify-center items-center'>
        <form className='' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor='password'>Password:</label>
          <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='bg-black text-white p-3 m-4 border-1 ' type='submit'>Login</button>
        </form>
          {error && 
             <div className='justify-center items-center'>
                     <p className='text-red-600'>{error}</p>
                     <button className='bg-black text-white p-3 m-4 border-1' onClick={ handleForgot}> forgotPassword  </button>
             </div>
                
          }

        <div className='item-center justify-center flex flex-col p-4 m-4 w-1/4'>
          <p className='p-5 m-'>Don't have an account?</p>
          <button className='' onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default Login;
