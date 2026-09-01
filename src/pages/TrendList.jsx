import { useContext } from "react";
import TrendingNavbar from "../components/TrendingNavbar";
import { FaSearch } from "react-icons/fa";
import { BookContext } from "../context/myContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const TrendList = () => {
    const { changeSearch, books, loadMore } = useContext(BookContext);
    const navigate = useNavigate();

    return (
        <div>
            <TrendingNavbar />

            <section className="page-container">

                <div>
                    <h2 className="text-headline-md font-bold">
                        Trending Books
                    </h2>

                    <p className="text-[15px] md:text-[17px] text-light leading-7 font-normal">
                        Discover what others are reading this week.
                    </p>

                    <div className="relative w-full lg:w-[50%]">
                        <FaSearch className="absolute top-8 text-gray-500 left-4" />

                        <input
                            type="text"
                            placeholder="Search trending titles, authors, or subjects..."
                            className="border border-outline-variant ps-10 py-3 w-full outline-primary my-4 rounded text-label-sm"
                            onChange={(e) => changeSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* ALL TRENDING BOOKS */}
                <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    {books.map((book) => (

                        <div
                            key={book.key}
                            className="bg-gray shadow-md rounded flex flex-col h-full overflow-hidden"
                        >

                            {/* Book Cover */}
                            <div className="relative shrink-0">

                                <div className="bg-[#F2F2F2] p-4 h-72 flex items-center justify-center">

                                    <img
                                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                                        alt={book.title}
                                        className="w-full h-full object-contain"
                                    />

                                </div>

                                <span className="bg-[#DCFCE7] text-green p-1 rounded-md text-label-sm absolute top-4 right-3">
                                    Available
                                </span>

                            </div>

                            {/* Book Information */}
                            <div className="p-5 flex flex-col flex-1">

                                <h1 className="font-bold text-body-lg py-2 line-clamp-2 min-h-14">
                                    {book.title}
                                </h1>

                                <p className="text-sm text-gray-500 line-clamp-1 min-h-5">
                                    {book.author_name?.join(" , ")}
                                </p>

                                {/* Reserve Button */}
                                <div className="flex justify-end mt-auto pt-4">

                                    <Button
                                        type="button"
                                        onClick={() => {
                                            const workId = book.key.split("/").pop();
                                            navigate(`/bookdetails/${workId}`);
                                        }}
                                    >
                                        Reserve
                                    </Button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </section>

            {/* MORE TRENDING BOOKS */}
            <button
                className="mx-auto flex outline-0"
                onClick={loadMore}
            >
                <span className="bg-surface-container-high rounded-2xl my-4 p-3">
                    Load More Trending Titles
                </span>
            </button>

        </div>
    );
};

export default TrendList;