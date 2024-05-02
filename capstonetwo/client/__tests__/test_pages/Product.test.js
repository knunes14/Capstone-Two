import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../redux/cartRedux';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking modules and hooks
jest.mock('../requestMethods', () => ({
    publicRequest: {
        get: jest.fn(() => Promise.resolve({ data: {
            title: "Test Wetsuit",
            description: "A high-quality wetsuit.",
            material: "Neoprene",
            style: "Fullsuit",
            price: 199.99,
            img: "test_image.jpg",
            categories: 'men'
        }}))
    }
}));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        pathname: '/product/1'
    })
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => jest.fn()
}));

describe('Product Component', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                cart: cartReducer
            }
        });
        render(
            <Provider store={store}>
                <Router>
                    <Product />
                </Router>
            </Provider>
        );
    });

    test('renders product details from API', async () => {
        expect(await screen.findByText(/test wetsuit/i)).toBeInTheDocument();
        expect(screen.getByText(/a high-quality wetsuit./i)).toBeInTheDocument();
        expect(screen.getByText(/material: neoprene/i)).toBeInTheDocument();
        expect(screen.getByText(/style: fullsuit/i)).toBeInTheDocument();
        expect(screen.getByText(/\$199\.99/i)).toBeInTheDocument();
    });

    test('allows quantity adjustments', () => {
        const increaseButton = screen.getByLabelText('Increase Quantity');
        const decreaseButton = screen.getByLabelText('Decrease Quantity');
        const amount = screen.getByText('1');

        fireEvent.click(increaseButton);
        expect(amount).toHaveTextContent('2');

        fireEvent.click(decreaseButton);
        fireEvent.click(decreaseButton); // Attempt to decrease below 1
        expect(amount).toHaveTextContent('1'); // Quantity should not go below 1
    });

    test('adds product to cart', () => {
        const addToCartButton = screen.getByText('ADD TO CART');
        fireEvent.click(addToCartButton);
    });
});
