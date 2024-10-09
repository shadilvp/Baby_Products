import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";
import { ProductContext } from "../../Hooks/Context"; 
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Shop = () => {

    const {product} = useContext(ProductContext);
    const navigate = useNavigate()

    if(!product){ 
        return <h1>No products</h1>
    }

    return (
        <div>
            <Header />
            <div className="p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    
                    {/*displayed the product from product context by using map */}
                     {product.map((product) => (    
                        <div key={product.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-48 h-48 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold text-center mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2 ">Price: ₹ <strong>{product.price}</strong></p>
                            <p className="text-gray-600 mb-2">Catogory : {product.category}</p>
                            <button onClick={()=> navigate(`/shop/${product.id}`)}> View details</button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
