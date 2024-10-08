import { useContext } from "react";
import { ProductContext } from "../../Hooks/Fetch";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";
import { QuantityContext } from "../../Hooks/QuantityAddRemove";

const ShowItem = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // called the id passed from shop by using use params
    const { product } = useContext(ProductContext); // imported product from productcontext from fetch component
    const { quantity, HandleAdd, HandleRemove } = useContext(QuantityContext); //imported the counter state for quantity from quantity context 

    const item = product.find((item) => parseInt(item.id) === parseInt(id)); // created a function for selecting items by checking their id's

    return (
        <div>
            <Header />
            <div className="flex flex-col items-center p-6 bg-[#FAF2DD] min-h-screen">
                {item ? (
                    <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
                        <div className="lg:w-1/2">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{item.category}</p>
                                <h1 className="text-3xl font-bold text-[#3C4C3C] mb-2">{item.name}</h1>
                                <p className="text-xl font-semibold text-[#3C4C3C] mb-4">
                                    ₹{item.price} <span className="text-sm text-gray-400">+ Free Shipping</span>
                                </p>
                                <p className="text-gray-700">{item.details}</p>
                            </div>

                            {/* Styling for quantity section */}
                            <div className="flex items-center mt-4 space-x-4">
                                <button
                                    onClick={HandleRemove}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition"
                                >
                                    -
                                </button>
                                <p className="text-xl font-semibold w-6 text-center">{quantity}</p>
                                <button
                                    onClick={HandleAdd}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition"
                                >
                                    +
                                </button>
                            </div> 

                            <button
                                onClick={() => navigate('/cart')}
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
