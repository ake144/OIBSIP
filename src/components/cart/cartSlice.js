import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {addToCart,fetchCartByUserId,deleteCartByUserId,clearCart  } from './CartApi'

const initiateState = {
    status:'idle',
    items: [],
    cartItemAddStatus:'idle',
    cartItemRemoveStatus:'idle',
    error:null,
    successMessage:null
}

export const addToCartAsync = createAsyncThunk(
    'cart/addToCartAsync',
    async ({ userId, productId }) => {
      try {
        const addedItem = await addToCart(userId, { productId });
        return addedItem;
      } catch (error) {
        throw error;
      }
    }
  );

export const fetchCartByUserIdAsync = createAsyncThunk(
    'cart/fetchCartByUserIdAsync',
    async (userId) => {
      try {
        const items = await fetchCartByUserId(userId);
        return items;
      } catch (error) {
        throw error;
      }
    }
  );

export const deleteCartItemByIdAsync= createAsyncThunk('/cart/deleteCartItemByIdAsync',async({ userId, itemName })=>{
      const deletedItem  = await deleteCartByUserId(userId,itemName)
      return deletedItem
})
export const clearCartAsync = createAsyncThunk('cart/clearCartAsync',async (userId) => {
    const cartItems = await clearCart(userId)
    return cartItems
      
    }
  );

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
        clearCartData(state) {
            state.cartItems = []},
    extraReducers:(builder)=>{
        builder
            .addCase(addToCartAsync.pending,(state)=>{
                state.cartItemAddStatus= 'pending'
            })
            .addCase(addToCartAsync.fulfilled,(state,action)=>{
                state.cartItemAddStatus= 'fulfilled'
                const item = action.payload;
                const existItem = state.items.find((x) => x.name === item.name);
                 if (existItem) {
                      state.items = state.items.map((x) =>
                        x.name === existItem.name ? item : x
                      );
                  } else {
                   state.items = [...state.items, item];
                                     }
            })
            .addCase(addToCartAsync.rejected,(state,action)=>{
                state.cartItemAddStatus= 'rejected'
                state.error = action.payload;
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
                state.items = state.items.filter(
                    (item) => item.name !== action.payload.name
                  );

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
