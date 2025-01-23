import {useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../Header&footer/Footer";
import Header from "../Header&footer/Header";
import { useDispatch,useSelector } from "react-redux";
import { fetchSpecificProduct} from "../../../redux/slices/productSlice";
import { addToCart ,currentUserCart} from "../../../redux/slices/cartSlice";
import Swal from "sweetalert2";


const ShowItem = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams();
    

    const { product, status, error } = useSelector((state) => state.products);
    // const { notLogged, itemIncluded } = useSelector((state) => state.cart);
  
    const userId = localStorage.getItem("userId");
    useEffect(() => {
    // Dispatch the fetchProducts action to get products
        dispatch(fetchSpecificProduct(id));
        dispatch(addToCart(userId))
    }, [dispatch,id]);

    const accessToken = localStorage.getItem("accessToken")



    const handleAddToCart = () => {

        dispatch(addToCart({ userId, productId:id, quantity:1 ,accessToken}))
        dispatch(currentUserCart(userId))
         Swal.fire({
            position: "top-end",
            icon: "success",
            title: "item is added",
            showConfirmButton: false,
            timer: 2000,
        });
    }
    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;
    return (
        <div className="flex flex-col min-h-screen bg-[#FAF2DD]">
            <Header />
            <div className="flex flex-col md:flex-row md:justify-center items-center flex-grow p-8">
                <button
                    onClick={() => navigate("/shop")}
                    className="mb-4 md:mb-0 text-blue-500 hover:text-blue-700 transition-colors duration-300"
                >
                    Back
                </button>
    
                {product ? (
                    <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="flex-shrink-0 w-full md:w-1/2">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-72 object-cover md:h-full rounded-lg"
                            />
                        </div>
                        <div className="md:w-1/2 p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{product.category}</p>
                                <h1 className="text-2xl sm:text-3xl font-bold text-[#3C4C3C] mb-2">{product.name}</h1>
                                <p className="text-xl font-semibold text-[#3C4C3C] mb-4">
                                    ₹{product.price} <span className="text-sm text-gray-400">+ Free Shipping</span>
                                </p>
                                <p className="text-gray-700 mb-4">{product.details}</p>
                            </div>
    
                            <button
                                onClick={handleAddToCart}
                                className="mt-6 bg-[#3C4C3C] text-white py-2 px-4 rounded-md hover:bg-[#9ED1DB] transition duration-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-red-500">Item not found</p>
                )}
            </div>
            <Footer />
        </div>
    );
    
};


export default ShowItem;
