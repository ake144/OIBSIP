export const GET_ALL_PIZZAS = 'getAllPizzas'
export const GET_PIZZA_BY_ID = 'getPizza'



export const ADD_TO_CART = 'addToCart'
export const REMOVE_FROM_CART = 'removeFromCart'
export const GET_CART_ITEMS = 'getCartItems'

export const CHECKOUT_REQUEST = 'Checkout'
export const CHECKOUT_SUCCESS= 'CheckoutSuccess'
export const CHECKOUT_FAILURE = 'CheckoutFailure'



export const getPizzas = () => {
    return{
        type: GET_ALL_PIZZAS,
    }
};

export const addCart= (product_id)=>{
    return{
         product_id,
         type:ADD_TO_CART,
    }
}

export const removeCart=(product_id)=>({
    payload: product_id,
     type:REMOVE_FROM_CART
})

export const cartItems=()=>({
    type:GET_CART_ITEMS
})


export const checkout=()=>({
    type:CHECKOUT_REQUEST
})
export const checkoutSuccess=(cart)=>({
    type:CHECKOUT_SUCCESS,
    payload:cart
})
export const  CheckoutFailure=(error)=>({
    type:CHECKOUT_FAILURE,
    payload:error
})