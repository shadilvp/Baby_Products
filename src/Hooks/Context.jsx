
import  Axios  from "axios";
import * as Yup from 'yup';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const ProductContext = createContext();
const Context = ({children}) => {
    const navigate = useNavigate();

    const [product, setProduct] = useState([]); // for product storing
    const [userDetails, setUserDetails] = useState([ ]); // for storing details
    const [quantity, setQuantity] = useState(1); // for storings the quantitys (counter)
    const [cartitems, setCartitems] = useState([]) // store the items in the cart


// Fetching Json =>

    useEffect(()=>{
        
        const fetchdata = async () => {
            try {
                const responce = await Axios.get("http://localhost:4000/products") // for fetching the prodect details from json server              setProduct(responce.data);
                console.log( "product details added ",responce.data);
            } catch (error) {
                console.error("product details is not added",error);
                
            }
            
            
        };
        fetchdata()
        
    },[])

    const PostUserDetails = async (newItem) => {
        try {
            const responce = await Axios.post("http://localhost:4000/users" , newItem)  // for adding the user details from json server
            console.log("user details stored to json" , responce.data);
            
        } catch (error){
            console.error("User Not Registered",error);
            
        }
              
    }
    useEffect (()=> {
        const GetUserDetails = async () => {
            try {
                const responce = await Axios.get("http://localhost:4000/users") // for fetching the user details from json server
                setUserDetails(responce.data)
                console.log("user details getted",responce.data);
                
            } catch (error) {
                console.error("didnt get the details",error);
                
            }        
        }
        GetUserDetails()
    }, [])

    const UpdateCart = async (userId , UpdatedCart) => {
        try {
            const responce = await Axios.patch(`http://localhost:4000/users/${userId}`);
                cart : UpdatedCart ;
                console.log("cart is updated" ,responce.data);
                
        } catch (error) {
            console.error("cart is not updated",error);
            
        }
    }


// Quantity Handling

    const HandleAdd = () => {
        setQuantity(c => c + 1)
    };

    const HandleRemove = () => {
        quantity > 1 && setQuantity( c => c - 1)
    };


// Form Validation for signup and login

    const SignUpValidation = Yup.object({ // checked the objects in the form validation at signup page by using yup
        name: Yup.string().min(3, 'Name must be at least 3 characters').required('Enter Your Full Name'),
        email: Yup.string().email("Please Enter a Valid Email").required('Enter Your Email'),
        password: Yup.string().min(5, 'Password must be at least 5 characters').required('Enter A New Password'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
    });

    const LoginValidation = Yup.object ({ // checked the objects in the form validation at login page by using yup
        email : Yup.string().email("Please Enter Valid Email").required('Enter Your Email'),
        password : Yup.number().min(5).required('Enter A Valid Password'),
    });


//Handling the cart means when data is stored and cart will show the previus and neew data together

    const HandleCart = (item) => {
        setCartitems(previtems => [...previtems ,item ]);
        navigate('/cart')
    }


    return (
       
            <ProductContext.Provider value={{
                product, PostUserDetails, userDetails , UpdateCart , // import the fetching datas
                quantity, HandleAdd,HandleRemove, // import the quantity handlers
                SignUpValidation , LoginValidation, // import the form validation yup
                cartitems,HandleCart // import the cart handling
                }}>
                {children}
            </ProductContext.Provider>
       
    )
};

export default Context;