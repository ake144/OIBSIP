import {configureStore} from '@reduxjs/toolkit'

import orderSlice from '../components/orders/orderSlice'


const Store= configureStore({
    reducer:{
        orderSlice
    }

})
export default Store