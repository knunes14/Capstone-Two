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
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        updateCart: (state, action) => {
            const { products, quantity, total } = action.payload;
            state.products = products;
            state.quantity = quantity;
            state.total = total;
        },
    },
});

export const { addProduct, clearCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;