
import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import OAuthCallback from "./components/oauth"; // Import the OAuthCallback component
import NavBar from "./components/ui/navBar";
import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
// import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Product from "./components/product/product";
import Cart from "./components/cart/cart";
import ProductList from "./components/product/productList";
import Profile from "./components/profile/profile";
import UserOrders from "./components/orders/orderHistory";
import AdminDashboard from "./components/admin/admin";
import axios from "axios";
import { selectLoggedInUser,googleLoginAsync } from "./components/auth/AuthSlice";
import googleButton from "./assets/btn_google_signin_dark_pressed_web.png";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { useState } from "react";

import Login from './components/pages/Login'


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200)  return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          localStorage.setItem('user', JSON.stringify(resObject.user)); // Store user object in localStorage
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
    console.log("the user is " + user);
  }, []);

  console.log(user)
  return (
    <div className="App">
      {/* <div id="buttonDiv"></div> */}
      <NavBar user={user}/>
      <Routes>
        <Route path="/" element={<Home   user={user}/>} />
        {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/cart" element={<Cart user={user}/>} />
        <Route path="/product/List" element={<ProductList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/order"
          element={user ? <UserOrders /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
