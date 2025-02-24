import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';
import { loadAddresses } from '../../../redux/slices/addressSlice';
import { currentUserCart } from '../../../redux/slices/cartSlice';
import { createOrder } from '../../../redux/slices/orderSlice';
import { createRazorpayOrder,razorPayPayment } from '../../../redux/slices/orderSlice';

const ProceedPayment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.address);
    const cartStore = useSelector((state) => state.cart.items);
    const {razorpayOrder} = useSelector((state)=>state.order)
    const userId = localStorage.getItem("userId");
    const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
    
    useEffect(() => {
        dispatch(loadAddresses(userId)); 
        dispatch(currentUserCart(userId));
    }, [dispatch, userId]);

    const addressId = addresses?.[0]?._id || null;

    const handleConfirmOrder = async () => {
        if (!addressId) {
            Swal.fire({
                icon: "warning",
                title: "Please add an address before confirming the order.",
            });
            return;
        }
    
        try {
            if (paymentMethod === 'Cash On Delivery') {
                const userId = localStorage.getItem("userId")
                // For Cash On Delivery, create the order directly
                dispatch(createOrder({ userId, address: addressId }));
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Order confirmed successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                localStorage.removeItem("rzp_checkout_anon_id")
                localStorage.removeItem("rzp_device_id")
                navigate('/shop');
            } else if (paymentMethod === 'Razorpay') {
                // For Razorpay, initiate the payment process
                const userId = localStorage.getItem("userId")
                 dispatch(
                    createRazorpayOrder({
                        userId,
                        totalAmount: cartStore.totalAmount,
                    }),
                );
                console.log(razorpayOrder)
                if (razorpayOrder?.success) {
                    console.log("object")
                    const { razorpay_order_id } = razorpayOrder;
    
                    const options = {
                        key: "rzp_test_T8EGXDuDs0Ddx6", 
                        amount: cartStore.totalAmount * 100, 
                        currency: "INR",
                        name: "Baby Products",
                        description: "Order Payment",
                        order_id: razorpay_order_id,
                        handler: async function (response) {
                            console.log("hy")
                            try {
                                // Handle payment success
                                const userId = localStorage.getItem("userId")

                                dispatch(razorPayPayment(
                                    {   userId,
                                        address: addressId,
                                        orderId: razorpay_order_id,
                                        paymentId: response.razorpay_payment_id,
                                        signature: response.razorpay_signature,
                                    }
                                ));
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Payment Successful and Order Confirmed!',
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    localStorage.removeItem("rzp_checkout_anon_id")
                                    localStorage.removeItem("rzp_device_id")
                                    navigate('/shop');
                            } catch (error) {
                                console.error("Payment Verification Error:", error);
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Payment verification failed. Please try again!',
                                    showConfirmButton: false,
                                    timer: 2000,
                                });
                            }
                        },
                        prefill: {
                            name: localStorage.getItem("userName"),
                            email: localStorage.getItem("loginemail"),
                            contact: localStorage.getItem("userContact"),
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    };
    
                    const razorpay = new window.Razorpay(options);
                    razorpay.open();
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Failed to create Razorpay order. Please try again!',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Invalid payment method selected.",
                });
            }
        } catch (error) {
            console.error("Order Confirmation Error:", error);
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Something went wrong, please try again!',
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };
    

    if (!cartStore || cartStore.length === 0) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <p>No items in your cart. Please add items to proceed to payment.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
              Proceed to Payment
            </h1>
      
            {/* Address Information */}
            {addresses && addresses.length > 0 ? (
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Address Information</h2>
                {addresses.map((address, index) => (
                  <div key={index} className="mb-4 border-b border-gray-300 pb-4">
                    <p>{address.firstName} {address.lastName}</p>   
                    <p>{address.city}, {address.state}, {address.pinCode}</p>
                    <p>{address.country}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <p className="text-gray-600">No addresses available.</p>
                <button
                  onClick={() => navigate("/address")}
                  className="px-4 py-2 border border-blue-500 text-blue-500 bg-white rounded-full text-sm hover:bg-blue-500 hover:text-white transition"
                >
                  Add Address
                </button>
              </div>
            )}
      
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Details</h2>
            <ul>
              {cartStore.items.map((item, _id) => (
                <li key={_id} className="mb-2 text-sm sm:text-base">
                  <span>{item.productId.name} x {item.quantity}</span> - ₹{item.totalPrice}
                </li>
              ))}
            </ul>
            <p className="font-bold text-right text-sm sm:text-base">Total Amount: ₹{cartStore.totalAmount}</p><br />
      
            <hr className="my-4 border-gray-300" />
      
            <div className="mt-4">
              <p className="font-bold text-center text-sm sm:text-base">Payment Method</p><br />
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <label className="cursor-pointer flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Cash On Delivery" 
                    checked={paymentMethod === 'Cash On Delivery'} 
                    onChange={() => setPaymentMethod('Cash On Delivery')}
                  />
                  <span className="text-sm sm:text-base">Cash On Delivery</span>
                </label>
                <label className="cursor-pointer flex items-center space-x-2">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="Razorpay" 
                    checked={paymentMethod === 'Razorpay'} 
                    onChange={() => setPaymentMethod('Razorpay')}
                  />
                  <span className="text-sm sm:text-base">Razorpay</span>
                </label>
              </div>
            </div>
      
            <p className="font-bold text-center mt-4 text-sm sm:text-base">Payment Method: {paymentMethod}</p>
      
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-200 mt-6"
            >
              Confirm Order
            </button>
          </div>
        </div>
      );
      
};

export default ProceedPayment;
