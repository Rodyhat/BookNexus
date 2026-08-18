import { Link } from "react-router-dom";
import Button from "./Button";
import { FaArrowLeft } from "react-icons/fa";
import '/src/App.css'
const TrendingNavbar = () => {
    return (
        <nav>
            <div className="w-full flex justify-between items-center page-container">
                {/*Logo  */}
                <div className="md:w-15 md:h-15">
                    <img src="/src/assets/logo.png" alt="" className="w-15 h-15" />
                </div>
                {/* Navigation */}
                <Link to='/'> <li className="flex gap-2 items-center text-primary-container"><FaArrowLeft />Back to Catalogue</li></Link>

            </div>

            <hr className='border-outline-variant' />

        </nav>
    )
}

export default TrendingNavbar;