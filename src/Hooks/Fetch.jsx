import  Axios  from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();
const Fetch = ({children}) => {
    const [product, setProduct] = useState([]);
    const [userDetails, setUserDetails] = useState([ ]);

    useEffect(()=>{
        const fetchdata = async () => {
            const responce = await Axios.get("http://localhost:4000/products")
            setProduct(responce.data);
            console.log(responce.data);
            
        };
        fetchdata()
        
    },[])

    const PostUserDetails = async (newItem) => {
        try {
            const responce = await Axios.post("http://localhost:4000/users" , newItem)  
        } catch (error) {
            console.error("User Not Registered",error);
            
        }
              
    }
    useEffect (()=> {
        const GetUserDetails = async () => {
            try {
                const responce = await Axios.get("http://localhost:4000/users")
                setUserDetails(responce.data)
                console.log("gettted",responce.data);
                
            } catch (error) {
                console.error("didnt get the details",error);
                
            }        
        }
        GetUserDetails()
    }, [])


    return (
       
            <ProductContext.Provider value={{product, PostUserDetails, userDetails}}>
                {children}
            </ProductContext.Provider>
       
    )
};

export default Fetch;