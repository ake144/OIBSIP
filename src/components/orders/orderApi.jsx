import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { axiosi } from '../config/axios'



export const createOrder = async(order)=>{
      try{
        const res = await axiosi.post('/order',order)
        return res.data
      }
      catch(err){
        throw err.response.data
      }
}

export const getAllOrder=async()=>{
    try{
     const res = await axiosi.get('/orders')
     return res.data
    }
    catch(error){
        throw error.response.data
    }
}

export const getOrderByUserId=async(id)=>{
        try{
            const res = await axiosi.get(`/orders/user/${id}`)
            return res.data
    }
    catch(err){
        throw err.response.data
    }
}