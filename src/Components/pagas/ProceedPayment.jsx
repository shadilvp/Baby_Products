import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProceedPayment = () => {
    const initialValues = {
        fullName: '',
        email: '',
        phone: '',
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
        cardNumber: '',
    };

    const proceedPaymentValidation = Yup.object({
        fullName: Yup.string().required('Please enter your name'),
        email: Yup.string().email('Invalid email address').required('Please enter your email address'),
        phone: Yup.string().min(10, 'Phone number must be at least 10 characters').required('Please enter your phone number'),
        streetAddress: Yup.string().required('Please enter your address'),
        city: Yup.string().required('Please enter your city'),
        state: Yup.string().required('Please enter your state'),
        postalCode: Yup.string().min(6, 'Postal code must be at least 6 characters').required('Please enter your postal code'),
        cardNumber: Yup.string().required('Please enter your card number'),
    });

    const handleSubmit = (values) => {
        console.log(values);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Proceed to Payment</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={proceedPaymentValidation}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
                            <h2 className="text-lg font-semibold mb-4">Billing Information</h2>
                            <Field
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="fullName" component="div" className="text-red-500 mb-2" />

                            <Field
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 mb-2" />

                            <Field
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500 mb-2" />

                            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                            <Field
                                type="text"
                                name="streetAddress"
                                placeholder="Street Address"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="streetAddress" component="div" className="text-red-500 mb-2" />

                            <Field
                                type="text"
                                name="city"
                                placeholder="City"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="city" component="div" className="text-red-500 mb-2" />

                            <Field
                                type="text"
                                name="state"
                                placeholder="State"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="state" component="div" className="text-red-500 mb-2" />

                            <Field
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="postalCode" component="div" className="text-red-500 mb-2" />

                            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                            <Field
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                className="block w-full p-3 mb-3 border border-gray-300 rounded"
                            />
                            <ErrorMessage name="cardNumber" component="div" className="text-red-500 mb-2" />

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-200"
                            >
                                Confirm Payment
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ProceedPayment;
