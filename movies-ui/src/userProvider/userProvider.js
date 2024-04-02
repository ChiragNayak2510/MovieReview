
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCurrentUserStore from '../store/useStore.js';

const UserProvider = ({ children }) => {
    const setCurrentUser = useCurrentUserStore((state) => state.setCurrentUser);
    const navigate = useNavigate();

    useEffect(() => {
        // Read the cookie
        const cookieString = document.cookie;
        
        // Parse the cookie to extract user information
        const currentUserToken = parseAuthToken(cookieString);

        if (currentUserToken) {
            // Set the current user in your application state
            setCurrentUser(currentUserToken);
        } 
    }, [setCurrentUser, navigate]);

    const parseAuthToken = (cookieString) => {
        const cookieData = cookieString.split(';').find(cookie => cookie.trim().startsWith('_auth:'));

        if (cookieData) {
            const tokenString = cookieData.split('=')[1];
            try {
                // Parse the token object
                const tokenObject = JSON.parse(decodeURIComponent(tokenString));
                return tokenObject;
            } catch (error) {
                console.error('Error parsing token:', error);
                return null;
            }
        }

        return null;
    };

    return <>{children}</>; // Render child components
};

export default UserProvider;
