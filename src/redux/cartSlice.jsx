import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) ?? []
console.log(initialState)
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            console.log(action.payload)
            state.push(action.payload)
        },
        deleteFromCart(state,action){
            return state.filter(item => item.id != action.payload.id)
        }
    }
});
export const {addToCart , deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;