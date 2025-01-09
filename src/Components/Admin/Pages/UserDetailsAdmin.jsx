import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { fetchSpecificUser, blockUser, deleteUserTemp } from '../../../redux/slices/userSlice';
import { currentUserCart } from '../../../redux/slices/cartSlice';
import { fetchUserOrders } from '../../../redux/slices/orderSlice';

import { useEffect } from 'react';


const UserDetailsAdmin = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const dispatch = useDispatch();



    useEffect(()=>{
        dispatch(fetchSpecificUser(userId));
        dispatch(currentUserCart(userId));
        dispatch(fetchUserOrders(userId));
    },[dispatch,userId])

    const cartStore = useSelector((state)=> state.cart.items)

    const {specificOrder} = useSelector((state)=> state.order || []);
    console.log("object",specificOrder)


    const handleBlockUser = (userId) => {
        dispatch(blockUser(userId))
        
        dispatch(fetchSpecificUser(userId))
    }

    const handleSoftDeleteUser = (id) => {
        dispatch(deleteUserTemp(id));
      };
    

    const user = useSelector((state)=> state.user.specificUser)    
    return (
      <div className="container mx-auto p-6">
        {user ? (
          <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <div className="border-b pb-4 mb-4">
            <button
              onClick={() => navigate('/users')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <box-icon name='hand-left' type='solid' animation='fade-right' ></box-icon>
            </button>
              <h2 className="text-2xl font-semibold mb-2">User Details</h2>
              <p className="text-lg">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold">E-Mail:</span> {user.email}
              </p>
              <div className="flex items-center mt-4">
                <span className="text-lg font-semibold mr-2">Status:</span>
                <span className={`text-sm px-2 py-1 rounded ${user.isBlock ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>
                  {user.isBlock ? (
                    <div className="flex items-center gap-1">
                      User is blocked <box-icon name='x' color='red' ></box-icon>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      User is not blocked <box-icon name='check' color='green'></box-icon>
                    </div>
                  )}
                </span>
              </div>
              <button
                onClick={() =>  handleBlockUser(user._id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                {user.isBlock ? 'Unblock' : 'Block'}
              </button>
            </div>
            <div className="flex items-center mt-4">
                <span className="text-lg font-semibold mr-2">Status:</span>
                <span className={`text-sm px-2 py-1 rounded ${user.isDelete ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>
                  {user.isDelete ? (
                    <div className="flex items-center gap-1">
                      User is not deleted <box-icon name='x' color='red' ></box-icon>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      User is deleted <box-icon name='check' color='green'></box-icon>
                    </div>
                  )}
                </span>
              </div>
              <button
                onClick={() =>  handleSoftDeleteUser(user._id)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              >
                Delete
              </button>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Cart Details</h2>
              <div className="space-y-4">
                {cartStore.items?.length === 0 ? (
                  <p className="text-gray-500">No items in cart</p>
                ) : (
                    cartStore.items?.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-2">{item.productId.name}</h3>
                      <img
                        src={item.productId.image}
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded mb-4"
                      />
                      <p className="text-gray-700"><strong>Details:</strong> {item.productId.details}</p>
                      <p className="text-gray-700"><strong>Price:</strong> ₹{item.productId.price}</p>
                      <p className="text-gray-700"><strong>Quantity:</strong> {item.quantity}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
              {specificOrder.map((order, index) => (
  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
    <h4 className="text-xl font-semibold mb-2">Address</h4>
    <p className="text-gray-700"><strong>Full Name:</strong> {order.address.firstName} {order.address.lastName}</p>
    <p className="text-gray-700"><strong>Phone:</strong> {order.address.phone}</p>
    <p className="text-gray-700"><strong>Shipping details:</strong> {order.address.streetAddress},<br />{order.address.city},{order.address.state},{order.address.postalCode}</p>

    <h4 className="text-xl font-semibold mt-4 mb-2">Items</h4>
    <div className="space-y-2">
      {order.items.map((cartItem, cartIndex) => (
        <div key={cartIndex} className="bg-white p-3 rounded-lg shadow-sm flex gap-4 items-center">
          <img
            src={cartItem.productId.image}
            alt={cartItem.productId.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div>
            <p className="text-lg font-semibold">{cartItem.productId.name}</p>
            <p className="text-gray-700"><strong>Quantity:</strong> {cartItem.quantity}</p>
            <p className="text-gray-700"><strong>Item Total:</strong> ₹{cartItem.productId.price}</p>
          </div>
        </div>
      ))}
    </div>
    <p className="text-lg font-semibold mt-4"><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
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

// const UserDetailsAdmin = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { userDetails, BlockStatus } = useContext(ProductContext);

//   const user = userDetails.find((user) => user.id.toString() === id.toString());

//   return (
//     <div className="container mx-auto p-6">
//       {user ? (
//         <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
//           <div className="border-b pb-4 mb-4">
//           <button
//             onClick={() => navigate('/users')}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <box-icon name='hand-left' type='solid' animation='fade-right' ></box-icon>
//           </button>
//             <h2 className="text-2xl font-semibold mb-2">User Details</h2>
//             <p className="text-lg">
//               <span className="font-semibold">Name:</span> {user.name}
//             </p>
//             <p className="text-lg">
//               <span className="font-semibold">E-Mail:</span> {user.email}
//             </p>
//             <div className="flex items-center mt-4">
//               <span className="text-lg font-semibold mr-2">Status:</span>
//               <span className={`text-sm px-2 py-1 rounded ${user.block ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`}>
//                 {user.block ? (
//                   <div className="flex items-center gap-1">
//                     User is blocked <box-icon name='x' color='red' ></box-icon>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-1">
//                     User is not blocked <box-icon name='check' color='green'></box-icon>
//                   </div>
//                 )}
//               </span>
//             </div>
//             <button
//               onClick={() => { BlockStatus(user.id); }}
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
//             >
//               {user.block ? 'Unblock' : 'Block'}
//             </button>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Cart Details</h2>
//             <div className="space-y-4">
//               {user.cart.length === 0 ? (
//                 <p className="text-gray-500">No items in cart</p>
//               ) : (
//                 user.cart.map((item, index) => (
//                   <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
//                     <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-32 h-32 object-cover rounded mb-4"
//                     />
//                     <p className="text-gray-700"><strong>Details:</strong> {item.details}</p>
//                     <p className="text-gray-700"><strong>Price:</strong> ₹{item.price}</p>
//                     <p className="text-gray-700"><strong>Quantity:</strong> {item.quantity}</p>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//           <div>
//             <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
//             {user.orders.map((order, index) => (
//               <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
//                 <h4 className="text-xl font-semibold mb-2">Address</h4>
//                 <p className="text-gray-700"><strong>Full Name:</strong> {order.orderDetails.fullName}</p>
//                 <p className="text-gray-700"><strong>Phone:</strong> {order.orderDetails.phone}</p>
//                 <p className="text-gray-700"><strong>Shipping details:</strong> {order.orderDetails.streetAddress},<br />{order.orderDetails.city},{order.orderDetails.state},{order.orderDetails.postalCode}</p>

//                 <h4 className="text-xl font-semibold mt-4 mb-2">Items</h4>
//                 <div className="space-y-2">
//                   {order.cartitems.map((cartItem, cartindex) => (
//                     <div key={cartindex} className="bg-white p-3 rounded-lg shadow-sm flex gap-4 items-center">
//                       <img
//                         src={cartItem.image}
//                         alt={cartItem.name}
//                         className="w-20 h-20 object-cover rounded"
//                       />
//                       <div>
//                         <p className="text-lg font-semibold">{cartItem.name}</p>
//                         <p className="text-gray-700"><strong>Quantity:</strong> {cartItem.quantity}</p>
//                         <p className="text-gray-700"><strong>Item Total:</strong> ₹{cartItem.price * cartItem.quantity}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <p className="text-lg font-semibold mt-4"><strong>Total Amount:</strong> ₹{order.TotalAmount}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="text-center text-gray-500">No users found</div>
//       )}
//     </div>
//   );
// };

export default UserDetailsAdmin;
