import React, { createContext, useContext, useState } from "react";

// Create context
const QuantityContext = createContext();

// Provider component
export const QuantityProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1);

  const decrement = () => {
    setQuantity((qty) => Math.max(1, qty - 1));
  };

  const increment = () => {
    setQuantity((qty) => qty + 1);
  };

  return (
    <QuantityContext.Provider value={{ quantity, setQuantity, decrement, increment }}>
      {children}
    </QuantityContext.Provider>
  );
};

// Custom hook for easy usage
export const useQuantity = () => useContext(QuantityContext);