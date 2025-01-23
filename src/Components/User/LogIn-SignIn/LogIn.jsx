import { useNavigate } from "react-router-dom";
import { Formik, Form, Field,ErrorMessage } from "formik";
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from "../../../redux/slices/userSlice";

import Swal from "sweetalert2"


const LogIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {isLoading,error} = useSelector((state)=>state.user)
    const handleLogin = async (values) => {
        try {
            const user = await dispatch(loginUser(values)).unwrap();
            console.log("user",user.roll)
            if (user?.roll === 'admin') {
                navigate('/dashboard');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Admin successfully logged in",
                    showConfirmButton: false,
                    timer: 3000,
                });
            } else {
                navigate('/');
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Login successfully completed",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        } catch (error) {
            console.error('Login failed:', error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: error.message || 'Login failed',
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };
    
    return (
        <div>
        <h1>User Login</h1>
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleLogin}
        >
            <div className="flex items-center justify-center min-h-screen bg-[#FAF2DD]">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h2 className="text-2xl font-bold text-[#3C4C3C] mb-6 text-center">Sign In</h2>

                    <Form>
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

                        <button
                            type="submit"
                            className="w-full bg-[#3C4C3C] text-white py-2 rounded-md hover:bg-[#9ED1DB] transition duration-200"
                        >
                            Log In
                        </button>
                        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                    </Form>

                    {isLoading && <p>Loading...</p>}

                    <div className="mt-4 text-center">
                        <p className="text-[#3C4C3C]">
                            <span
                                onClick={() => navigate('/signup')}
                                className="text-[#9ED1DB] hover:underline cursor-pointer"
                            >
                                Don't have an account? Sign Up
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </Formik>
    </div>
    );
};






// const LogIn = () => {
//     const navigate = useNavigate();
//     const { userDetails,products } = useContext(ProductContext);
//     const [error, setError] = useState("");

//     return (
//         <Formik
//             initialValues={{ email: '', password: '' }}
//             onSubmit={(values) => {
//                 console.log('Login Submission', values);

//                 const FoundUser = userDetails.find((user) => user.email === values.email);
//                 const adminUser = userDetails.find((user) => user.roll === 'admin' && user.email === values.email);
                            
//                 if( adminUser && adminUser.email === values.email && adminUser.password === values.password){
//                     navigate('/',{replace:true});
//                     localStorage.setItem("loginemail", values.email) // storing the email into local storage
//                         localStorage.setItem("loginpassword", values._id)
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: " admin Logined sussefully completed",
//                         showConfirmButton: false,
//                         timer: 3000
//                       });
//                 }
//                 else if(FoundUser){
//                     if (FoundUser && FoundUser.password === values.password && FoundUser.email === values.email ) {
//                         if (FoundUser.block === false) {
//                             navigate('/',{replace:true});
//                         localStorage.setItem("loginemail", values.email) // storing the email into local storage
//                         localStorage.setItem("loginpassword", values.password)
//                         console.log(userDetails) // storing the password into local storage
//                         localStorage.setItem("loginuserid", userDetails._id)
//                         Swal.fire({
//                             position: "top-end",
//                             icon: "success",
//                             title: "Login sussefully completed",
//                             showConfirmButton: false,
//                             timer: 3000
//                         });
//                         } else {
//                           setError("User Is Blocked")  
//                         }
                        
//                     } else {
//                         setError("wrong password");
//                     }
                     
//                 }
//                 else  {
//                     setError("User not found")

//                 }

//             }}
//         >
//             <Form className="flex flex-col items-center justify-center min-h-screen bg-[#FAF2DD] p-4">
//                 <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
//                     <h2 className="text-2xl font-bold text-[#3C4C3C] mb-6 text-center">Log In</h2>

//                     <div className="mb-4">
//                         <label className="block text-[#3C4C3C] mb-1" htmlFor="email">Email</label>
//                         <Field
//                             type="email"
//                             name="email"
//                             className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB] transition"
//                             placeholder="Enter your email"
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-[#3C4C3C] mb-1" htmlFor="password">Password</label>
//                         <Field
//                             type="password"
//                             name="password"
//                             className="w-full border border-[#E2E2E2] rounded-md p-2 focus:outline-none focus:border-[#9ED1DB] transition"
//                             placeholder="Enter your password"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-[#3C4C3C] text-white py-2 rounded-md hover:bg-[#9ED1DB] transition duration-200"
//                     >
//                         Login
//                     </button>

//                     <div className="text-red-500 text-center animate-vibrate mt-2"> {error} </div>

//                     <div className="mt-4 text-center">
//                         <p className="text-[#3C4C3C]">
//                             Don't have an account?
//                             <button onClick={() => {navigate('/signup')}} className="text-[#9ED1DB] hover:underline cursor-pointer"> Sign Up</button>
                            
//                         </p>
//                     </div>
//                 </div>
//             </Form>

//         </Formik>
//     );
// };

export default LogIn;
