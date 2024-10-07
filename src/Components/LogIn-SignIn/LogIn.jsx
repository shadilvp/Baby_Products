import { useNavigate } from "react-router-dom";
import { Formik , Form , Field , ErrorMessage } from "formik";
import { LoginContext } from "../../Hooks/SignUpValidation";
import { useContext } from "react";
const LogIn = () => {
    const navigate = useNavigate()
    const LoginValidation = useContext(LoginContext)


    return (
        <Formik
            initialValues = {{email : '',password: '' }}
            validationSchema ={LoginValidation}
            onSubmit = { (value) => {
                console.log('Login Submition' , value);
                navigate('/');
            }}
        >
            
                <div className="flex items-center justify-center min-h-screen bg-[#FAF2DD]">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-[#3C4C3C] mb-6 text-center">Log In</h2>
                    <Form >
                        <div className="mb-4">
                            <label className="block text-[#3C4C3C] mb-1" htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB]"
                            />
                            <ErrorMessage name="email" component='div' className="text-red-500 text-sm"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#3C4C3C] mb-1" htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB]"
                            />
                            <ErrorMessage name="password" component='div' className="text-red-500 text-sm" />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#3C4C3C] text-white py-2 rounded-md hover:bg-[#9ED1DB] transition duration-200"
                        >
                            Login
                        </button>
                    </Form>
                    <div className="mt-4 text-center">
                        <a href="#" className="text-[#3C4C3C] hover:text-[#9ED1DB]">Forgot Password?</a>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-[#3C4C3C]">Don't have an account? <a onClick={()=> navigate('/signup')} className="text-[#9ED1DB] hover:underline">Sign Up</a></p>
                    </div>
                </div>
                </div>
            
            
        </Formik>
    );
};

export default LogIn;
