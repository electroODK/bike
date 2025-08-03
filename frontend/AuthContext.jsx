import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext(null); // было AuthContext

export const AppProvider = ({ children }) => {
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

    const [BikeOptions, setBikeOptions] = useState([
        { id: 1, helmet: false, light: false, lock: false },
        { id: 2, helmet: false, light: false, lock: false },
        { id: 3, helmet: false, light: false, lock: false },
    ]);

    const [totalPrice, setTotalPrice] = useState(0);

    const handleCheckBoxChange = (index, key, price) => {
        const updated = [...BikeOptions];
        const currentValue = updated[index][key];

        updated[index][key] = !currentValue;
        setBikeOptions(updated);

        if (!currentValue) {
            setTotalPrice((prev) => prev + price);
        } else {
            setTotalPrice((prev) => prev - price);
        }
    };

    const [question, setQuestion] = useState(false);
    const switchQuestion = () => setQuestion((prev) => !prev);

    return (
        <AppContext.Provider value={{
            isLoggedIn,
            login,
            logout,
            BikeOptions,
            handleCheckBoxChange,
            question,
            switchQuestion,
            totalPrice,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
