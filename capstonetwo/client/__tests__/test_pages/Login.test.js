import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userRedux'; 
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

describe('Login Component', () => {
    const initialState = { user: { isFetching: false, error: false, isLoggedIn: false } };
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                user: userReducer
            },
            preloadedState: initialState
        });
        render(
            <Provider store={store}>
                <Router>
                    <Login />
                </Router>
            </Provider>
        );
    });

    test('renders login form with inputs and button', () => {
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeEnabled();
    });

    test('inputs should accept text', () => {
        fireEvent.change(screen.getByPlaceholderText('username'), {
            target: { value: 'testuser' }
        });
        fireEvent.change(screen.getByPlaceholderText('password'), {
            target: { value: 'password123' }
        });
        expect(screen.getByPlaceholderText('username').value).toBe('testuser');
        expect(screen.getByPlaceholderText('password').value).toBe('password123');
    });

    test('displays error message when login fails', async () => {
        // Simulate a login failure
        store.dispatch({
            type: 'user/loginFailure',
            payload: 'Login failed'
        });
        await waitFor(() => {
            expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
        });
    });

    test('login button should be disabled during fetching', () => {
        store.dispatch({
            type: 'user/loginStart'
        });
        expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
    });
});
