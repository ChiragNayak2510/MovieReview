import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from 'react-spinners/BeatLoader';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useCurrentUserStore from '../../store/useStore.js';
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const signIn = useSignIn();
    const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('All fields are mandatory');
            return;
        }
        setIsLoading(true);
        try {
            const response = await api.post('/api/v1/auth/login', {
                username: username,
                password: password
            });
            const userResponse = await api.post('/api/v1/auth', {
                token: response.data.token
            });

            signIn({
                auth: {
                    token: response.data.token,
                    type: 'Bearer'
                },
                userState: username
            });

            setCurrentUser(userResponse.data);
            navigate('/');
            toast.success('Login successful');
            
        } catch (error) {
            console.error('Error occurred:', error);
            toast.error('Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer>
            <ImageContainer src="halo.jpg" alt="Welcome to our platform" />
            <MainContainer>
                {isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <BeatLoader size={15} color={'#BB2D3B'} loading={isLoading} />
                    </div>
                )}
                {!isLoading && (
                    <>
                        <h3>Sign In</h3>
                        <form onSubmit={handleSubmit} disabled={isLoading}>
                            <InputContainer>
                                <Input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <Input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </InputContainer>
                            <Button type="submit">Login</Button>
                        </form>
                        <div style={{ display: 'flex', marginTop: '10px' }}>
                            <HorizontalLine />
                            <p>OR</p>
                            <HorizontalLine />
                        </div>
                        <NavLink to="/Register">
                            <RegisterContainer>Create a new account</RegisterContainer>
                        </NavLink>
                    </>
                )}
            </MainContainer>
        </FormContainer>
    );
};

export default Login;
