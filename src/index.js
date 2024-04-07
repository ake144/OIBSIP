import React from 'react';
import { createRoot } from 'react-dom'; // Import createRoot instead of ReactDOM
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
