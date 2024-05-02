import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WetsuitCard from './WetsuitCard';
import { useNavigate } from 'react-router-dom';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // import and retain the original functionalities
    useNavigate: jest.fn() // mock useNavigate
}));

describe('WetsuitCard Component', () => {
    let product;
    let mockedNavigate;

    beforeEach(() => {
        // Dummt product setup to mock navigate function
        product = {
            _id: '1',
            title: 'Ultra Wetsuit',
            img: 'http://example.com/wetsuit.jpg',
            description: 'High quality wetsuit.',
            style: 'Fullsuit',
            material: 'Neoprene',
            price: 299.99
        };
        mockedNavigate = useNavigate();
        mockedNavigate.mockImplementation(() => jest.fn()); // Implement mock for navigation
        render(<WetsuitCard product={product} />);
    });

    test('renders product details correctly', () => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(screen.getByText(product.description)).toBeInTheDocument();
        expect(screen.getByText(`Style: ${product.style}, Material: ${product.material}`)).toBeInTheDocument();
        expect(screen.getByText(`Price: $${product.price.toFixed(2)}`)).toBeInTheDocument();
        expect(screen.getByRole('img', { name: product.title })).toHaveAttribute('src', product.img);
    });

    test('navigates to product detail page on purchase button click', () => {
        const purchaseButton = screen.getByText('Purchase Now');
        fireEvent.click(purchaseButton);
        expect(mockedNavigate).toHaveBeenCalledWith(`/product/${product._id}`);
    });

    test('matches snapshot', () => {
        const { asFragment } = render(<WetsuitCard product={product} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
