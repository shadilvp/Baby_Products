
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
    const [cart, setCart] = useState([]) // store the items in the cart
    const [cartdatas, setCartdatas] = useState([]) // to store the datas passed the condtion in cart section
    const [notLogged , setNotLogged] = useState("") // storing the error message to show in the show item page when user is not logged
    const [itemIncluded, setItemIncluded] = useState("") //storing the error message for if the item is already included in cart
    
    const Email = localStorage.getItem("loginemail","*****"); //geting the email from locale storage
    const Password = localStorage.getItem("loginpassword","*****") // geting the password from locale storage


// Fetching Json =>

    useEffect(()=>{
        
        const fetchdata = async () => {
            try {
                const responce = await Axios.get("http://localhost:4000/products") // for fetching the prodect details from json server
                setProduct(responce.data);
                // console.log( "product details added ",responce.data);
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

                
                const res= await Axios.get("")
              
                
                // console.log("user details getted",responce.data);
                
            } catch (error) {
                console.error("didnt get the details",error);
                
            }        
        }
        GetUserDetails()
    }, [])

   

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

    const  HandleCart = async (item) => {
        try {
            

            if (!Password || Password.length === 0) { // condition to check any users is logged or noot
                setNotLogged("User want to LogIn first")
                return ;
            };
               
            

            const checkingEmail = userDetails.findIndex((userDetailsInJson) => userDetailsInJson.email == Email ); // checking the email in locale storage is mathing to any  email in json

            if (checkingEmail === -1) { //checking the email is correct
                console.log("nothing is added to cart");
                return ;
            }
                const userId = userDetails[checkingEmail].id ; //destructuring the id from users
                const res= await Axios.get(`http://localhost:4000/users/${userId}`)
                
                const cart2=res.data.cart
                
                const existingCart = (cart2) || []  ;
                const itemExists = cart2.some((cartitems)=> cartitems.id == item.id) // checking that the item is include or not 

                if (itemExists) {
                   setItemIncluded("item is already in cart");
                //    console.log("item is already in cart");
                   return ;
                }
                const updatedCartItems = [...existingCart , item]; // addinng new cart old carts
                const updatedData = {cart : updatedCartItems}; // adding the cart

                

                const responce = await Axios.patch(`http://localhost:4000/users/${userId}`,updatedData); // updating the cart
                console.log("cart updated succesfully" , responce.data);
                setCart(updatedCartItems)
                navigate('/cart')
        
        } catch (error) {
            console.error("mistake in updating the cart" , error);
            
        }

        }

// Handling The Cart

        useEffect(()=>{
            const user = userDetails.find((users)=> users.email === Email); // checking the both emails are matching or not
    
            if(!user){
                console.log("invalid user ");
            }else{
                setCartdatas([user.cart]) 
            }
        },[userDetails , Email])

// Handling The LogOUT        

    const HandleLogOut = () => { // this function for removing the login 
        localStorage.removeItem("loginemail");
        localStorage.removeItem("loginpassword")
        navigate('/')
    }



    return (
       
            <ProductContext.Provider value={{
                product, PostUserDetails, userDetails , // exporting the fetching datas
                quantity, HandleAdd,HandleRemove, // exporting the quantity handlers
                SignUpValidation , LoginValidation, // exporting the form validation yup
                HandleCart , cart, notLogged , itemIncluded ,  // exporting the cart handling
                HandleLogOut , //exporting the Handling logout BUton in login page
                cartdatas, //storing the datas and exporting to cart page 
                }}>
                {children}
            </ProductContext.Provider>
       
    )
};


export default Context;