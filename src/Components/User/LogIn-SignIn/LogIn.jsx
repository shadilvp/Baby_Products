import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { ProductContext } from "../../../Context/Context";
import Swal from "sweetalert2"
const LogIn = () => {
    const navigate = useNavigate();
    const { userDetails, product } = useContext(ProductContext);
    const [error, setError] = useState("");

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
                console.log('Login Submission', values);
                const FoundUser = userDetails.find((user) =>
                    (user.email === values.email)

                );

                const adminUser = userDetails.find(user => user.name === 'admin');
                
                if( adminUser.email === values.email && adminUser.password === values.password){
                    navigate('/',{replace:true});
                    localStorage.setItem("loginemail", values.email) // storing the email into local storage
                        localStorage.setItem("loginpassword", values.password)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: " admin Logined sussefully completed",
                        showConfirmButton: false,
                        timer: 3000
                      });
                }
                else if(FoundUser){
                    if (FoundUser.password === values.password && FoundUser.email === values.email ) {
                        if (FoundUser.block === false) {
                            navigate('/',{replace:true});
                        localStorage.setItem("loginemail", values.email) // storing the email into local storage
                        localStorage.setItem("loginpassword", values.password)
                        console.log(userDetails) // storing the password into local storage
                        localStorage.setItem("loginuserid", userDetails.id)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Login sussefully completed",
                            showConfirmButton: false,
                            timer: 3000
                        });
                        } else {
                          setError("User Is Blocked")  
                        }
                        
                    } else {
                        setError("wrong password");
                    }
                     
                }
                else  {
                    setError("User not found")

                }

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
                            <button onClick={() => {navigate('/signup')}} className="text-[#9ED1DB] hover:underline cursor-pointer"> Sign Up</button>
                            
                        </p>
                    </div>
                </div>
            </Form>

        </Formik>
    );
};

export default LogIn;
