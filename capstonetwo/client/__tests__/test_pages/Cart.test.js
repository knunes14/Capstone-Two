import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cart from './Cart';
import cartReducer from '../redux/cartRedux';

describe('Cart Component', () => {
    const initialState = {
        products: [{ id: 1, title: "Wetsuit", img: "link_to_image", size: "M", quantity: 2, price: 100 }],
        quantity: 2,
        total: 200
    };

    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                cart: cartReducer
            },
            preloadedState: {
                cart: initialState
            }
        });

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
    });

    test('renders cart with products', () => {
        expect(screen.getByText('Wetsuit')).toBeInTheDocument();
        expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
        expect(screen.getByText('$ 200')).toBeInTheDocument();
    });

    test('updates total on clear cart', () => {
        fireEvent.click(screen.getByText('CLEAR CART'));
        expect(screen.getByText('$ 0')).toBeInTheDocument();  // Assuming the clear cart sets total to 0
    });

    test('renders order summary correctly', () => {
        const subtotal = screen.getByText('$ 200');
        const shipping = screen.getByText('$ 5.90');
        const total = screen.getByText('$ 205.90');

        expect(subtotal).toBeInTheDocument();
        expect(shipping).toBeInTheDocument();
        expect(total).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
