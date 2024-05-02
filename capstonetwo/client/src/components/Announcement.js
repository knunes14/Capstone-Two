import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
    height: 30px;
    color: black;
    font-weight: 500;
    font-size: 14px;
    padding: 10px;
    background-color: #b7dbd6;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Announcement = () => {
  return (
    <Container>
        <Link to="/sizeform" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'black' }}>CLICK HERE TO TRY OUR NEW WETSUIT RECOMMENDATION TOOL! #LOVEMATUSE</Link>
    </Container>
  );
};

export default Announcement;
