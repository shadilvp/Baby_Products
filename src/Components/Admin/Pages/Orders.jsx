import React from 'react'
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { fetchingAllOrders } from '../../../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';


const Orders = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(fetchingAllOrders())
    },[])

    const { allOrders,loading,error } = useSelector((state)=> state.order)

    console.log("allOrders",allOrders)

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-6 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Back to Dashboard
          </button>
      
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
      
          <div className="orders-list grid grid-cols-1 gap-6">
            {allOrders.map((order) => (
              <div
                key={order._id}
                className="order-card bg-white border p-6 rounded shadow-lg transition-transform transform hover:scale-105 w-3/4 mx-auto"
              >
                <h3 className="text-xl font-bold mb-2">Order ID: {order._id}</h3>
                <p>
                  <strong>Payment Status:</strong> {order.status}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{order.totalAmount}
                </p>
                <p>
                  <strong>User:</strong> {order.address.firstName}{" "}
                  {order.address.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {order.address.email}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>
      
                <h4 className="font-semibold mt-4">Items:</h4>
                <br />
                <ul className="pl-4">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 mb-2">
                      <img
                        src={item.productId.image || "https://via.placeholder.com/50"}
                        alt={item.productId.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>
                        {item.productId.name} - Qty: {item.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
      
                <div className="mt-4">
                  <label htmlFor={`status-${order._id}`} className="mr-2 font-bold">
                    Shipping Status:
                  </label>
                  <select
                    id={`status-${order._id}`}
                    className="px-3 py-2 border rounded"
                  >
                    <option value="Nothing">To Ship</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
}

export default Orders
