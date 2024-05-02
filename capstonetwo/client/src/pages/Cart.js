import React, { useEffect } from 'react';
import styled from 'styled-components';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateCart, clearCart } from '../redux/cartRedux';
// import StripeCheckout from 'react-stripe-checkout';
// import { useEffect, useState } from 'react';
// import { userRequest } from '../requestMethods';
// import { useHistory } from 'react-router-dom';

// const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px"})};
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none"})};
    text-align: center;
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 150px;
    align-items: center;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column"})};
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column"})};
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;  

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    line-height: 2.0;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;  

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 20px;
    margin: 5px;
    ${mobile({ margin: "5px 15px"})};
`;

const ProductPrice = styled.div`
    font-size: 24px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px"})};
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`;

const ClearCartButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`;


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    console.log("Cart state in Cart component:", cart);

    // Load cart from local storage
    // useEffect(() => {
    //     const savedCart = localStorage.getItem('cart');
    //     console.log("Loaded cart from localStorage:", savedCart);
    //     if (savedCart) {
    //         dispatch(updateCart(JSON.parse(savedCart)));
    //     }
    // }, [dispatch]);

    // Save cart to local storage whenever it changes
    // useEffect(() => {
    //     localStorage.setItem('cart', JSON.stringify(cart));
    // }, [cart]);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // const [stripeToken, setStripeToken] = useState(null);
    // const history = useHistory();

    // const onToken = (token) => {
    //     setStripeToken(token);
    // };

// STRIPE PAYMENTS
    // useEffect(() => {
    //     const makeRequest = async () => {
    //         try {
    //             const res = await userRequest.post("/checkout/payment", {
    //                 tokenId: stripeToken.id,
    //                 amount: 500,
    //             });
    //             history.push("/success", { data : res.data });
    //         } catch {}
    //     };
    //     stripeToken && cart.total >=1 &&makeRequest();
    // }, [stripeToken, cart.total, history]);

    // {cart.products.map(product => {
    //     console.log(product);

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
            <Link to="/products">
                <TopButton>CONTINUE SHOPPING</TopButton>
            </Link>
            <TopTexts>
                <TopText>SHOPPING BAG ( {cart.quantity } )</TopText>
                <ClearCartButton onClick={handleClearCart}>CLEAR CART</ClearCartButton>
            </TopTexts>
        </Top>
        <Bottom>
            <Info>
                {cart.products.map(product=>(
                <Product>
                    <ProductDetail>
                        <Image src= { product.img }/>
                        <Details>
                            <ProductName><b>Product: </b>{ product.title }</ProductName>
                            <ProductColor color="black"/>
                            {/* <ProductSize><b>Size: </b>{ product.selectedSize }</ProductSize> */}
                            <ProductSize><b>Size: </b>{ product.size }</ProductSize>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            {/* <AddOutlinedIcon/> */}
                            <ProductAmount>Quantity: { product.quantity }</ProductAmount>
                            {/* <RemoveOutlinedIcon/> */}
                        </ProductAmountContainer>
                        <ProductPrice>$ { product.price * product.quantity }</ProductPrice>
                    </PriceDetail>
                </Product>))}
                <Hr/>
                
            </Info>
            <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>$ { cart.total }</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>$ { (cart.total + 5.90).toFixed(2) }</SummaryItemPrice>
                </SummaryItem>
                <Button>CHECKOUT NOW</Button>
            </Summary>
        </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  );
};

export default Cart;
