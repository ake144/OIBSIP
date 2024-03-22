import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import {thunk} from 'redux-thunk';


const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk);


const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: process.env.NODE_ENV === "development",
});

export default store;
