import React from 'react';
import { render, screen } from '@testing-library/react';
import Categories from './Categories';
import CategoryItem from './CategoryItem';

// Mock the CategoryItem component and the data file
jest.mock('./CategoryItem', () => (props) => <div data-testid="category-item">{props.item.name}</div>);
jest.mock('../data', () => ({
  categories: [
    { id: 1, name: 'Men' },
    { id: 2, name: 'Women' }
  ]
}));

describe('Categories Component', () => {
  test('renders all category items', () => {
    render(<Categories />);

    // Check if the container element is rendered
    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();

    // Assert that the CategoryItem components are rendered
    const categoryItems = screen.getAllByTestId('category-item');
    expect(categoryItems.length).toBe(2);  // Because we have 2 items in the mocked categories data

    // Check that the correct text content is in each CategoryItem
    expect(categoryItems[0]).toHaveTextContent('Men');
    expect(categoryItems[1]).toHaveTextContent('Women');
  });
});
