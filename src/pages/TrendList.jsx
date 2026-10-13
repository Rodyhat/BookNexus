import { useContext } from "react";
import TrendingNavbar from "../components/TrendingNavbar";
import { FaSearch } from "react-icons/fa";
import { BookContext } from "../context/myContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const TrendList = () => {
    const { changeSearch, books, loadMore, libraryBooks } = useContext(BookContext);
    const navigate = useNavigate();

    return (
        <div>
            <TrendingNavbar />

            <section className="page-container">

                <div>
                    <h2 className="text-headline-md font-bold">
                        BookNexus Library
                    </h2>

                    <p className="text-[15px] md:text-[17px] text-light leading-7 font-normal">
                        Browse books added to our collection. You can request a copy when one is available.
                    </p>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold">Our collection</h3>
                        {libraryBooks.length === 0 ? (
                            <p className="mt-3 text-sm text-slate-500">
                                No books have been added to the library yet.
                            </p>
                        ) : (
                            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {libraryBooks.map((book) => {
                                    const available = Number(book.available_copies) > 0;

                                    return (
                                        <div
                                            key={book.id}
                                            className="bg-gray shadow-md rounded flex flex-col overflow-hidden"
                                        >
                                            <div className="bg-[#F2F2F2] p-4 h-72 flex items-center justify-center">
                                                {book.cover_url ? (
                                                    <img
                                                        src={book.cover_url}
                                                        alt={book.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="text-sm text-slate-500">No cover available</span>
                                                )}
                                            </div>
                                            <div className="p-5 flex flex-col flex-1">
                                                <span className={`self-start p-1 rounded-md text-label-sm ${available ? "bg-[#DCFCE7] text-green" : "bg-slate-100 text-slate-600"}`}>
                                                    {available ? `${book.available_copies} available` : "Unavailable"}
                                                </span>
                                                <h3 className="font-bold text-body-lg py-2 line-clamp-2">
                                                    {book.title}
                                                </h3>
                                                <p className="text-sm text-gray-500 line-clamp-1">
                                                    {book.author || "Unknown Author"}
                                                </p>
                                                <div className="flex justify-end mt-auto pt-4">
                                                    <Button
                                                        type="button"
                                                        onClick={() => navigate(`/bookdetails/${book.id}`)}
                                                    >
                                                        View details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-headline-md font-bold">
                        Discover more titles
                    </h2>
                    <p className="text-[15px] md:text-[17px] text-light leading-7 font-normal">
                        These Open Library listings are for discovery only. An admin must add a title to BookNexus before it can be borrowed.
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

                {/* OPEN LIBRARY DISCOVERY RESULTS */}
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

                                <span className="bg-amber-50 text-amber-700 p-1 rounded-md text-label-sm absolute top-4 right-3">
                                    Discovery only
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

                                {/* External discovery title */}
                                <div className="flex justify-end mt-auto pt-4">

                                    <Button
                                        type="button"
                                        onClick={() => {
                                            const workId = book.key.split("/").pop();
                                            navigate(`/bookdetails/${workId}`);
                                        }}
                                    >
                                        View details
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