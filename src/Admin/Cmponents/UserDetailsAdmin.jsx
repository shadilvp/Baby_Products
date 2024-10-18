import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../../Hooks/Context';

const UserDetailsAdmin = () => {
  const { id } = useParams();
  const { userDetails, BlockStatus } = useContext(ProductContext);

  const user = userDetails.find((user) => user.id.toString() === id.toString());

  return (
    <div className="container mx-auto p-6">
      {user ? (
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-semibold mb-2">User Details</h2>
            <p className="text-lg">
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">E-Mail:</span> {user.email}
            </p>
            <div className="flex items-center mt-4">
              <span className="text-lg font-semibold mr-2">Status:</span>
              <span className={`text-sm px-2 py-1 rounded ${user.block ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>
                {user.block ? 'User is blocked' : 'User is not blocked'}
              </span>
            </div>
            <button
              onClick={() => { BlockStatus(user.id); }}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              {user.block ? 'Unblock' : 'Block'}
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cart Details</h2>
            <div className="space-y-4">
              {user.cart.length === 0 ? (
                <p className="text-gray-500">No items in cart</p>
              ) : (
                user.cart.map((item, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded mb-4"
                    />
                    <p className="text-gray-700"><strong>Details:</strong> {item.details}</p>
                    <p className="text-gray-700"><strong>Price:</strong> ₹{item.price}</p>
                    <p className="text-gray-700"><strong>Quantity:</strong> {item.quantity}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h2>Order Details</h2>
            {user.orders.map((order, index)=>(
              <div key={index}>
                <h4>Address</h4>
                <p><strong>Full Name:</strong> {order.orderDetails.fullName}</p>
                <p><strong>Email:</strong> {order.orderDetails.email}</p>
                <p><strong>Total Amount:</strong> ₹{order.TotalAmount}</p>
                <h4>Items</h4>
                <div>
                  {order.cartitems.map((cartindex,cartItem)=>(
                     <div key={cartindex}>
                     <h1>name:{cartItem.name}</h1>
                   </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No users found</div>
      )}
    </div>
  );
};

export default UserDetailsAdmin;
