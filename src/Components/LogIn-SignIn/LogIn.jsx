import { useNavigate } from "react-router-dom";
import {useState} from "react";
const LogIn = () => {
    const navigate = useNavigate()


    return (
        <div className="flex items-center justify-center min-h-screen bg-[#FAF2DD]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-[#3C4C3C] mb-6 text-center">Log In</h2>
                <form onSubmit={HandleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#3C4C3C] mb-1" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB]"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#3C4C3C] mb-1" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB]"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#3C4C3C] text-white py-2 rounded-md hover:bg-[#9ED1DB] transition duration-200"
                    >
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <a href="#" className="text-[#3C4C3C] hover:text-[#9ED1DB]">Forgot Password?</a>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-[#3C4C3C]">Don't have an account? <a onClick={()=> navigate('/signup')} className="text-[#9ED1DB] hover:underline">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
