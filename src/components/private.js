import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ path }) => {
  // Simulate user authentication status
  const auth = true; // Change this to your actual authentication logic

  // If user is authenticated, render the child components
  if (auth) {
    return <Outlet />;
  } else {
    // If not authenticated, navigate to the login page
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;
