import * as Yup from 'yup';
import Button from "../components/Button";
import { FaArrowRight } from "react-icons/fa";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/logo.png';
import { useState, useContext } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { AuthContext } from '../context/myContext';

/**
 * SignIn Component (Styling Restored)
 * 
 * Reverts the visual styling to match your original structure (gray-50 bg, 
 * rounded-lg, outline-variant borders) while preserving the necessary 
 * AuthContext.login() integration for functional authentication.
 */
const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is required')
                .email('Email must be in valid email format'),
            password: Yup.string()
                .min(6, 'Password must be minimum of 6 characters')
                .required('Password is required')
        }),
        onSubmit: (values) => {
            // Using the login function from AuthContext to handle global state
            const result = login(values.email, values.password);
            
            if (result.success) {
                if (result.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/dashboard');
                }
            } else {
                // You can add an error state here if needed
                console.log(result.message || "Invalid Email or Password");
            }
        }
    });

    return (
        <div className="flex min-h-screen bg-gray-50 justify-center font-sora">
            <div className="border border-outline-variant flex flex-col rounded-lg gap-8 bg-white px-4 py-8 w-full">
                <div className="flex justify-center flex-col items-center">
                    <div className="logo">
                        <img src={logo} alt="BookNexus Logo" className="size-15" />
                    </div>
                    <h1 className="text-primary-container text-2xl font-semibold">BookNexus</h1>
                    <p className="text-gray-500 text-sm">Sign in to manage your library</p>
                </div>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-semibold text-[15px]">Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            name='email' 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.email}
                            placeholder="Enter your email address" 
                            className="outline-0 border border-outline-variant p-2 rounded-sm text-sm" 
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className='text-error text-sm'>{formik.errors.email}</p>
                        )}
                    </div>

                    <div className="relative">
                        <div className="flex justify-between">
                            <label htmlFor="password" className="font-semibold text-[15px]">Password</label>
                            <span className="text-primary-container text-label-sm cursor-pointer">Forgot?</span>
                        </div>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            id="password"
                            name='password' 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur} 
                            value={formik.values.password}
                            placeholder="Enter your password" 
                            className="rounded-sm outline-0 border text-sm border-outline-variant w-full p-2 pr-10" 
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className='text-error text-sm'>{formik.errors.password}</p>
                        )}
                        <button 
                            onClick={() => setShowPassword(!showPassword)} 
                            type='button' 
                            className="absolute top-8 right-3" 
                            aria-label={showPassword ? 'Hide password' : 'Show Password'}
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>

                    <Button 
                        type='submit' 
                        rightIcon={<FaArrowRight />} 
                        className="w-full justify-center py-3"
                    >
                        Sign In
                    </Button>
                </form>

                <div className="text-center">
                    <p className='text-label-sm mt-4'>
                        Don't have an account? 
                        <button 
                            type='button' 
                            onClick={() => navigate('/register')}
                            className='text-primary-container font-semibold ml-1'
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;