import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Newsletter from './Newsletter';

describe('Newsletter Component', () => {
  beforeEach(() => {
    render(<Newsletter />);
  });

  test('renders correctly', () => {
    // Check for the title
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    
    // Check for the description
    expect(screen.getByText('Get timely updates from your favorite products')).toBeInTheDocument();
    
    // Ensure the email input is rendered
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
  });

  test('input accepts text', () => {
    const input = screen.getByPlaceholderText('Your Email');
    userEvent.type(input, 'test@example.com');
    expect(input).toHaveValue('test@example.com');
  });

  test('send button renders correctly', () => {
    expect(screen.getByRole('button')).toContainElement(screen.getByLabelText('Send'));
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Newsletter />);
    expect(asFragment()).toMatchSnapshot();
  });
});
