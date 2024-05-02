import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './Navbar';

// Mock the reducers
const rootReducer = (state = {
  cart: { quantity: 5 },
  user: { currentUser: { name: "John Doe" } }
}, action) => state;

describe('Navbar Component', () => {
  const setup = () => {
    const store = configureStore({
      reducer: rootReducer
    });
    return render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
  };

  test('renders navbar with initialized state values', () => {
    setup();
    expect(screen.getByText('SWELLMADE.')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('LOGOUT')).toBeInTheDocument();
  });

  test('handles logout click', () => {
    setup();
    const logoutButton = screen.getByText('LOGOUT');
    userEvent.click(logoutButton);
    
  });

  test('shows the right elements when user is not logged in', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        cart: { quantity: 3 },
        user: { currentUser: null }
      }
    });

    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );

    expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    expect(screen.getByText('REGISTER')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('LOGOUT')).toBeNull();
  });

  test('matches snapshot', () => {
    const { asFragment } = setup();
    expect(asFragment()).toMatchSnapshot();
  });
});

