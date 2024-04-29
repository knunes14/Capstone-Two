import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div``;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column"})};
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px"})};
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px"})};
`;

const Option = styled.option`
`;

const ProductList = () => { 
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    const menSizes = ['XS', 'S', 'ST', 'MS', 'M', 'MT', 'ML', 'LS', 'L', 'LT', 'XLS', 'XL', '2XLS', 'XLT', 'XXL', 'XXXL'];
    const womenSizes = ['2', '4', '6S', '6', '6T', '8S', '8', '8T', '10S', '10', '10T', '12', '14'];
    const sizeOptions = cat === "men" ? menSizes : womenSizes;

    console.log("Category:", cat);

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Title>{cat}</Title>
        <FilterContainer>
            <Filter>
                {/* <FilterText>Select Category:</FilterText>
                    <Select name="category" onChange={(e) => setCategory(e.target.value)}>
                        <Option value="">--Select Category--</Option>
                        <Option value="Men">Men</Option>
                        <Option value="Women">Women</Option>
                    </Select>
            </Filter>
            <Filter> */}
                <FilterText>Filter Products by Size:</FilterText>
                    <Select name="size" onChange={handleFilters} disabled={!cat}>
                        <Option disabled selected>Size</Option>
                        {cat && sizeOptions.map(size => (
                        <Option key={size} value={size}>{size}</Option>
                    ))}
                    </Select>
            </Filter>
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select onChange={e=>setSort(e.target.value)}>
                    <Option value="newest" >Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort}/>
        <Newsletter/>
        <Footer/>
    </Container>
  );
};

export default ProductList;
