import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {getAllPizzas} from './productApi'

const initialState = {
  status:'idle',
  items:[],
  getAllPizzasStatus:'idle',
  error:null,
  successMessage:null
}


export const fetchAllPizzaAsync = createAsyncThunk('getPizzas/fetchAllPizzaAsync',async()=>{
    const  getAllItems = await getAllPizzas()
    return getAllItems
})

const productSlice = createSlice({
              name:'productSlice',
              initialState,
              reducers:{

              },
              extraReducers:(builder)=>{
                builder
                    .addCase(fetchAllPizzaAsync.pending,(state)=>{
                        state.getAllPizzasStatus= 'loading'
                    })
                    .addCase(fetchAllPizzaAsync.fulfilled,(state,action)=>{
                        state.getAllPizzasStatus= 'fulfilled'
                        state.items = action.payload
                    })
                    .addCase(fetchAllPizzaAsync.rejected,(state,action)=>{
                        state.getAllPizzasStatus= 'rejected'
                        state.error= action.error
                    })
                }
})


export const selectGetItemsStatus = (state)=>state.productSlice.status
export const selectGetItems = (state)=>state.productSlice.items
export const selectGetError = (state)=>state.productSlice.error
export const selectGetAllPizzasStatus = (state)=>state.productSlice.getAllPizzasStatus
export const selectGetMessage= (state)=>state.productSlice.successMessage

export default productSlice.reducer