import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ProductList from './ProductList';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.mock('../components/Navbar', () => () => <div>Navbar</div>);
jest.mock('../components/Announcement', () => () => <div>Announcement</div>);
jest.mock('../components/Products', () => () => <div>Products</div>);
jest.mock('../components/Newsletter', () => () => <div>Newsletter</div>);
jest.mock('../components/Footer', () => () => <div>Footer</div>);

// Mocking fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

describe('ProductList Component', () => {
  const setup = (path = '/products/men') => {
    const history = createMemoryHistory({ initialEntries: [path] });
    return render(
      <Router history={history}>
        <ProductList />
      </Router>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders category from URL', () => {
    setup('/products/men');
    expect(screen.getByText('men')).toBeInTheDocument();
    expect(screen.getByText('Select Category:')).toBeInTheDocument();
  });

  test('fetches products on category change', async () => {
    setup('/products/women');
    const select = screen.getByLabelText('Select Category:');
    fireEvent.change(select, { target: { value: 'women' } });

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('women'));
  });

  test('handles sorting', () => {
    setup();
    const sortSelect = screen.getByText('Sort Products:');
    fireEvent.change(sortSelect, { target: { value: 'desc' } });
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  test('navigation works on category selection', () => {
    const { history } = setup();
    const select = screen.getByLabelText('Select Category:');
    fireEvent.change(select, { target: { value: 'women' } });

    expect(history.location.pathname).toBe('/products/women');
  });
});
