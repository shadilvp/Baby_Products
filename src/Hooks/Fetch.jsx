import  Axios  from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();
const Fetch = ({children}) => {
    const [product, setProduct] = useState([])

    useEffect(()=>{
        const fetchdata = async () => {
            const responce = await Axios.get("http://localhost:4000/products")
            setProduct(responce.data);
            console.log(responce.data);
            
        };
        fetchdata()
        
    },[])
    return (
       
            <ProductContext.Provider value={product}>
                {children}
            </ProductContext.Provider>
       
    )
};

export default Fetch;