import { useContext } from "react";
import { ProductContext } from "../../Hooks/Fetch";
import { useParams } from "react-router-dom";
import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";

const ShowItem = () => {
    const { id } = useParams();
    const {product} = useContext(ProductContext);

    const item = product.find((item) => parseInt(item.id) === parseInt(id));

    return (
        <div>
            <Header/>
            <div className="flex flex-col items-center p-6 bg-[#FAF2DD] min-h-screen">
            
            {item ? (
                <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
                    {/* Image Section */}
                    <div className="lg:w-1/2">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Details Section */}
                    <div className="lg:w-1/2 p-6 flex flex-col justify-between">
                        <div>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            <h1 className="text-3xl font-bold text-[#3C4C3C] mb-2">{item.name}</h1>
                            <p className="text-xl font-semibold text-[#3C4C3C] mb-4">
                                ₹{item.price} <span className="text-sm text-gray-400">+ Free Shipping</span>
                            </p>
                            <p className="text-gray-700">{item.details}</p>
                        </div>
                        {/* Optional Action Button */}
                        <button className="mt-4 bg-[#3C4C3C] text-white py-2 px-4 rounded-md hover:bg-[#9ED1DB] transition duration-200">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-red-500">Item not found</p>
            )}
            </div>
            <Footer/>
        </div>
    );
}

export default ShowItem;
