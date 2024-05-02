import React from 'react';
import { render, screen } from '@testing-library/react';
import WeightOptions from './WeightOptions';

describe('WeightOptions Component', () => {
  beforeEach(() => {
    render(<select>{WeightOptions()}</select>); // Wrap the options in a select for proper context
  });

  test('renders correct number of weight options', () => {
    // There should be 171 options if it starts at 90 and ends at 260
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(260 - 90 + 1);
  });

  test('renders specific weight options correctly', () => {
    // Check for specific weights to be present
    expect(screen.getByRole('option', { name: '90 lbs' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '260 lbs' })).toBeInTheDocument();
  });

  test('first and last options have correct values', () => {
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveTextContent('90 lbs');
    expect(options[0]).toHaveAttribute('value', '90 lbs');
    expect(options[options.length - 1]).toHaveTextContent('260 lbs');
    expect(options[options.length - 1]).toHaveAttribute('value', '260 lbs');
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<select>{WeightOptions()}</select>);
    expect(asFragment()).toMatchSnapshot();
  });
});
