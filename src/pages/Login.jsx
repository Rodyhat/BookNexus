import * as Yup from 'yup';
import Button from "../components/Button";
import { FaArrowRight } from "react-icons/fa";
import { useFormik } from 'formik';
const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required').email('Email must be in valid email format'),
            password: Yup.string().min(6, 'Password must be minimum of 6 characters').required('Password is required')
        }),
        onSubmit: values => {
            console.log(values);
        }
    })
    return (
        <div className="flex min-h-screen bg-gray-50 justify-center py-5 font-sora">
            <div className="border border-[#c8c4d5] flex  space-y-7 flex-col  rounded-lg w-full max-w-sm bg-white p-8">
                <div className="flex justify-center flex-col items-center">
                    <div className="logo">
                        <img src="/src/assets/logo.png" alt="" className="size-15" />
                    </div>
                    <h1 className="text-[#3730A3] text-2xl font-semibold ">BookNexus</h1>
                    <p className="text-gray-500 text-sm">Sign in to manage your library</p>
                </div>
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="" className="font-semibold text-[15px]">Email Address</label>
                        <input type="email" name='email' onChange={formik.handleChange} placeholder="Enter your email address" className="outline-0 border border-[#c8c4d5] p-2 rounded-sm" />
                        {formik.touched.email && formik.errors.email && (
                            <p>{formik.errors.email}</p>
                        )}
                    </div>
                    <div className="">
                        <div className="flex justify-between">
                            <label htmlFor="" className="font-semibold text-[15px]">Password</label>
                            <span className="text-[#3730A3] text-[12px]">Forgot?</span>
                        </div>
                        <input type="password" name='password' onChange={formik.handleChange} placeholder="Enter your password" className="rounded-sm outline-0 border border-[#c8c4d5] w-full p-2" />
                        {formik.touched.password && formik.errors.password && (<p>{formik.errors.password}</p>)}
                    </div>

                    <Button type='submit' rightIcon={<FaArrowRight />} className="w-full justify-center">
                        Sign In
                    </Button>
                </form>
                <div className="mt-30">
                    <hr className="border-gray-300" />
                    <p className='text-[12px] mt-4 text-center'>Dont't have an account? <span className="text-[#3730A3]">Register</span></p>
                </div>
            </div>
        </div>

    )
}
export default Login;