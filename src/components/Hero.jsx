import { FaSearch } from "react-icons/fa";
import '/src/App.css';
const Hero = () => {
    return (
        <section className="mt-8 min-h-[70vh] md:min-h-[70vh] gap-3 flex flex-col items-center">
            <div className="flex flex-col items-center gap-4 max-w-3xl w-full ">
                <div className="">
                    <img src="/src/assets/logo.png" alt="" className="w-35 h-35" />
                </div>
                <h1 className="font-bold font-heading leading-14 tracking-tight text-2xl md:text-3xl lg:text-5xl ">Discover Your Next Great Read</h1>
                <p className="text-[15px] md:text-[17px] text-light leading-7 font-normal ">
                    Explore our extensive catalog of academic and technical literature. 
                    Join BookNexus to manage your reading journey.</p>
                <div className="relative w-full">
                    <FaSearch className="absolute top-4 text-gray-500 left-4" />
                    <input type="text" placeholder="Search by title,author,or ISBN..." className="border border-light ps-10 py-3 w-full outline-primary rounded" />
                </div>
            </div>
        </section>

    )
}

export default Hero;