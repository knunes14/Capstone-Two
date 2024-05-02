import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

jest.mock('../components/Navbar', () => () => <div>Navbar</div>);
jest.mock('../components/Announcement', () => () => <div>Announcement</div>);
jest.mock('../components/Slider', () => () => <div>Slider</div>);
jest.mock('../components/Categories', () => () => <div>Categories</div>);
jest.mock('../components/Products', () => () => <div>Products</div>);
jest.mock('../components/Newsletter', () => () => <div>Newsletter</div>);
jest.mock('../components/Footer', () => () => <div>Footer</div>);

describe('Home Component', () => {
  test('renders all components correctly', () => {
    render(<Home />);

    expect(screen.getByText('Announcement')).toBeInTheDocument();
    expect(screen.getByText('Navbar')).toBeInTheDocument();
    expect(screen.getByText('Slider')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});
