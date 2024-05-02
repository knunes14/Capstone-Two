import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });

  test('renders the company logo and description', () => {
    expect(screen.getByText('SWELLMADE.')).toBeInTheDocument();
    expect(screen.getByText(/Swellmade is the proud distributor of Matuse wetsuits for men and women./)).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  test('renders useful links and ensures they are correctly linked', () => {
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Cart').closest('a')).toHaveAttribute('href', '/cart');
    expect(screen.getByText("Men's Wetsuits").closest('a')).toHaveAttribute('href', '/products/men');
    expect(screen.getByText("Women's Wetsuits").closest('a')).toHaveAttribute('href', '/products/women');
  });

  test('renders contact information correctly', () => {
    expect(screen.getByText('San Diego, CA')).toBeInTheDocument();
    expect(screen.getByText('+1 234 567 8910')).toBeInTheDocument();
    expect(screen.getByText('swellmade@example.com')).toBeInTheDocument();
  });

  test('renders payment image', () => {
    const paymentImage = screen.getByRole('img');
    expect(paymentImage).toHaveAttribute('src', 'https://i.ibb.co/Qfvn4z6/payment.png');
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(
      <Router>
        <Footer />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
