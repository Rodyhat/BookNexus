import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdPersonAdd } from 'react-icons/md';
import Button from '../components/Button';
import logo from '/src/assets/logo.png';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    // Preserves borrowing redirection flow if user arrived from clicking "Borrow Material"
    const redirectTarget = location.state?.from || null;

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false,
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .min(2, 'Name must be at least 2 characters')
                .required('Full name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email address is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Please confirm your password'),
            agreeTerms: Yup.boolean()
                .oneOf([true], 'You must accept the terms of service'),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            setSignUpError('');
            setSuccessMessage('');

            try {
                // When ready for Supabase:
                // const { data, error } = await supabase.auth.signUp({
                //   email: values.email,
                //   password: values.password,
                //   options: { data: { full_name: values.fullName, role: 'user' } }
                // });
                // if (error) throw error;

                setSuccessMessage('Account created successfully! Redirecting to sign in...');
                setTimeout(() => {
                    navigate('/signin', {
                        state: {
                            from: redirectTarget,
                            registeredEmail: values.email
                        }
                    });
                }, 1200);
            } catch (err) {
                setSignUpError(err.message || 'Failed to create account. Please try again.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen bg-[#F9F9FF] text-slate-800 antialiased flex items-center justify-center p-4 font-sora">
            <div className="w-full mx-auto bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">

                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-6 text-center">
                    <img
                        src={logo}
                        alt="BookNexus Logo"
                        className="w-16 h-16 mb-2 object-contain"
                    />
                    <h1 className="text-2xl font-bold text-primary tracking-tight">BookNexus</h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Create an account to manage your library
                    </p>
                </div>

                {/* Feedback alerts */}
                {signUpError && (
                    <div className="mb-4 p-2.5 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-medium text-center">
                        {signUpError}
                    </div>
                )}
                {successMessage && (
                    <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-xs font-medium text-center">
                        {successMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3.5">

                    {/* Full Name */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="fullName">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <FiUser size={18} />
                            </span>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="e.g. Dr. Jane Doe"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fullName}
                                className="w-full pl-10 pr-3 py-2 bg-white border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors text-slate-800 placeholder:text-slate-400"
                            />
                        </div>
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="text-red-500 text-[11px] font-medium mt-1">{formik.errors.fullName}</p>
                        )}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <FiMail size={18} />
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="jane@example.com"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="w-full pl-10 pr-3 py-2 bg-white border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors text-slate-800 placeholder:text-slate-400"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-[11px] font-medium mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <FiLock size={18} />
                            </span>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-md
                                 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors text-slate-800 placeholder:text-slate-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-[11px] font-medium mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                <FiLock size={18} />
                            </span>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Repeat your password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-md focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-colors text-slate-800 placeholder:text-slate-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                            >
                                {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                            </button>
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-red-500 text-[11px] font-medium mt-1">{formik.errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="pt-1">
                        <label className="flex items-start gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                name="agreeTerms"
                                checked={formik.values.agreeTerms}
                                onChange={formik.handleChange}
                                className="mt-0.5 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="text-[11px] text-slate-600 leading-snug">
                                I agree to the <span className="text-primary font-semibold hover:underline">Terms of Service</span> &amp;{' '}
                                <span className="text-primary font-semibold hover:underline">Privacy Policy</span>
                            </span>
                        </label>
                        {formik.touched.agreeTerms && formik.errors.agreeTerms && (
                            <p className="text-red-500 text-[11px] font-medium mt-1">{formik.errors.agreeTerms}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        isLoading={formik.isSubmitting}
                        className="w-full py-2.5 mt-2 bg-primary hover:bg-[#160b6b] text-white flex items-center justify-center gap-2 text-sm font-semibold rounded-md shadow-sm"
                    >
                        <MdPersonAdd size={18} />
                        Create Account
                    </Button>
                </form>

                {/* Footer Toggle */}
                <div className="mt-5 text-center pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">
                        Already have an account?{' '}
                        <Link
                            to="/signin"
                            state={{ from: redirectTarget }}
                            className="text-primary hover:underline font-semibold ml-1">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default SignUp;
