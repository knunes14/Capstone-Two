import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Helps in wrapping the component
import WetsuitResultPage from './WetsuitResultPage';
import WetsuitCard from '../components/WetsuitCard';

// Mocking the WetsuitCard and react-router-dom hooks
jest.mock('../components/WetsuitCard', () => jest.fn(() => <div>WetsuitCard</div>));
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: { product: [{ _id: '123', name: 'Test Wetsuit' }] }
    }),
    useNavigate: () => jest.fn().mockImplementation(() => jest.fn())
}));

describe('WetsuitResultPage Component', () => {
    test('renders the WetsuitResultPage with products', () => {
        render(<WetsuitResultPage />, { wrapper: MemoryRouter });
        
        // Verify that the title and the presence of recommended products are rendered
        expect(screen.getByText('OUR RECOMMENDATIONS FOR YOU')).toBeInTheDocument();
        expect(WetsuitCard).toHaveBeenCalled();
        expect(screen.getByText('WetsuitCard')).toBeInTheDocument(); // Checking that the mocked WetsuitCard is rendered
        expect(screen.getByText('Questions about our wetsuit recommendations? Please email us at swellmade@example.com')).toBeInTheDocument();
    });

    test('navigates back when "Try Again" button is clicked', () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate
        }));
        render(<WetsuitResultPage />, { wrapper: MemoryRouter });

        fireEvent.click(screen.getByText('Try Again'));
        expect(mockNavigate).toHaveBeenCalledWith(-1); // Check if navigation was triggered correctly
    });
});
