import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Verification = () => {
    const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the backend to verify the verification code
      const response = await axios.post(`http://localhost:3001/api/verify/${verificationCode}`);
      console.log(response.data); // Handle successful verification response
      navigate('/login')
    } catch (error) {
      console.error('Error during verification:', error);
      setVerificationError('Verification failed. Please check your code and try again.');
    }
  };

  return (
    <div>
      <h2>Verification</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="verificationCode">Verification Code:</label>
        <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />

        <button type="submit">Verify</button>
      </form>
      {verificationError && <p>{verificationError}</p>}
    </div>
  );
};

export default Verification;
