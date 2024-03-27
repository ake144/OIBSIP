import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {addToCart,fetchCartByUserId,deleteCartByUserId } from './CartApi'

const initiateState = {
    status:'idle',
    items:[],
    cartItemAddStatus:'idle',
    cartItemRemoveStatus:'idle',
    error:null,
    successMessage:null
}

export const addToCartAsync = createAsyncThunk('cart/addToCartAsync',async ({ userId, item })=>{
     const  addedItem = await addToCart(userId,{ ...item, quantity: 1 })
     return addedItem
})
export const fetchCartByUserIdAsync=createAsyncThunk('/cart/fetchCartByUserIdAsync',async(id)=>{
    const items = await fetchCartByUserId(id)
    return items
})

export const deleteCartItemByIdAsync= createAsyncThunk('/cart/deleteCartItemByIdAsync',async({ userId, itemName })=>{
      const deletedItem  = await deleteCartByUserId(userId,itemName)
      return deletedItem
})

const cartSlice = createSlice({
    name:'cartSlice',
    initialState:initiateState,
    reducers:{
        increaseQuantity(state, action) {
            const { itemId } = action.payload;
            const item = state.items.find((item) => item._id === itemId);
            if (item) {
              item.quantity += 1;
            }
          },
          decreaseQuantity(state, action) {
            const { itemId } = action.payload;
            const item = state.items.find((item) => item._id === itemId);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
            }
          }
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


export const { increaseQuantity, decreaseQuantity } = cartSlice.actions;


export const selectCartStatus=(state)=>state.cartSlice.status
export const selectCartItems=(state)=>state.cartSlice.items
export const selectCartErrors=(state)=>state.cartSlice.error
export const selectCartSuccessMessage=(state)=>state.cartSlice.successMessage
export const selectCartItemAddStatus=(state)=>state.cartSlice.cartItemAddStatus
export const selectCartItemRemoveStatus=(state)=>state.cartSlice.cartItemRemoveStatus

export default cartSlice.reducer
