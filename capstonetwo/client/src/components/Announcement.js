import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: 30px;
    color: black;
    font-weight: 500;
    font-size: 14px;
    background-color: #b7dbd6;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Announcement = () => {
  return (
    <Container>
        Try Our Dynamic <Link to="/sizeform" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}> Wetsuit Sizing Tool </Link> Today! 
    </Container>
  );
};

export default Announcement;
