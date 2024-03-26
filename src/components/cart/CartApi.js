import {axiosi} from './../config/axios'

export const addToCart=async(userId,item)=>{
    try{
        const res = await axiosi.post(`/cart/${userId}`,item)
        return res.data
    }
    catch(error){
        throw error.response.data
    }
}

export const fetchCartByUserId=async(id)=>{
    try{
        
        const res = await axiosi.get(`/cart/${id}`)
        return res.data
    }
    catch(error){
        throw error.response.data
    }
}

export const deleteCartByUserId=async(userId,id)=>{
    try{
    const res = await axiosi.delete(`/cart/${userId}/${id}`)
    return res.data
    }
    catch(error){
        throw error.response.data
    }
}
