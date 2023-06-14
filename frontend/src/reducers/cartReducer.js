import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const existItem = state.cart.find(item => item.id === newItem.id)
            if (existItem) {
                existItem.quantity += newItem.quantity;
                return state
            }
            else return {
                ...state,
                cart: [...state.cart, newItem]
            }
        }
    }
})

export const { addItem } = cartSlice.actions

export default cartSlice.reducer