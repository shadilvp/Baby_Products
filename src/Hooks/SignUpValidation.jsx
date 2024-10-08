import { Children, createContext } from 'react';
import * as Yup from 'yup';
export const SignUPContext = createContext();
export const LoginContext = createContext();

const SignUpValidation = Yup.object({ // checked the objects in the form validation at signup page by using yup
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Enter Your Full Name'),
    email: Yup.string().email("Please Enter a Valid Email").required('Enter Your Email'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Enter A New Password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
});

const LoginValidation = Yup.object ({ // checked the objects in the form validation at login page by using yup
    email : Yup.string().email("Please Enter Valid Email").required('Enter Your Email'),
    password : Yup.number().min(5).required('Enter A Valid Password'),
})

export const SignUpProvider = ({children}) => (
    <SignUPContext.Provider value={SignUpValidation}>{children}</SignUPContext.Provider>
);

export const LogInProvider = ({children}) => (
    <LoginContext.Provider value={LoginValidation}>{children}</LoginContext.Provider>
);


 
