import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Product from './Product';

describe('Product Component', () => {
  const item = {
    _id: '1',
    img: 'https://example.com/product.jpg'
  };

  beforeEach(() => {
    render(
      <Router>
        <Product item={item} />
      </Router>
    );
  });

  test('renders product image', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', item.img);
  });

  test('hover effect shows info icons', () => {
    const infoDiv = screen.getByTestId('info');
    expect(infoDiv).toHaveStyle('opacity: 0');
    fireEvent.mouseOver(infoDiv);
    expect(infoDiv).toHaveStyle('opacity: 1');
  });

  test('renders search icon link correctly', () => {
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/product/${item._id}`);
    const searchIcon = screen.getByLabelText('Search');
    expect(searchIcon).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Product item={item} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
