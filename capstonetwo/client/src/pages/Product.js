import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const menSizes = ['XS', 'S', 'ST', 'MS', 'M', 'MT', 'ML', 'LS', 'L', 'LT', 'XLS', 'XL', '2XLS', 'XLT', 'XXL', 'XXXL'];
const womenSizes = ['2', '4', '6S', '6', '6T', '8S', '8', '8T', '10S', '10', '10T', '12', '14'];

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: "column"})};
`;

const ImgContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh"})};
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px"})};
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%"})};
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    width: auto;  // Ensures the dropdown has a default width
    max-width: 100%;  // Prevents the dropdown from exceeding the width of its container
    overflow: hidden;  // Keeps the dropdown content contained within the element
    cursor: pointer;  // Changes the cursor to indicate it's clickable
    display: inline-block;  // Ensures it doesn't take the full width
    text-overflow: ellipsis;  // Adds an ellipsis if the content is too long

    &:focus {
        outline: none;  // Removes the default focus outline
        border-color: teal;  // Adds a border color when focused
    }
`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%"})};
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;

const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    }
`;


const Product = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({ menSizes: [], womenSizes: [], categories: ''});
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 &&setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch (
      addProduct({ ...product, quantity, size: selectedSize })
    );
  };

  return (
    <Container>
        <Navbar/>
        <Announcement/>
        <Wrapper>
            <ImgContainer>
                <Image src={product.img}/>
            </ImgContainer>
            <InfoContainer>
                <Title>{product.title}</Title>
                <Description>{product.desc}</Description>
                <Price>$ {product.price}</Price>
                <FilterContainer>
                    <Filter>
                        <FilterTitle>Size: </FilterTitle>
                        <FilterSize onChange={(e) => setSelectedSize(e.target.value)}>
                            <option disabled selected>
                                Select Size
                            </option>
                        {(product.categories === 'men'
                            ? menSizes
                            : womenSizes
                        ).map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                        </FilterSize>
                    </Filter>
                </FilterContainer>
                <AddContainer>

                    <AmountContainer>
                        <RemoveOutlinedIcon onClick={() => handleQuantity("dec")}/>
                        <Amount>{quantity}</Amount>
                        <AddOutlinedIcon onClick={() => handleQuantity("inc")}/>
                    </AmountContainer>
                    <Button onClick={handleClick}>ADD TO CART</Button>
                </AddContainer>
            </InfoContainer>
        </Wrapper>
        <Newsletter/>  
        <Footer/>
    </Container>
  );
};

export default Product;
