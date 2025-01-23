import Header from "../Header&footer/Header";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { removeFromCart,updateCartQuantity,currentUserCart } from "../../../redux/slices/cartSlice";
import { useEffect } from "react";



const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userId = localStorage.getItem("userId"); 


    useEffect(()=>{
      dispatch(currentUserCart(userId))
    },[dispatch,userId])
    

    const cartStore = useSelector((state)=> state.cart.items)
    
    const HandleAddQuantity = (productId) => {
        dispatch(
            updateCartQuantity({
                productId: productId._id,
                action: 'increase'
        })
        ).then(()=> {
            dispatch(currentUserCart(userId));
        })
    }

    const HandleRemoveQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch(
                updateCartQuantity({
                    productId: item.productId._id,
                    action: 'decrease'
            })
            ).then(()=> {
                dispatch(currentUserCart(userId));
            })
        }
    }

    const HandleRemoveItem = (productId) => {
        dispatch(
            removeFromCart({
                productId: productId._id,
            })
        )
    };

    return (
        <div className="bg-gray-200 min-h-screen">
          <Header />
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900">
              My Cart
            </h1>
            <ul className="space-y-6">
              {cartStore && cartStore.items && cartStore.items.length > 0 ? (
                cartStore.items.map((item, _id) => (
                  <li
                    key={_id}
                    className="bg-white shadow-md rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between"
                  >
                    <div className="flex items-center mb-4 sm:mb-0 sm:w-1/2">
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-32 h-32 object-cover rounded-lg mr-6"
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {item.productId.name}
                        </h2>
                        <p className="text-gray-600">Price: ₹{item.productId.price}</p>
                        <p className="text-gray-600">Total: ₹{item.totalPrice}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 sm:w-1/2">
                      <button
                        onClick={() => HandleAddQuantity(item.productId)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full transition"
                      >
                        +
                      </button>
                      <p className="text-2xl font-semibold">{item.quantity}</p>
                      <button
                        onClick={() => HandleRemoveQuantity(item)}
                        className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition"
                      >
                        -
                      </button>
                      <button
                        onClick={() => HandleRemoveItem(item.productId)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition"
                      >
                        X
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-700">Your cart is empty.</p>
              )}
            </ul>
            {cartStore && cartStore.items && cartStore.items.length > 0 && (
              <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800">
                  Grand Total: ₹{cartStore.totalAmount}
                </h2>
                <button
                  onClick={() =>
                    cartStore.items.length !== 0
                      ? navigate("/proceedpayment")
                      : alert("Cart is empty")
                  }
                  className="mt-6 w-full bg-[#f3ba2a] hover:bg-[#aa872e] text-white font-bold py-3 rounded-full transition"
                >
                  Proceed To Payment
                </button>
              </div>
            )}
          </div>
        </div>
      );
      
};

export default Cart;




