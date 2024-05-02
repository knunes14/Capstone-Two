import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Slider from './Slider';
import { sliderItems } from "../data";

describe('Slider Component', () => {
  beforeEach(() => {
    render(<Slider />);
  });

  test('renders the correct number of slides', () => {
    const slides = screen.getAllByText(/find my perfect wetsuit/i);
    expect(slides.length).toBe(sliderItems.length);
  });

  test('initially shows the first slide', () => {
    expect(screen.getByText(sliderItems[0].title)).toBeInTheDocument();
  });

  test('cycles slides correctly when right arrow is clicked', () => {
    const rightArrow = screen.getByTestId('right-arrow');
    fireEvent.click(rightArrow);

    // Expect the second slide to be shown
    expect(screen.getByText(sliderItems[1].title)).toBeInTheDocument();

    // Click again to show the third slide
    fireEvent.click(rightArrow);
    expect(screen.getByText(sliderItems[2].title)).toBeInTheDocument();

    // Click again to wrap around to the first slide
    fireEvent.click(rightArrow);
    expect(screen.getByText(sliderItems[0].title)).toBeInTheDocument();
  });

  test('cycles slides correctly when left arrow is clicked', () => {
    const leftArrow = screen.getByTestId('left-arrow');
    fireEvent.click(leftArrow);

    // Expect the last slide to be shown because it wraps around
    expect(screen.getByText(sliderItems[sliderItems.length - 1].title)).toBeInTheDocument();

    // Click again to show the second-to-last slide
    fireEvent.click(leftArrow);
    expect(screen.getByText(sliderItems[sliderItems.length - 2].title)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const { asFragment } = render(<Slider />);
    expect(asFragment()).toMatchSnapshot();
  });
});
