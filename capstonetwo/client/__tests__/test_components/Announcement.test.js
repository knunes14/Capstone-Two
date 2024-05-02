import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Announcement from './Announcement';

describe('Announcement Component', () => {
  test('renders announcement with correct text and link', () => {
    render(
      <Router>
        <Announcement />
      </Router>
    );

    // Check that the link is rendered and has the correct text
    const linkElement = screen.getByRole('link', { name: /click here to try our new wetsuit recommendation tool! #lovematuse/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/sizeform');
    expect(linkElement).toHaveStyle('textDecoration: none');
    expect(linkElement).toHaveStyle('fontWeight: bold');
    expect(linkElement).toHaveStyle('color: black');
  });

  test('matches the component snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Announcement />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
