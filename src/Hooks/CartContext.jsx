import React, { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
export const CartContext = createContext(); 
const CartProvider = ({children}) => {
    const navigate = useNavigate();
    const [cartitems, setCartitems] = useState([])

    const HandleCart = (item) => {
        setCartitems(previtems => [...previtems ,item ]);
        navigate('/cart')
    }
  return (
        <CartContext.Provider value={{cartitems,HandleCart}}>
            {children}
        </CartContext.Provider>
  )
}

export default CartProvider ;
