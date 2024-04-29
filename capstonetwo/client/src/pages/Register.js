import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { register } from '../redux/apiCalls';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    ${mobile({ width: "75%"})};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column; // Changed for better form structure
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0; // Simplified margin for uniform spacing
    padding: 10px;
`;

const Button = styled.button`
    width: 100%; // Full width for better UI
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: gray; // Visual cue for disabled state
    }
`;

const Error = styled.span`
    color: red;
`;

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/"); // Redirect to home page on successful registration
        }
    }, [currentUser, navigate]);

    const handleClick = async (e) => {
        e.preventDefault();
        register(dispatch, { username, email, password }); // Directly dispatch register action
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button onClick={handleClick} disabled={isFetching}>CREATE</Button>
                    {error && <Error>Something went wrong...</Error>}
                </Form>
            </Wrapper>
        </Container>
    );
};

export default Register;