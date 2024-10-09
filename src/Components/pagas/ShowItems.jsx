import { useContext } from "react";
import {  useParams } from "react-router-dom";
import Header from "../Header&footer/Header";
import Footer from "../Header&footer/Footer";
import { ProductContext } from "../../Hooks/Context";


const ShowItem = () => {
    const { id } = useParams();
    const { product , quantity, HandleAdd, HandleRemove , HandleCart, cartitems} = useContext(ProductContext); 

    const item = product.find((item) => parseInt(item.id) === parseInt(id));


    return (
        <div>
            <Header />
            <div>
                {item ? (
                    <div>
                        <div>
                            <img
                                src={item.image}
                                alt={item.name}
                            />
                        </div>
                        <div>
                            <p>{item.category}</p>
                            <h1>{item.name}</h1>
                            <p>₹{item.price}</p>
                            <p>{item.details}</p>
                        </div>

                        <div>
                            <button onClick={HandleRemove}>-</button>
                            <p>{quantity}</p>
                            <button onClick={HandleAdd}>+</button>
                        </div>

                        <button onClick={() => HandleCart(item)}>
                            Add to Cart
                        </button>
                    </div>
                ) : (
                    <p>Item not found</p>
                )}
            </div>
            <Footer />
            {console.log(cartitems)}
        </div>
    );
};

export default ShowItem;
