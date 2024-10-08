import { createContext, useState } from "react"
export const QuantityContext = createContext();
const QuantityProvider = ({children}) => {
    const [quantity, setQuantity] = useState(1);

    const HandleAdd = () => {
        setQuantity(c => c + 1)
    };

    const HandleRemove = () => {
        quantity > 1 && setQuantity( c => c - 1)
    };

    return(
        <QuantityContext.Provider value={{quantity, HandleAdd,HandleRemove}}>
            {children}
        </QuantityContext.Provider>
    )
}

export default QuantityProvider ;