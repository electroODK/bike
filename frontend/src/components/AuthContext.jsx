import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []); 
    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };
    const value = {
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};