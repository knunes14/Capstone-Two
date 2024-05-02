import cartReducer, { addProduct, clearCart, updateCart } from './cartSlice';

describe('cartSlice', () => {
    // Define an initial state to be reused
    const initialState = {
        products: [],
        quantity: 0,
        total: 0,
    };

    test('should return the initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle adding a product', () => {
        const product = { title: 'Wetsuit', price: 200, quantity: 2, size: 'M', img: 'url' };
        const action = { type: addProduct.type, payload: product };
        const state = cartReducer(initialState, action);
        expect(state.products.length).toBe(1);
        expect(state.quantity).toBe(1);
        expect(state.total).toBe(400);
    });

    test('should handle clearing the cart', () => {
        const stateWithProduct = {
            products: [{ title: 'Wetsuit', price: 200, quantity: 2, size: 'M', img: 'url' }],
            quantity: 1,
            total: 400,
        };
        expect(cartReducer(stateWithProduct, clearCart())).toEqual(initialState);
    });

    test('should handle updating the cart', () => {
        const updatedProducts = [{ title: 'New Wetsuit', price: 300, quantity: 1, size: 'L', img: 'new_url' }];
        const action = { type: updateCart.type, payload: { products: updatedProducts, quantity: 1, total: 300 } };
        const state = cartReducer(initialState, action);
        expect(state.products).toEqual(updatedProducts);
        expect(state.quantity).toBe(1);
        expect(state.total).toBe(300);
    });
});
