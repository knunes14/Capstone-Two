import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/apiCalls';
import styled from 'styled-components';
import { mobile } from '../responsive';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Container = styled.div`
    height: 60px;
    padding: 10px;
    ${mobile({ height: "50px"})};
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px"})};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none"})};
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px"})};
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    color: black;
    ${mobile({ fontSize: "24px"})};
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2,justifyContent: "center"})};
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    color: black;
    ${mobile({ fontSize: "12px", marginLeft: "10px"})};

    &:visited {
        color: black;
    }
`;

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity);
  const currentUser = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Current User:", currentUser); // Log the current user's information

  console.log("Cart quantity in Navbar:", quantity);


  const handleLogout = () => {
    logout(dispatch);
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search"/>
            <SearchIcon style={{color: "gray", fontSize: 16}}/>
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: 'none'}}>
            <Logo>SWELLMADE.</Logo>
          </Link>
        </Center>
        <Right>
          {currentUser && (
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
          </Link>
          )}
          {currentUser ? (
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
          ) : (
            <>
              <Link to="/register" style={{ textDecoration: 'none'}}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" style={{ textDecoration: 'none'}}>
                <MenuItem>SIGN IN</MenuItem>
              </Link> 
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
