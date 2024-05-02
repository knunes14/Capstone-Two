import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Success from './pages/Success';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WetsuitForm from './pages/WetsuitForm.js';
import WetsuitResultPage from './pages/WetsuitResultPage.js';
import ScrollToTop from './components/ScrollToTop.js';
import { updateCart } from './redux/cartRedux';
import { useEffect } from 'react';

const App = () => {
  const user = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch();

  useEffect(() => {
        console.log('Attempting to load cart from localStorage...');
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          console.log('Loaded cart from localStorage:', JSON.parse(savedCart));
          dispatch(updateCart(JSON.parse(savedCart)));
        }
    }, [dispatch]);

  const handleFormSubmit = (formData) => {
    console.log("Form data submitted:", formData);
    // Additional logic for form submission can be added here
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={user ? <Navigate to="/" /> :<Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> :<Register />} />
        <Route path="/sizeform" element={<WetsuitForm />} />
        <Route path="/results" element={<WetsuitResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;


