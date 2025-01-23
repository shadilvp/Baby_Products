import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { loadAddresses, addAddress } from "../../../redux/slices/addressSlice";

const AddressPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { addresses, status, error } = useSelector(state => state.address); // Adjusted to match Redux state

    const [showForm, setShowForm] = useState(false);
    const userId = localStorage.getItem("userId");

    // Load addresses on component mount
    useEffect(() => {
        dispatch(loadAddresses(userId));
    }, [dispatch, userId]);

    const handleAddAddress = async (values) => {
        try {
             dispatch(addAddress({ userId, addressData: values }));
            setShowForm(false);
        } catch (error) {
            console.error("Error adding address:", error);
        }
    };

    return (
      <div className="p-6 bg-blue-300 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Address Details</h1>
    
        {/* Back Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-gray-600 transition-all w-full sm:w-auto"
          >
            Back to Home
          </button>
        </div>
    
        {/* Toggle Add New Address Form */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowForm(prevState => !prevState)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all w-full sm:w-auto"
          >
            {showForm ? 'Cancel' : 'Add New Address'}
          </button>
        </div>
    
        {/* Address Form */}
        {showForm && (
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              mobile: '',
              addressLine: '',
              city: '',
              state: '',
              pinCode: '',
              country: '',
            }}
            onSubmit={handleAddAddress}
          >
            <Form className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
              {['firstName', 'lastName', 'email', 'mobile', 'addressLine', 'city', 'state', 'pinCode', 'country'].map((field) => (
                <div key={field} className="mb-4">
                  <Field
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="border border-gray-300 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name={field} component="div" className="text-red-500 mt-1" />
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg w-full hover:bg-blue-600 transition-all"
              >
                Submit
              </button>
            </Form>
          </Formik>
        )}
    
        {/* Loading/Error States */}
        {status === 'loading' ? (
          <p className="text-center text-blue-600">Loading...</p>
        ) : status === 'failed' ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold text-center mt-8 mb-4">Your Addresses</h3>
    
            {/* Display List of Addresses */}
            {addresses && addresses.length > 0 ? (
              <ul className="space-y-4 max-w-3xl mx-auto">
                {addresses.map((address) => (
                  <li
                    key={address._id}
                    className="bg-white p-6 border border-gray-300 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center"
                  >
                    <div className="w-full sm:w-3/4">
                      <p><strong>First Name:</strong> {address.firstName}</p>
                      <p><strong>Last Name:</strong> {address.lastName}</p>
                      <p><strong>Email:</strong> {address.email}</p>
                      <p><strong>Mobile:</strong> {address.mobile}</p>
                      <p><strong>Address Line:</strong> {address.addressLine}</p>
                      <p><strong>City:</strong> {address.city}</p>
                      <p><strong>State:</strong> {address.state}</p>
                      <p><strong>Pin Code:</strong> {address.pinCode}</p>
                      <p><strong>Country:</strong> {address.country}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition-all w-full sm:w-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No addresses available.</p>
            )}
          </div>
        )}
      </div>
    );
    
      
    };

export default AddressPage;
