import { useContext, useState } from "react";
import { ProductContext } from "../../../Context/Context"; 
import Header from "../Header&footer/Header";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const navigate = useNavigate();
    const { cartStore, HandleAddQuantity, HandleRemoveQuantity, HandleRemoveItem } = useContext(ProductContext);
    
    const TotalAmount = cartStore.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="bg-gray-200 min-h-screen">
            <Header />
            <div className="container mx-auto px-6 py-8">
                
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">My Cart</h1>
                <ul className="space-y-6">
                    {cartStore.length === 0 ? "Cart is empty" : cartStore.map((items, index) => (
                        <li key={index} className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <img 
                                    src={items.image} 
                                    alt={items.name}   
                                    className="w-32 h-32 object-cover rounded-lg mr-6"
                                />
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{items.name}</h2>
                                    <p className="text-gray-600">Price: ₹{items.price.toFixed(2)}</p>
                                    <p className="text-gray-600">Total: ₹{(items.price * items.quantity).toFixed(2)}</p>
                                    <p className="text-gray-500">Details: {items.details}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => HandleRemoveQuantity(items)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition"
                                >-</button>
                                <p className="text-2xl font-semibold">{items.quantity}</p>
                                <button
                                    onClick={() => HandleAddQuantity(items)}
                                    className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition"
                                >
                                    +
                                </button>
                                <button 
                                    onClick={() => HandleRemoveItem(items)} 
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition"
                                >
                                    X
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>{cartStore.length !== 0 && 
                <div className="mt-8 p-6 bg-white shadow-md rounded-lg" >
                    <h2 className="text-2xl font-bold text-gray-800">Grand Total: ₹{TotalAmount.toFixed(2)}</h2>
                    <button 
                        onClick={() => cartStore.length !== 0  ? navigate('/proceedpayment') : alert("cart is empty") } 
                        className="mt-6 w-full bg-[#f3ba2a] hover:bg-[#aa872e] text-white font-bold py-3 rounded-full transition"
                    >
                        Proceed To Payment
                    </button>
                </div> }
            </div>
        </div>
    );
};

export default Cart;
