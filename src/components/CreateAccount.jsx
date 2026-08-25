import { Link } from "react-router-dom";
import Button from "./Button";
const CreateAccount = () => {
    return (
        <div className="flex justify-between py-6 px-8 gap-4 items-center rounded-2xl bg-primary text-white flex-col md:flex-row ">
            <div className="">
                <h2 className="text-headline-sm text-[#a7a7ff] pb-2 font-semibold">Unlock Full Access</h2>
                <p className="text-[#a7a7ff] text-sm">Register now to borrow books,save your favourites, and track your reading history</p>
            </div>
            <Link><Button type='submit' variant="light" className="">Create Account</Button></Link>

        </div>
    )
}
export default CreateAccount;