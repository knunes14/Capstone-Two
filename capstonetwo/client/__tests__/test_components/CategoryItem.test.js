import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CategoryItem from './CategoryItem';

describe('CategoryItem Component', () => {
  const item = {
    title: "Example Category",
    img: "http://example.com/image.jpg",
    link: "/example-category"
  };

  test('renders correctly with given item properties', () => {
    render(
      <Router>
        <CategoryItem item={item} />
      </Router>
    );

    // Check that the image is rendered with correct src
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', item.img);

    // Check that the title is displayed
    const title = screen.getByText(item.title);
    expect(title).toBeInTheDocument();

    // Check that the link points to the correct URL
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', item.link);

    // Check that the button is rendered and contains correct text
    const button = screen.getByRole('button', { name: 'CHECK IT OUT' });
    expect(button).toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Router>
        <CategoryItem item={item} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

