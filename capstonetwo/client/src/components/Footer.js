import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column"})};
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Description  = styled.p`
    margin: 20px 0px;
`;

const SocialContainer = styled.div`
    display: flex;
`;

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none"})};
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8"})};
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;


const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>SWELLMADE.</Logo>
            <Description>
            Swellmade is the proud distributor of Matuse wetsuits for men and women.
            </Description>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <FacebookIcon/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <InstagramIcon/>
                </SocialIcon>
                <SocialIcon color="000000">
                    <XIcon/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>

            <Title>Useful Links</Title>
            <List>
            <ListItem>
                <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>Home</Link>
            </ListItem>
            <ListItem>
                <Link to="/cart" style={{ textDecoration: 'none', color: 'black'}}>Cart</Link>
            </ListItem>
            <ListItem>
                <Link to="/products/men" style={{ textDecoration: 'none', color: 'black'}}>Men's Wetsuits</Link>
            </ListItem>
            <ListItem>
                <Link to="/products/women" style={{ textDecoration: 'none', color: 'black'}}>Women's Wetsuits</Link>
            </ListItem>
            <ListItem>
                <Link to="/" style={{ textDecoration: 'none', color: 'black'}}>My Profile</Link>
            </ListItem>
            <ListItem>
                <Link to="/products" style={{ textDecoration: 'none', color: 'black'}}>All Products</Link>
            </ListItem>
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem>
                <LocationOnIcon style={{marginRight: "10px"}}/> San Diego, CA
            </ContactItem>
            <ContactItem>
                <PhoneIcon style={{marginRight: "10px"}}/> +1 234 567 8910
            </ContactItem>
            <ContactItem>
                <MailOutlinedIcon style={{marginRight: "10px"}}/> swellmade@example.com
            </ContactItem>
            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
        </Right>
      
    </Container>
  )
}

export default Footer;
