import React, { createContext, useState } from 'react'
export const {CartContext} = createContext(); 
const CartProvider = ({children}) => {
    const [cartitems, setCartitems] = useState([])

    const HandleCart = (event) => {
        setCartitems(event.target.value);
    }
  return (
    <div>
        <CartContext.Provider value={{cartitems,HandleCart}}>
            {children}
        </CartContext.Provider>
    </div>
  )
}

export default CartProvider ;
