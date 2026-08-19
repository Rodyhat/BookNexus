import { useContext, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BookContext } from "../context/myContext";
import { Link } from "react-router-dom";
const Trending = () => {

    let { books } = useContext(BookContext);
    return (
        <section className="mt-10">
            <div className="flex justify-between">
                <h2 className="text-[24px] font-bold font-heading">Trending Now</h2>
                <Link to='/trendinglist' className="flex items-center text-primary text-[14px]">View All <FaArrowRight /></Link>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book, index) => (
                    <div key={book.key} className="bg-gray shadow-md rounded">
                        <div className="bg-[#F2F2F2] p-4">
                            <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} className="w-full h-64 object-contain" />
                        </div>
                        <div className="p-5 ">
                            <span className="bg-[#DCFCE7] text-green p-1 rounded-sm text-label-sm">Available</span>
                            <h1 className="font-bold text-body-lg py-2">{book.title}</h1>
                            <p className="text-sm text-gray-500">{book.author_name?.join(' , ')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Trending;