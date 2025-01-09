import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';
import { loadAddresses } from '../../../redux/slices/addressSlice';
import { currentUserCart } from '../../../redux/slices/cartSlice';
import { createOrder } from '../../../redux/slices/orderSlice';

const ProceedPayment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { addresses } = useSelector((state) => state.address);
    const cartStore = useSelector((state) => state.cart.items);
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
                // For Cash On Delivery, create the order directly
                dispatch(createOrder({ userId, address: addressId }));
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Order confirmed successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/shop');
            } else if (paymentMethod === 'Razorpay') {
                // For Razorpay, create an order on the backend and get the payment details
                const response = await fetch(`/api/razorpay/order/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ address: addressId, totalAmount: cartStore.totalAmount })
                });
                const data = await response.json();

                if (data.success) {
                    const { razorpay_order_id, razorpay_payment_options } = data;

                    // Initiate Razorpay payment
                    const options = {
                        key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with your Razorpay key from .env
                        amount: cartStore.totalAmount * 100, // Amount in paise
                        currency: "INR",
                        name: "Baby Products",
                        description: "Order Payment",
                        order_id: razorpay_order_id,
                        handler: function (response) {
                            // Send payment details to the backend after successful payment
                            fetch(`/api/razorpay/payment/${userId}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    orderId: razorpay_order_id,
                                    paymentId: response.razorpay_payment_id,
                                    signature: response.razorpay_signature,
                                })
                            })
                            .then(res => res.json())
                            .then(data => {
                                if (data.success) {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'Payment Successful and Order Confirmed!',
                                        showConfirmButton: false,
                                        timer: 1500,
                                    });
                                    navigate('/shop');
                                } else {
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'error',
                                        title: 'Payment failed. Please try again!',
                                        showConfirmButton: false,
                                        timer: 2000,
                                    });
                                }
                            })
                        },
                        prefill: {
                            name: localStorage.getItem("userName"),
                            email: localStorage.getItem("loginemail"),
                            contact: localStorage.getItem("userContact")
                        },
                        theme: {
                            color: "#3399cc"
                        }
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
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Proceed to Payment</h1>

                {/* Address Information */}
                {addresses && addresses.length > 0 ? (
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Address Information</h2>
                        {addresses.map((address, index) => (
                            <div key={index} className="mb-4 border-b border-gray-300 pb-4">
                                <p>{address.firstName} {address.lastName}</p>   
                                <p>{address.city}, {address.state}, {address.pinCode}</p>
                                <p>{address.country}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No addresses available.</p>
                )}

                <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                <ul>
                    {cartStore.items.map((item, _id) => (
                        <li key={_id} className="mb-2">
                            <span>{item.productId.name} x {item.quantity}</span> - ₹{item.totalPrice}
                        </li>
                    ))}
                </ul>
                <p className="font-bold text-right">Total Amount: ₹{cartStore.totalAmount}</p><br />

                <hr className="my-4 border-gray-300" />

                <div className="mt-4">
                    <p className="font-bold text-center">Payment Method</p><br />
                    <div className="flex justify-center space-x-4">
                        <label className="cursor-pointer">
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="Cash On Delivery" 
                                checked={paymentMethod === 'Cash On Delivery'} 
                                onChange={() => setPaymentMethod('Cash On Delivery')}
                            />
                            Cash On Delivery
                        </label>
                        <label className="cursor-pointer">
                            <input 
                                type="radio" 
                                name="paymentMethod" 
                                value="Razorpay" 
                                checked={paymentMethod === 'Razorpay'} 
                                onChange={() => setPaymentMethod('Razorpay')}
                            />
                            Razorpay
                        </label>
                    </div>
                </div>

                <p className="font-bold text-center mt-4">Payment Method: {paymentMethod}</p>

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
