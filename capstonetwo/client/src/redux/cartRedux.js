import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const { title, price, quantity, size, img } = action.payload; // Destructure payload
            state.quantity += 1;
            state.products.push({ title, price, quantity, size, img }); // Include selected size
            state.total += price * quantity;
        },
        // addProduct: (state, action) => {
        //     state.quantity += 1;
        //     state.products.push(action.payload);
        //     state.total += action.payload.price * action.payload.quantity;
        // },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer