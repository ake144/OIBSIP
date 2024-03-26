import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/ui/navBar';
import Home from './components/Home';
import Login from './components/auth/login'; // Update import path
import Signup from './components/auth/signup'; // Update import path
import Product from './components/product/product';
import Cart from './components/cart/cart';
import ProductList from './components/product/productList';
import Profile from './components/profile/profile'
import UserOrders from './components/checkout/checkout';
import ForgotPassword from './components/forgotpass/ForgotPassword';
import Verification from './components/auth/verify'
import ResetPassword from './components/forgotpass/ResetPassword'
import AdminDashboard from './components/admin/admin'; // Import AdminDashboard component
import PrivateRoute from './components/private'

function App() {


  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product/List' element={<ProductList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/order' element={<UserOrders />} />
          <Route path='/forgotPassword' element={<ForgotPassword />} />
          <Route path='/verify' element={<Verification />} />
          <Route path='/resetPassword' element={<ResetPassword />} />
            {/* <Route path='/admin/*' element={<PrivateRoute />} />
            <Route path='/admin' element={<AdminDashboard />} /> */}
            <Route path='/admin'  element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
