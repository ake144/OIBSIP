import cartSlice from './cart/cartSlice';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    cart: cartSlice.reducer,
});
export default rootReducer;