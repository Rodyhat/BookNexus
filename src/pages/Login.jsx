import Button from "../components/Button";
import { FaArrowRight } from "react-icons/fa";
const Login = () => {
    return (
        <div className="flex min-h-screen bg-gray-50 justify-center ">
            <div className="border border-[#3730A3] flex justify-center space-y-10 items-center flex-col  rounder-lg">
                <div className="">
                    <div className="logo flex items-center justify-center">
                        <img src="/src/assets/logo.png" alt="" className="size-25" />
                    </div>
                    <h1 className="text-[#3730A3] text-2xl font-semibold text-center">BookNexus</h1>
                    <p className="text-gray-500 text-center">Sign in to manage your library</p>
                </div>
                <form action="">
                    <div className="flex flex-col">
                        <label htmlFor="">Email Address</label>
                        <input type="email" placeholder="Enter your email address" className="outline-0 border-2"/>
                    </div>
                    <div className="">
                        <div className="">
                            <label htmlFor="">Password</label>
                            <span>Forgot?</span>
                        </div>
                        <input type="password" placeholder="Enter your password" />
                    </div>
                    <div className="flex items-center justify-center ">
                        <Button type='submit' rightIcon={<FaArrowRight />} className=" border border-red-500">
                            Sign In
                        </Button>
                    </div>
                </form>

            </div>
        </div>

    )
}
export default Login;