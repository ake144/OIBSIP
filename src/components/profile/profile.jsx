import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { selectLoggedInUser } from '../auth/AuthSlice';

function Profile() {
 
  
  const user = useSelector(selectLoggedInUser)
  

  return (
    <div className='item-center justify-center p-7 m-8'>
      <h2>Profile</h2>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
