import { FaSearch } from "react-icons/fa";
import '/src/App.css';
const Hero = () => {
    return (
        <div className="flex flex-col items-center mt-8 h-[84.8vh] gap-3">
            <div className="">
                <img src="/src/assets/logo.png" alt="" className="w-35 h-35" />
            </div>
            <h1 className="font-bold leading-14 tracking-tight text-[48px]">Discover Your Next Great Read</h1>
            <p className="border text-[#777584] ">
                Explore our extensive catalog of academic and technical literature. Join <br /> BookNexus to manage your reading journey.</p>
            <div className="">
                <FaSearch />
                <input type="text" placeholder="Search by title,author,or ISBN..." className="border border-[#E1DFEA] outline-[#3730a3]" />
            </div>
        </div>
    )
}

export default Hero;