import {configureStore} from '@reduxjs/toolkit'

import orderSlice from '../components/orders/orderSlice'
import cartSlice from '../components/cart/cartSlice'
import productSlice from '../components/product/productSlice'
import authSlice from '../components/auth/AuthSlice'

const Store= configureStore({
    reducer:{
        orderSlice,
        cartSlice,
        productSlice,
        authSlice
        

    }

})
export default Store