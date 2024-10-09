import { useContext } from "react";
import { CartContext } from "../../Hooks/CartContext";

const Cart = () => {
    const {cartitems} = useContext(CartContext);
        return(
            <div>
                <ul>
                    {cartitems.map((items)=>(
                        <li key={items.id}>
                            <h2>{items.name}</h2>
                        </li>
                    ))}
                </ul>
            </div>
        )
};

export default Cart