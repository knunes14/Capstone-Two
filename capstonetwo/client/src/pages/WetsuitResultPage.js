import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://scontent.cdninstagram.com/v/t39.30808-6/432668450_18422350075009960_5527286107716371751_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=18de74&_nc_ohc=teVK6oMr_90Q7kNvgFyfS7X&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&oh=00_AfAH_-vBDAN78PbJTXrvjo6E7OclI4s35ZbbRRHhnfypsQ&oe=66338E71")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
`;

const Button = styled.button`
    width: 100%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-top: 20px; // Added space above the button
    &:disabled {
        background-color: gray;
    }
`;

const WetsuitResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { perfectFit } = location.state || {}; // Defaulting to an empty object if state is undefined

    const handleReturn = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <Container>
            <Wrapper>
                <Title>YOUR PERFECT FIT</Title>
                {perfectFit ? (
                    <p>The perfect fit based on your measurements is size: {perfectFit}</p>
                ) : (
                    <p>No wetsuit recommendation available. Please go back and try again.</p>
                )}
                <Button onClick={handleReturn}>Try Again</Button>
            </Wrapper>
        </Container>
    );
};

export default WetsuitResultPage;




