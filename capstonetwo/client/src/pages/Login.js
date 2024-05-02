import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
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
        url("https://scontent.cdninstagram.com/v/t39.30808-6/439586600_18429368434009960_3185039777796462627_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=18de74&_nc_ohc=mzRAVQ4RRf8Q7kNvgHWIqEA&_nc_ht=scontent.cdninstagram.com&edm=AM6HXa8EAAAA&oh=00_AfBXNK26FhRa-2E8tJBoX7T3uW0ObHYjqgQKGOfDlCRRNQ&oe=6633B39F")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%"})};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 10px;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-top: 20px;
    &:disabled{
        color: green;
        cursor: not-allowed;
    }
`;

// const Link = styled.a`
//     margin: 5px 0px;
//     font-size: 12px;
//     text-decoration: underline;
//     cursor: pointer;
// `;

const Error = styled.span`
    color: red;
`;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error, isLoggedIn } = useSelector((state) => state.user); 
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);


    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await login(dispatch, { username, password });
            navigate("/");
        } catch (err) {
            console.log("Login error:", error);
        }
    };

    return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                <Input placeholder="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                {error &&<Error>Something went wrong...</Error>}
                {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                <Link>CREATE A NEW ACCOUNT</Link> */}
            </Form>
        </Wrapper>
      
    </Container>
  );
};

export default Login;
