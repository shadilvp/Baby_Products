import React, { useEffect } from 'react'
import { fetchUserOrders } from '../../../redux/slices/orderSlice'; 
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserOrders=()=> {
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(()=>{
        dispatch(fetchUserOrders(userId))
    },[dispatch]);

    const {specificOrder} = useSelector((state)=> state.order);

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-10">
        <div className="w-full sm:w-4/5">
          {/* Back Home Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Go Back Home
            </button>
          </div>
    
          {specificOrder.map((order, index) => (
            <div
              key={index}
              className="w-full sm:w-[65vw] bg-white p-6 rounded-lg shadow-lg mb-8 mx-auto hover:scale-[1.02] transition-transform duration-300"
            >
              {/* Address Section */}
              <div className="border-b pb-4 mb-4">
                <h4 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">
                  Shipping Address
                </h4>
                <p className="text-sm sm:text-base text-gray-700 mb-2">
                  <strong>Full Name:</strong> {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-sm sm:text-base text-gray-700 mb-2">
                  <strong>Phone:</strong> {order.address.phone}
                </p>
                <p className="text-sm sm:text-base text-gray-700">
                  <strong>Details:</strong> {order.address.streetAddress},<br />
                  {order.address.city}, {order.address.state}, {order.address.postalCode}
                </p>
              </div>
    
              {/* Items Section */}
              <div>
                <h4 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800">
                  Ordered Items
                </h4>
                <div className="space-y-4">
                  {order.items.map((cartItem, cartIndex) => (
                    <div
                      key={cartIndex}
                      className="flex flex-col sm:flex-row items-center gap-6 bg-gray-50 p-4 rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-300"
                    >
                      <img
                        src={cartItem.productId.image}
                        alt={cartItem.productId.name}
                        className="w-24 h-24 object-cover rounded-md sm:w-20 sm:h-20"
                      />
                      <div>
                        <p className="text-lg font-semibold text-gray-800">
                          {cartItem.productId.name}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          <strong>Quantity:</strong> {cartItem.quantity}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600">
                          <strong>Item Total:</strong> ₹{cartItem.productId.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              {/* Total Amount Section */}
              <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-6">
                <strong>Total Amount:</strong> ₹{order.totalAmount}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
    
};

export default UserOrders;
