import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userRedux';
import Register from './Register';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking hooks from react-router-dom and react-redux
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn()
}));
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => jest.fn(),
    useSelector: jest.fn()
}));

describe('Register Component', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                user: userReducer
            }
        });
        jest.mock('react-redux', () => ({
            ...jest.requireActual('react-redux'),
            useSelector: () => ({
                isFetching: false,
                error: false,
                currentUser: null
            })
        }));
        render(
            <Provider store={store}>
                <Router>
                    <Register />
                </Router>
            </Provider>
        );
    });

    test('renders registration form with inputs and button', () => {
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create/i })).toBeEnabled();
    });

    test('allows text input and form submission', () => {
        fireEvent.change(screen.getByPlaceholderText('username'), {
            target: { value: 'testuser' }
        });
        fireEvent.change(screen.getByPlaceholderText('email'), {
            target: { value: 'test@test.com' }
        });
        fireEvent.change(screen.getByPlaceholderText('password'), {
            target: { value: 'password123' }
        });
        expect(screen.getByPlaceholderText('username').value).toBe('testuser');
        expect(screen.getByPlaceholderText('email').value).toBe('test@test.com');
        expect(screen.getByPlaceholderText('password').value).toBe('password123');

        fireEvent.click(screen.getByRole('button', { name: /create/i }));
        // Verify the mock dispatch was called with the expected action
    });

    test('shows error message when registration fails', () => {
        // Assuming your state updates to show an error
        jest.mock('react-redux', () => ({
            ...jest.requireActual('react-redux'),
            useSelector: () => ({
                isFetching: false,
                error: true,
                currentUser: null
            })
        }));
        render(<Register />);
        expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
    });
});
