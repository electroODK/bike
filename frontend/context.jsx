import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState(null);

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
    <MyContext.Provider
      value={{
        value,
        setValue,
        BikeOptions,
        handleCheckBoxChange,
        question,
        switchQuestion,
        totalPrice,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
