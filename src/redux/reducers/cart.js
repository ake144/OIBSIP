import { combineReducers } from 'redux'
import { ADD_TO_CART, REMOVE_FROM_CART, CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILURE } from   './../actions/index'


const initiateState = {
    checkoutStatus:{
        checkoutPending:null,
        error:null
    },
    quantitybyId:{},

}

function checkoutStatus(state=initiateState.checkoutStatus, action){
    switch(action.type){
        case CHECKOUT_REQUEST:
            return{
                checkoutPending:true,
                error:null
            }
        case CHECKOUT_SUCCESS:
            return {
                checkoutPending:false,
                error:null
            }
        case CHECKOUT_FAILURE:
            return{
                checkoutPending:false,
                error:true
            }
        default:
            return state
    }
} 