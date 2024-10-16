import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useContext, useState } from "react";
import { ProductContext } from "../../Hooks/Context";
const SignUp = () => {
    const navigate = useNavigate();
    const { PostUserDetails, userDetails , SignUpValidation} = useContext(ProductContext) // destructered the register
    { console.log("signup details :", userDetails) }
    const [error, setError] = useState("");
    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                cart: [],
                orders: [],
                block : false 
            }}
            validationSchema={SignUpValidation}

            onSubmit={(values) => {
                console.log("Form Submitted", values);
                const UserExist = userDetails.find((user) => {
                    return values.email === user.email;

                });

                if (!UserExist) {
                    PostUserDetails(values);
                    navigate('/login')
                } else {
                    setError("user already exists")
                }
            }}

        >


            <div className="flex items-center justify-center min-h-screen bg-[#FAF2DD]">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-[#3C4C3C] mb-6 text-center">Sign Up</h2>

                    <Form>
                        <div className="mb-4">
                            <label className="block text-[#3C4C3C] mb-1" htmlFor="name">Full Name</label>
                            <Field type="text" name="name" className="w-full p-2 border rounded" />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#3C4C3C] mb-1" htmlFor="email">Email</label>
                            <Field type="email" name="email" className="w-full p-2 border rounded" />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#3C4C3C] mb-1" htmlFor="password">Password</label>
                            <Field type="password" name="password" className="w-full p-2 border rounded" />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#3C4C3C] mb-1" htmlFor="confirmPassword">Confirm Password</label>
                            <Field type="password" name="confirmPassword" className="w-full p-2 border rounded" />
                            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#3C4C3C] text-white py-2 rounded-md hover:bg-[#9ED1DB] transition duration-200"
                        >
                            Sign Up
                        </button>
                        <div className="text-red-500 text-center animate-vibrate">{error}</div>
                    </Form>

                    <div className="mt-4 text-center">
                        <p className="text-[#3C4C3C]">

                            <span
                                onClick={() => navigate('/login')}
                                className="text-[#9ED1DB] hover:underline cursor-pointer"
                            >
                                Log In
                            </span>
                        </p>
                    </div>
                </div>
            </div>

        </Formik>
    );
};

export default SignUp;
