
import  Axios  from "axios";
import * as Yup from 'yup';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserDetails from "../User/Components/pagas/UserDetails";

export const ProductContext = createContext();
const Context = ({children}) => {
    const navigate = useNavigate();

    const [product, setProduct] = useState([]); // for product storing
    const [userDetails, setUserDetails] = useState([ ]); // for storing details
    const [cart, setCart] = useState([]) // store the items in the cart
    const [notLogged , setNotLogged] = useState("") // storing the error message to show in the show item page when user is not logged
    const [itemIncluded, setItemIncluded] = useState("") //storing the error message for if the item is already included in cart
    const [cartStore, setCartStore] = useState([]) // fetched the cart from uuser from json and stored in this state  
    const [filteredProducts, setFilteredProducts] = useState([]); // for finding the 
    const [searchItems, setSearchitems] = useState("")

    const Email = localStorage.getItem("loginemail"); //geting the email from locale storage
    const Password = localStorage.getItem("loginpassword") // geting the password from locale storage
    
//search Bar
    useEffect(() => {
        setFilteredProducts(
            product.filter((product) =>
                product.name.toLowerCase().includes(searchItems.toLowerCase())
            )
        );
    }, [searchItems, product]);

    const handleSearch = (items) => {
        setSearchitems(items);
    };

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

    const GetCurrentUser = userDetails.find((details)=>( // destructerd the current userdetails
        details.email === Email
    ))
    // console.log("GetCurrentUser" , GetCurrentUser)
    

    useEffect(() => {   
        const getCartDetails = async () => {
            if (userDetails.length === 0) {
                // console.log("userDetails is not yet available");
                return;
            }
    
            try {
                const checkingEmail = userDetails.findIndex((userDetailsInJson) => userDetailsInJson.email === Email);
                // console.log("Index found:", checkingEmail);
                // console.log("User details:", userDetails);
    
                if (checkingEmail === -1) {
                    console.error("Email not found in userDetails.");
                    return;
                }
    
                const userId = userDetails[checkingEmail].id;
                const res = await Axios.get(`http://localhost:4000/users/${userId}`);
                // console.log("Axios response:", res.data);
    
                if (res.data && res.data.cart) {
                    setCartStore(res.data.cart);
                    // console.log("cart2", res.data.cart);
                } else {
                    // console.error("No cart data available in the response.");
                }
            } catch (error) {
                console.error("cart is not fetched", error);
            }
        };
    
        getCartDetails();
    }, [userDetails]);
    
    

// Quantity Handling
// console.log("product", product)

// const itemprise = product.find((prise)=>(

// ))
    
    const HandleAddQuantity = async(addItem) => {
        
        setCartStore((prevCart)=>{
            const updatedCart = prevCart.map((item)=>{
                if (item.id === addItem.id) {
                    return { ...item, quantity: item.quantity  + 1 , totalprice :   item.price };
                }
                return item ;
            })
            return updatedCart
        })

        try {
            
        const UpdatedCartitems = cartStore.map((items)=>{
            if(items.id === addItem.id){{
                return{...items,quantity : items.quantity + 1 , price : items.price } 
            }}
            return items ;
        })

        const UpdateData = {cart : UpdatedCartitems }
        // console.log("UpdatedCartitems", UpdateData)
        // console.log('id',GetCurrentUser.id)
        const res = await Axios.patch(`http://localhost:4000/users/${GetCurrentUser.id}`,UpdateData);
        // console.log("quantity updated", res.data);

        } catch (error) {
            console.error("quantity not uppdated" , error);
            
        }
        
    };

    const HandleRemoveQuantity = async (removeItem) => {
        setCartStore((prevCart)=>{
            const updatedCart = prevCart.map((item)=>{
                if(item.id === removeItem.id){
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                }
                return item ;
            })
            return updatedCart
        })
        
        try {
            const UpdatedCartItems = cartStore.map((item)=>{
                if (item.idd === removeItem.id) {
                    return {...item ,  quantity : item.quantity - 1  }
                }
                return item
            })
            const UpdateData = {cart : UpdatedCartItems }

            const res = await Axios.patch(`http://localhost:4000/users/${GetCurrentUser.id}`,UpdateData);
            // console.log("quantity updated", res.data);
    
            } catch (error) {
                console.error("quantity not uppdated" , error);
                
            }
    };
// for removing the items from cart 

    const HandleRemoveItem = async (removeItem) => {
        try {
            
                const updatedCart = cartStore.filter((item)=> item.id !== removeItem.id)

                setCartStore(updatedCart)
            
        
            const updatedData = {cart : updatedCart }
            
            const res = await Axios.patch(`http://localhost:4000/users/${GetCurrentUser.id}`,updatedData);
            console.log("Item removed successfully", res.data);
        } catch (error) {
            console.error("item is not deleted",error);
            
        }

    }

// Form Validation for signup and log in

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
                setTimeout(() => {
                    setNotLogged(""); // Clear message after 3 seconds
                }, 1000);
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
                   setTimeout(() => {
                        setItemIncluded(""); // Clear message after 3 seconds
                    }, 1000);
                   return ;
                }
                const updatedCartItems = [...existingCart , item]; // addinng new cart old carts

                

                const responce = await Axios.patch(`http://localhost:4000/users/${userId}`,{cart : updatedCartItems}); // updating the cart
                console.log("cart updated succesfully" , responce.data);
                setCartStore(updatedCartItems)
                navigate('/cart')
        
        } catch (error) {
            console.error("mistake in updating the cart" , error);
            
        }

        }

// Handling The Cart

useEffect(() => {
    const user = GetCurrentUser // checking if the emails match
  
    if (user) {
      setCartStore(user.cart);
      
    } else {
    //   console.log('User not found');
    }
  }, [userDetails, Email]);

// Reset the cart to an empty array

  const clearCart = () => {
    setCartStore([]); 
  };
// Handling The LogOUT        

    const HandleLogOut = () => { // this function for removing the login
        clearCart() 
        localStorage.removeItem("loginemail");
        localStorage.removeItem("loginpassword")
        navigate('/')
    }

    


// storing shipping adress details in proceed payment validation 


const [orderDetails, setOrderDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    cardNumber: '',
  });

const HandleOrders = async (orders) => {
    
    const Grandtotal = cartStore.reduce((total, item) => total + (item.price * item.quantity), 0);

    try {
        
        const newOrder = {
            orderDetails : orders  ,
            cartitems : cartStore  ,
            TotalAmount : Grandtotal

        }
        console.log("orders" ,orders)
        const updatedCart = [...GetCurrentUser.orders,newOrder]

        const res =  await Axios.patch(`http://localhost:4000/users/${GetCurrentUser.id}`, {
            orders: updatedCart,
            cart : [] ,
        });
        console.log('Order stored successfully');

    } catch (error) {
        console.error("not saved",error);
        
    } 
}

//maping the orderdetails to find the total orders 

const allOrders = userDetails.flatMap(user => user.orders);

const TotalAmount = userDetails?.flatMap(user => 
    user?.orders?.map(order => order?.TotalAmount) || []
  );
  
const totalAmountSum = TotalAmount.reduce((sum, amount) => sum + amount, 0);

//Block and unblock user 

const BlockStatus = async (id) => {
    try {
        const user = userDetails.find((user)=>user.id === id )
        const updatedBlockStatus = !user.block;
    
        const res = await Axios.patch(`http://localhost:4000/users/${id}`, {block: updatedBlockStatus,});
    
        setUserDetails((prevDetails) =>
            prevDetails.map((user) =>
              user.id === id ? { ...user, block: updatedBlockStatus } : user
            )
          );
    } catch (error) {
        console.error("block status is not Changed", error);
        
    }

}

// delete user by admin 

const HandleDeleteUser = async (id) => {
    try {
        await Axios.delete(`http://localhost:4000/users/${id}`)
        setUserDetails((prevDetails) => prevDetails.filter((user) => user.id !== id))
        console.log("After deletion:", userDetails);

        // alert("User Deleted")
    } catch (error) {
        console.error("user is not deleted", error);
        
    }    
}

    return (
       
            <ProductContext.Provider value={{
                product, PostUserDetails, userDetails , // exporting the fetching datas
                 HandleAddQuantity,HandleRemoveQuantity, HandleRemoveItem ,// exporting the quantity handlers & remove item handlers
                SignUpValidation , LoginValidation, // exporting the form validation yup
                  notLogged , itemIncluded ,  // exporting the cart handling
                HandleLogOut , //exporting the Handling logout BUton in login page
                cartStore, //storing the datas and exporting to cart page 
                orderDetails , setOrderDetails ,  HandleOrders,HandleCart, 
                filteredProducts, handleSearch, searchItems,
                allOrders,totalAmountSum,BlockStatus,HandleDeleteUser
                }}>
                {children}
            </ProductContext.Provider>
       
    )
};


export default Context;