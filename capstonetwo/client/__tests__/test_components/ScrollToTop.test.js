import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';

describe('ScrollToTop Component', () => {
  // Mock window.scrollTo function
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('calls scrollTo on route change', () => {
    const { rerender } = render(
      <MemoryRouter initialEntries={['/first-page']}>
        <ScrollToTop />
        <Route path="/first-page" render={() => <h1>First Page</h1>} />
        <Route path="/second-page" render={() => <h1>Second Page</h1>} />
      </MemoryRouter>
    );

    // Initial render should call scrollTo
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);

    // Rerender with a new route
    rerender(
      <MemoryRouter initialEntries={['/second-page']}>
        <ScrollToTop />
        <Route path="/first-page" render={() => <h1>First Page</h1>} />
        <Route path="/second-page" render={() => <h1>Second Page</h1>} />
      </MemoryRouter>
    );

    // ScrollTo should be called again on route change
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(2);
  });
});
