import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {addToCart,fetchCartByUserId,deleteCartItemById} from './CartApi'

const initiateState = {
    status:'idle',
    items:[],
    cartItemAddStatus:'idle',
    cartItemRemoveStatus:'idle',
    error:null,
    successMessage:null
}

export const addToCartAsync = createAsyncThunk('cart/addToCartAsync',async(item)=>{
     const  addedItem = await addToCart(item)
     return addedItem
})
export const fetchCartByUserIdAsync=createAsyncThunk('/cart/fetchCartByUserIdAsync',async(id)=>{
    const items = await fetchCartByUserId(id)
    return items
})

export const deleteCartItemByIdAsync= createAsyncThunk('/cart/deleteCartItemByIdAsync',async(id)=>{
      const deletedItem  = await deleteCartItemById(id)
      return deletedItem
})

const cartSlice = createSlice({
    name:'cartSlice',
    initialState:initiateState,
    reducers:{
        
        
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addToCartAsync.pending,(state)=>{
                state.cartItemAddStatus= 'pending'
            })
            .addCase(addToCartAsync.fulfilled,(state,action)=>{
                state.cartItemAddStatus= 'fulfilled'
                state.items.push(action.payload)
            })
            .addCase(addToCartAsync.rejected,(state,action)=>{
                state.cartItemAddStatus= 'rejected'
                state.error= action.error
            })
            .addCase(fetchCartByUserIdAsync.pending,(state)=>{
                state.status= 'pending'
            })
            .addCase(fetchCartByUserIdAsync.fulfilled,(state,action)=>{
                state.status= 'fulfilled'
                state.items = action.payload
            })
            .addCase(fetchCartByUserIdAsync.rejected,(state,action)=>{
                state.status= 'rejected'
                state.error= action.error
            })
            .addCase(deleteCartItemByIdAsync.pending,(state)=>{
                state.cartItemRemoveStatus= 'pending'
            })
            .addCase(deleteCartItemByIdAsync.fulfilled,(state,action)=>{
                state.cartItemRemoveStatus= 'fulfilled'
                state.items = state.items.filter((item)=>item._id!==action.payload._id)
            })
            .addCase(deleteCartItemByIdAsync.rejected,(state,action)=>{
                state.cartItemRemoveStatus= 'rejected'
                state.error= action.error
            })

    }


})

export const selectCartStatus=(state)=>state.CartSlice.status
export const selectCartItems=(state)=>state.CartSlice.items
export const selectCartErrors=(state)=>state.CartSlice.error
export const selectCartSuccessMessage=(state)=>state.CartSlice.successMessage
export const selectCartItemAddStatus=(state)=>state.CartSlice.cartItemAddStatus
export const selectCartItemRemoveStatus=(state)=>state.CartSlice.cartItemRemoveStatus

export default cartSlice.reducer
