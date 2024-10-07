import * as Yup from 'yup';  // Correct way to import Yup

const SignUpValidation = Yup.object({
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Enter Your Full Name'),
    email: Yup.string().email("Please Enter a Valid Email").required('Enter Your Email'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Enter A New Password'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Please confirm your password'),
});

export default SignUpValidation;
