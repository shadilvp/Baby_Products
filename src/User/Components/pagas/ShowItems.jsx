import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";
import { ProductContext } from "../../Hooks/Context";

const ShowItem = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { product, HandleCart, notLogged, itemIncluded } = useContext(ProductContext);
    
    const item = product.find((item) => parseInt(item.id) === parseInt(id));

    return (
        <div className="flex flex-col min-h-screen bg-[#FAF2DD]">
            <Header />
            <div className="flex flex-col md:flex-row md:justify-center items-center flex-grow p-8">
                {item ? (
                    <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="flex-shrink-0 w-full md:w-1/2">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-72 object-cover md:h-full rounded-lg"
                            />
                        </div>
                        <div className="md:w-1/2 p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <h1 className="text-3xl font-bold text-[#3C4C3C] mb-2">{item.name}</h1>
                                <p className="text-xl font-semibold text-[#3C4C3C] mb-4">
                                    ₹{item.price} <span className="text-sm text-gray-400">+ Free Shipping</span>
                                </p>
                                <p className="text-gray-700 mb-4">{item.details}</p>
                            </div>

                            <button
                                onClick={() => HandleCart(item)}
                                className="mt-6 bg-[#3C4C3C] text-white py-2 px-4 rounded-md hover:bg-[#9ED1DB] transition duration-200"
                            >
                                Add to Cart
                            </button>
                            <p className="text-red-500 text-center mt-2">{itemIncluded}{notLogged}{notLogged && (<button className="text-[#430e0e] hover:underline cursor-pointer" onClick={() => navigate('/login')} >  LoginIn</button>)}</p>
                    
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
