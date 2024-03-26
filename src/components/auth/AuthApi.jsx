import {axiosi} from '../config/axios'

export const signup=async(cred)=>{
    try {
        const res=await axiosi.post("/register",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const login=async(cred)=>{
    try {
        const res=await axiosi.post("/login",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const verifyOtp=async(verificationCode)=>{
    try {
        const res=await axiosi.post(`/verify/${verificationCode}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const fetchUsers=async()=>{
    try{
        const  res = await axiosi.get('/fetchUsers')
        return res.data

    }
    catch (error){
        throw error.response.data
    }
}

export const forgotPassword=async(cred)=>{
    try {
        const res=await axiosi.post("/forgotPassword",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resetPassword=async(cred)=>{
    try {
        const res=await axiosi.post("/resetpassword",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const checkAuth=async(cred)=>{
    try {
        const res=await axiosi.get("auth/check-auth")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const logout=async()=>{
    try {
        const res=await axiosi.get("auth/logout")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}