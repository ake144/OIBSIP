import {axiosi} from './../config/axios'

export const addToCart=async(item)=>{
    try{
        const res = await axiosi.post('/cart',item)
        return res.data

    }
    catch(error){
        throw error.response.data
    }
}

export const fetchCartByUserId=async(id)=>{
    try{
        const res = await axiosi.get(`cart/user/${id}`)
        return res.data
    }
    catch(error){
        throw error.response.data
    }
}

export const resetCartByUserId=async(userId)=>{
    try{
    const res = await axiosi.delete(`/cart/user/${userId}`)
    return res.data
    }
    catch(error){
        throw error.response.data
    }
}
