import {axiosi} from './../config/axios'


export const getAllPizzas = async()=>{
    try{
        const res = await axiosi.get("/getPizzas")
        return res.data
    }
    catch(error){
        throw error.response.data
    }
}

