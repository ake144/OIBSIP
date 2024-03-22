import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pizzas: [],
    cart: [],
    user: null,
    isLoggedIn: false
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removePizza: (state, action) => {
      state.cart = state.cart.filter((pizza) => pizza.id !== action.payload);
    },
    incrementPizza: (state, action) => {
      state.cart = state.cart.map((pizza) => {
        if (pizza.id === action.payload.id) {
          pizza.amount += 1;
        }
        return pizza;
      });
    },
    decrementPizza: (state, action) => {
        state.cart = state.cart.map((pizza) => {
            if (pizza.id === action.payload.id) {
                pizza.amount -= 1;
            }
            return pizza;
        });
    }
  },
});

export const cartPizzas = (state) => state.cart.pizzas;
export const { addPizza, removePizza, incrementPizza, decrementPizza } = cartSlice.actions;

export default cartSlice.reducer;