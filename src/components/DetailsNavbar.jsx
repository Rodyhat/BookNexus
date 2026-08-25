import { Link } from "react-router-dom";
import Button from "./Button";
import { FaArrowLeft } from "react-icons/fa";
import '/src/App.css'
const DetailsNavbar = () => {
    return (
        <nav>
            <div className="w-full flex justify-between items-center page-container">
                {/*Logo  */}
                <div className="md:w-15 md:h-15">
                    <img src="/src/assets/logo.png" alt="" className="w-15 h-15" />
                </div>
                <div className="w-8 h-8 rounded-full border" />
            </div>

            <hr className='border-outline-variant' />

        </nav>
    )
}

export default DetailsNavbar;