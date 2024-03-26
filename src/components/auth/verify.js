import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import {verifyOtpAsync,selectOtpVerificationStatus} from './AuthSlice'

const Verification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const  verificationStatus = useSelector(selectOtpVerificationStatus)

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

     dispatch(verifyOtpAsync(verificationCode))
  };

  useEffect(() => {
    if (verificationStatus === 'fulfilled') {
      navigate('/login');
    }
  }, [verificationStatus, navigate]);

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
        <button type="submit" disabled={verificationStatus === 'pending'}>
          {verificationStatus === 'pending' ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      {verificationError && <p>{verificationError}</p>}
    </div>
  );
};

export default Verification;
