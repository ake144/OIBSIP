export const getAllPizzasReducer = (state = {pizzas:[]}, action) => {
    switch (action.type) {
        case 'GET_PIZZAS':
            return action.payload;
        case 'GET_PIZZAS_ERROR':
            return action.payload;
        case 'GET_PIZZAS_PENDING':
            return { ...state,
                loading:true}
        default:
            return state;
    }
};