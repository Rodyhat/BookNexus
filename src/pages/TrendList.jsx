import { useContext } from "react";
import TrendingNavbar from "../components/TrendingNavbar";
import { FaSearch } from "react-icons/fa";
import { BookContext } from "../context/myContext";
import Button from "../components/Button";
const TrendList = () => {
    const { books } = useContext(BookContext)
    const { search, changeSearch } = useContext(BookContext)

    return (
        <div className="">
            <TrendingNavbar />
            <section className="page-container">
                <div className="">
                    <h2 className="text-headline-md font-bold">Trending Books</h2>
                    <p className="text-[15px] md:text-[17px] text-light leading-7 font-normal ">
                        Discover what others are reading this week.</p>
                    <div className="relative w-[50%] ">
                        <FaSearch className="absolute top-8 text-gray-500 left-4" />
                        <input type="text" placeholder="Search trending titles, authors, or subjects..." className="border border-outline-variant ps-10 py-3 w-full outline-primary my-4 rounded" onChange={e => changeSearch(e.target.value)} />
                    </div>
                </div>
                {/* ALL trending books */}
                <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => (
                        <div key={book.key} className="bg-gray shadow-md rounded">
                            <div className="relative">
                                <div className="bg-[#F2F2F2] p-4">
                                    <img src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} alt={book.title} className="w-full h-64 object-contain" />
                                </div>
                                <span className="bg-[#DCFCE7] text-green p-1 rounded-md text-label-sm absolute top-4 right-3">Available</span>
                            </div>

                            <div className="p-5 ">
                                <h1 className="font-bold text-body-lg py-2">{book.title}</h1>
                                <p className="text-sm text-gray-500">{book.author_name?.join(' , ')}</p>
                            </div>

                            <div className="flex justify-end p-2">
                                <Button type='submit' className="">Reserve</Button >
                            </div>
                        </div>
                    ))}
                </div>

            </section>

        </div>
    )
}

export default TrendList;