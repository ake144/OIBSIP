import {axiosi} from './../config/axios'

export const addToCart = async (userId, productId) => {
    try {
      const res = await axiosi.post(`/cart/${userId}`, productId); // Update the endpoint URL
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  };
export const fetchCartByUserId=async(userId)=>{
    try{
        
        const res = await axiosi.get(`/cart/${userId}`)
        return res.data
    }
    catch(error){
        throw error.response.data
    }
}

export const deleteCartByUserId=async(userId,itemName)=>{
    try{
    const res = await axiosi.delete(`/cart/${userId}/${itemName}`)
    return res.data
    }
    catch(error){
        throw error.response.data
    }
}
export const clearCart = async(userId)=>{
    try {
        const res = await axiosi.delete(`/cart/${userId}`)
        return res.data
      } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
}
