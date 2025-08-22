import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('role');

        if (token) {
            setIsLoggedIn(true);
        }
        if (role === "admin") {
            setIsAdmin(true);
        }
    }, []);

    const login = (token, role) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('role', role);

        setIsLoggedIn(true);
        setIsAdmin(role === "admin");
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');

        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    const value = {
        isLoggedIn,
        isAdmin,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
