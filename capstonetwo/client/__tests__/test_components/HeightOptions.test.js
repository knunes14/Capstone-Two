import React from 'react';
import { render, screen } from '@testing-library/react';
import HeightOptions from './HeightOptions';

describe('HeightOptions Component', () => {
  test('renders correct number of height options', () => {
    render(<select>{HeightOptions()}</select>); // Wrap the options in a select for proper context

    // Calculate expected number of options
    const optionsCount = (11 - 1 + 1) * 1 + (6 - 0 + 1) * 1;
    expect(screen.getAllByRole('option').length).toBe(optionsCount);
  });

  test('contains specific height options', () => {
    render(<select>{HeightOptions()}</select>);

    // Check for specific heights to be present
    const optionValue1 = screen.getByRole('option', { name: "5'1\"" });
    expect(optionValue1).toBeInTheDocument();
    expect(optionValue1).toHaveAttribute('value', '61');

    const optionValue2 = screen.getByRole('option', { name: "6'6\"" });
    expect(optionValue2).toBeInTheDocument();
    expect(optionValue2).toHaveAttribute('value', '78');
  });

  test('matches the snapshot', () => {
    const { asFragment } = render(<select>{HeightOptions()}</select>);
    expect(asFragment()).toMatchSnapshot();
  });
});
