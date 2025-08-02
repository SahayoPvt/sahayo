import { products } from "../utils/ProductData";
import React,{ createContext, useState } from "react";

export const storeContext=createContext()

const StoreProvider=({children})=>{

    const [qty, setQty] = useState(1);
    
      const decrement = () => {
        setQty((qty) => qty - 1);
      };
    
      const increment = () => {
        setQty((qty) => qty + 1);
      };
    return <storeContext.Provider value={{products,qty,decrement ,increment}}>{children}</storeContext.Provider>
}
export default StoreProvider