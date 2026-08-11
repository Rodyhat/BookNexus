import { Link } from "react-router-dom";
import Button from "./Button";
import '/src/App.css'
const Navbar = () => {
    return (
        <nav>
            <div className="w-full flex flex-row justify-between items-center page-container">
                {/*Logo  */}
                <div className="md:w-15 md:h-15">
                    <img src="/src/assets/logo.png" alt="" className="w-15 h-15" />
                </div>
                {/* Navigation */}
                <ul className=" gap-5 hidden md:flex">
                    <Link> <li>Catalogue</li></Link>
                    <Link><li>About</li></Link>
                </ul>
                {/* Authentication */}
                <ul className="flex gap-3 items-center md:gap-5">
                    <Link>  <li>Sign In</li></Link>
                    <Button type="submit">Register</Button>
                </ul>
            </div>

            <hr className='border border-light' />

        </nav>
    )
}

export default Navbar;