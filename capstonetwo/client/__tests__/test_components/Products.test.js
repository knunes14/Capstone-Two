import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Products from './Products';
import Product from './Product';

jest.mock('axios');
jest.mock('./Product', () => (props) => <div data-testid="product">{props.item.name}</div>); // Mock the Product component

describe('Products Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        { id: 1, name: 'Product 1', price: 50, createdAt: '2021-01-01' },
        { id: 2, name: 'Product 2', price: 100, createdAt: '2021-02-01' }
      ]
    });
  });

  test('fetches products on mount and renders them', async () => {
    render(<Products cat={null} filters={{}} sort="" />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/server/products');
      const products = screen.getAllByTestId('product');
      expect(products.length).toBe(2); 
      expect(products[0]).toHaveTextContent('Product 1');
      expect(products[1]).toHaveTextContent('Product 2');
    });
  });

  test('applies category filter correctly', async () => {
    render(<Products cat="men" filters={{size: 'M'}} sort="" />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/server/products?category=men');
      const products = screen.getAllByTestId('product');
      expect(products.length).toBe(2); 
    });
  });

  test('sorts products by price ascending', async () => {
    render(<Products cat={null} filters={{}} sort="asc" />);
    await waitFor(() => {
      const products = screen.getAllByTestId('product');
      expect(products[0]).toHaveTextContent('Product 1'); 
      expect(products[1]).toHaveTextContent('Product 2');
    });
  });
});
