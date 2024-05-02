import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import WetsuitForm from './WetsuitForm';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking navigate and api calls
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn().mockImplementation(() => (path) => console.log(`Navigate to ${path}`))
}));
jest.mock('../services/api', () => ({
    fetchRecommendations: jest.fn().mockResolvedValue([
        { title: "Wetsuit A", style: "Fullsuit", material: "Geoflex" }
    ])
}));

describe('WetsuitForm Component', () => {
    const handleSubmitMock = jest.fn();

    beforeEach(() => {
        render(<Router><WetsuitForm onSubmit={handleSubmitMock} /></Router>);
    });

    test('renders the form with all fields', () => {
        expect(screen.getByText(/find your perfect wetsuit/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("ex. 70")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("ex. 180")).toBeInTheDocument();
        expect(screen.getByText(/find my wetsuit/i)).toBeInTheDocument();
    });

    test('allows form fields to be filled and form submitted', async () => {
        fireEvent.change(screen.getByPlaceholderText('ex. 70'), { target: { value: 70 } });
        fireEvent.change(screen.getByPlaceholderText('ex. 180'), { target: { value: 180 } });
        fireEvent.change(screen.getByText("Select Style"), { target: { value: "Fullsuit" } });
        fireEvent.change(screen.getByText("Select Material"), { target: { value: "Geoflex" } });
        fireEvent.click(screen.getByText(/find my wetsuit/i));

        await waitFor(() => {
            expect(handleSubmitMock).toHaveBeenCalled();
        });
    });

    test('navigates upon form submission', async () => {
        fireEvent.submit(screen.getByRole('button', { name: /find my wetsuit/i }));
        
        await waitFor(() => {
            // Check if navigation was called
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Navigate to /results'));
        });
    });

    test('displays loading indicator when submitting', async () => {
        fireEvent.submit(screen.getByRole('button', { name: /find my wetsuit/i }));

        await waitFor(() => {
            expect(screen.getByText(/loading.../i)).toBeInTheDocument();
        });
    });
});
