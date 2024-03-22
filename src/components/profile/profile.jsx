import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Profile() {
  const [user, setUser] = useState(null);
   const userId = localStorage.getItem('userID');
   useEffect(() => {
    axios
     .get('http://localhost:3001/api/getuser/' + userId)
     .then((res) => {
        setUser(res.data);
      })
     .catch((err) => {
        console.error(err);
      });
  }, []);

  
  

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
