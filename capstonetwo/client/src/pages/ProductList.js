import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';


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
    const { category } = useParams();
    console.log("Category from URL:", category);
    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    console.log("Category from URL:", cat);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);


    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name]: value,
        });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value.toLowerCase();
        setSelectedCategory(category);
        navigate(`/products/${category}`);

        if (category) {
            console.log("Navigating to:", `/products/${category}`); // Debug the navigation path
            navigate(`/products/${category}`);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const response = await fetch('http://localhost:5000/server/products?category=${selectedCategory}`');
            if (!response.ok) throw new Error('Network response was not ok.');
            const data = await response.json();
            setFilteredProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
    
        if (selectedCategory) {
            fetchProducts();
        }
    }, [selectedCategory]);
    

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
                <FilterText>Select Category:</FilterText>
                        <Select name="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <Option value="">Select Category</Option>
                        <Option value="Men">Men</Option>
                        <Option value="Women">Women</Option>
                    </Select>
            </Filter>
            {/* <Filter>
                <FilterText>Filter Products by Size:</FilterText>
                    <Select name="size" onChange={handleFilters} disabled={!cat}>
                        <Option disabled selected>Size</Option>
                        {cat && sizeOptions.map(size => (
                        <Option key={size} value={size}>{size}</Option>
                    ))}
                    </Select>
            </Filter> */}
            <Filter>
                <FilterText>Sort Products:</FilterText>
                <Select name ="sort" onChange={e=>setSort(e.target.value)}>
                    <Option value="newest" >Newest</Option>
                    <Option value="asc">Price (asc)</Option>
                    <Option value="desc">Price (desc)</Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Products cat={cat} filters={filters} sort={sort} products={filteredProducts}/>
        <Newsletter/>
        <Footer/>
    </Container>
  );
};

export default ProductList;
