import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { ProductContext } from "../../Hooks/Context"; 

const LogIn = () => {
    const navigate = useNavigate();
    const {userDetails , product , HandleLogOut} = useContext(ProductContext);
    const [error , setError] =useState("");
        
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
                console.log('Login Submission', values);
                const FoundUser = userDetails.find ((user)=> {
                  return  user.email == values.email 
                });
               
                    FoundUser.password == values.password ? navigate('/') : setError("user is not found");

                    localStorage.setItem("loginemail",values.email) // storing the email into local storage
                    localStorage.setItem("loginpassword",values.password) // storing the password into local storage

                 
            }}
        >
            <Form className="flex flex-col items-center justify-center min-h-screen bg-[#FAF2DD] p-4">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-[#3C4C3C] mb-6 text-center">Log In</h2>
        
        <div className="mb-4">
            <label className="block text-[#3C4C3C] mb-1" htmlFor="email">Email</label>
            <Field
                type="email"
                name="email"
                className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB] transition"
                placeholder="Enter your email"
            />
        </div>

        <div className="mb-4">
            <label className="block text-[#3C4C3C] mb-1" htmlFor="password">Password</label>
            <Field
                type="password"
                name="password"
                className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB] transition"
                placeholder="Enter your password"
            />
        </div>

        <button
            type="submit"
            className="w-full bg-[#3C4C3C] text-white py-2 rounded-md hover:bg-[#9ED1DB] transition duration-200"
        >
            Login
        </button>

        <div className="text-red-500 text-center animate-vibrate mt-2"> {error} </div>

        <div className="mt-4 text-center">
            <p className="text-[#3C4C3C]">
                Don't have an account? 
                <button onClick={() => navigate('/signup')} className="text-[#9ED1DB] hover:underline cursor-pointer"> Sign Up</button>
                <button onClick={HandleLogOut}>Log Out</button>
            </p>
        </div>
    </div>
</Form>

        </Formik>
    );
};

export default LogIn;
