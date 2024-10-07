import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";
import { ProductContext } from "../../Hooks/Fetch";
import { useContext } from "react";

const Shop = () => {
    const products = useContext(ProductContext);

    return (
        <div>
            <Header />
            <div className="p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border rounded-lg shadow-lg p-4 flex flex-col items-center">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-48 h-48 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold text-center mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2 ">Price: ₹ <strong>{product.price}</strong></p>
                            <p className="text-gray-600 mb-2">Catogory : {product.category}</p>
                            <p>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <box-icon key={index} name='star' color='#fff049'></box-icon>
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Shop;
