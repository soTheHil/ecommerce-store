import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
    reducer: {
        cart: cartReducer
    }
})

store.subscribe(() => {
    const state = store.getState()
    console.log(state.cart.cartItems, 'from store')
    localStorage.setItem("cartItems", JSON.stringify(state.cart.cartItems))
})

export default store