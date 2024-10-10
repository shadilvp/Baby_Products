import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../Hooks/Context"; 

const Cart = () => {
    const {cartdatas} = useContext(ProductContext);

    


    
    console.log( "user details",cartdatas); 

        return(
            <div>
                <ul>
                    {cartdatas.map((items)=>(
                        <li key={items.id}>
                            <h2>{items.name}</h2>
                        </li>
                    ))}
                </ul>
            </div>
        )
};

export default Cart