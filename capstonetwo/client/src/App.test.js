import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import { initialState as userInitialState } from './redux/userRedux'; // Import or define initial states

const mockStore = configureStore([]);

describe('App Component', () => {
  let store;
  
  beforeEach(() => {
    store = mockStore({
      user: userInitialState
    });

    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
  });

  test('renders the home page by default', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('navigates to login when user is not authenticated', () => {
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/login/i), leftClick);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('redirects authenticated user to home from login', () => {
    // Adjust the store's state to simulate an authenticated user
    store = mockStore({
      user: { ...userInitialState, currentUser: { name: 'Test User' } }
    });
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/login/i), leftClick);
    expect(screen.getByText('Home')).toBeInTheDocument(); // Assuming "Home" is what your Home component renders
  });
});

