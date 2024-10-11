import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Hooks/Context"; 
import Header from "../Header&footer/Header";

const Cart = () => {
    const {cartStore , HandleAdd,HandleRemove} = useContext(ProductContext);


        return(
            <div> 
                <Header/>
                <div>
            <ul>
                {cartStore.map((items,index)=>(
                    <li key={index}>
                        <img 
                            src={items.image} 
                            alt={items.name}   
                            className="w-48 h-48 object-cover mb-4 rounded-lg"
                        />
                        <h2><strong>{items.name}</strong></h2>
                        <h1>{items.price * items.quantity}</h1>
                        <p>{items.details}</p>
                        <div className="flex items-center mt-4">
                            <button
                                onClick={()=> HandleRemove(items)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition"
                            >-</button>
                            <p className="text-xl font-semibold mx-4">{items.quantity}</p>
                            <button
                                onClick={() => HandleAdd(items)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition"
                            >
                                +
                            </button>
                        </div>
                    </li>
                ))}
                
            </ul>
                        
            </div>
        </div>
            
        )
};

export default Cart