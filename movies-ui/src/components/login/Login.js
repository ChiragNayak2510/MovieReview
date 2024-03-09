import React from 'react';
import { NavLink } from 'react-router-dom'
import {
    FormContainer,
    MainContainer,
    InputContainer,
    Input,
    Button,
    ImageContainer,
    HorizontalLine,
    RegisterContainer
} from '../styledComponents/LoginStyledComponent.js'; // Import styled components

const Login = () => {
    const handleSubmit = () => {
        // Add your form submission logic here
    };

    return (
        
        <FormContainer>
            <ImageContainer src="halo.jpg" alt="welcome image" />
            <MainContainer>
                <h3>Sign In</h3>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Input type="text" placeholder="Enter username" />
                        <Input type="password" placeholder="Enter password" />
                    </InputContainer>
                    <Button type="submit">Login</Button>
                </form>
                <div style={{ display: "flex", marginTop: "10px" }}>
                    <HorizontalLine />
                    <p>OR</p>
                    <HorizontalLine />
                </div>
                <NavLink to="/register">
                <RegisterContainer>Create a new account</RegisterContainer>
                </NavLink>
            </MainContainer>
        </FormContainer>
    );
};

export default Login;
