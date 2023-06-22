import {createSlice} from '@reduxjs/toolkit'

const storedItems = JSON.parse(localStorage.getItem("cartItems"))
const storedUserInfo = JSON.parse(localStorage.getItem("userInfo")) 

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        userInfo: storedUserInfo ? storedUserInfo : null,
        cartItems: storedItems
            ? storedItems
            : []
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload
            const existItem = state.cartItems.find(item => item.id === newItem.id)
            if (existItem) {
                existItem.quantity += newItem.quantity;
                return state
            }
            else return {
                ...state,
                cartItems: [...state.cartItems, newItem]
            }
        },
        changeQuantity: (state, action) => {
            const newItem = action.payload
            const existItem = state.cartItems.find(item => item.id === newItem.id)
            if (existItem) {
                existItem.quantity = newItem.quantity;
                return state
            }
            else return state
        },
        removeItem: (state, action) => {
            const itemToRemove = action.payload
            const existItem = state.cartItems.find(item => item.id === itemToRemove.id)
            if (existItem) {
                const newCart = state.cartItems.filter(item => item.id !== itemToRemove.id)
                return {
                    ...state,
                    cartItems: [...newCart]
                }
            }
            else return state
        },
        userSignIn: (state, action) => {
            return {
                ...state,
                userInfo: action.payload
            }
        },
        userSignOut: (state) => {
            return {
                ...state,
                userInfo: null
            }
        }
    }
})

export const { addItem, changeQuantity, removeItem, userSignIn, userSignOut } = cartSlice.actions

export default cartSlice.reducer