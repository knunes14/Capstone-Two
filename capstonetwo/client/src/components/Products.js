import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Product from './Product';
import axios from 'axios';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat,filters,sort}) => {
  const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await axios.get( 
            cat 
              ? `http://localhost:3000/server/products?category=${cat}` 
              : 'http://localhost:3000/server/products'
          );
          console.log('Products fetched:', res.data);
          setProducts(res.data);
        } catch (err) {
          console.error('Error fetching products:', err);
        }
      };
      getProducts()
    }, [cat]);

    useEffect(() => {
      if (cat) {
        const filtered = products.filter(item =>
          Object.entries(filters).every(([key, value]) =>
            key === 'size' ? item.menSize.includes(value) || item.womenSize.includes(value) : item[key] && item[key].includes(value)
          ));
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(products);
        console.log('Unfiltered products (default):', products); 
      }
    }, [products, cat, filters]);

useEffect(() => {
  if (sort === "newest") {
    setFilteredProducts(prev => {
      const sorted = [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log('Sorted by newest:', sorted);
      return sorted;
    });
  } else if (sort === "asc") {
    setFilteredProducts(prev => {
      const sorted = [...prev].sort((a, b) => a.price - b.price);
      console.log('Sorted by price ascending:', sorted);
      return sorted;
    });
  } else {
    setFilteredProducts(prev => {
      const sorted = [...prev].sort((a, b) => b.price - a.price);
      console.log('Sorted by price descending:', sorted);
      return sorted;
    });
  }
}, [sort]);

  return (
    <Container>
        {cat 
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />) 
        : products.slice(0, 8).map((item) => (
            <Product item={item} key={item.id} />
        ))}
    </Container>
  );
};

export default Products;
