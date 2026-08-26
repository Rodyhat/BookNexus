import { useContext, useEffect, useState } from "react";
import DetailsNavbar from "../components/DetailsNavbar";
import { BookContext } from "../context/myContext";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaBook } from "react-icons/fa";

const BookDetails = () => {
    const { fetchBookDetails } = useContext(BookContext);
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await fetchBookDetails(bookId);

                setBook(data);
            } catch (error) {
                console.error(error);
                setError("Unable to load book details.");
            } finally {
                setLoading(false);
            }
        };

        getBookDetails();
    }, [bookId, fetchBookDetails]);

    return (
        <div className="">
            <DetailsNavbar />
            <Link className="flex items-center text-label-md px-7.5 py-3.75 gap-2" to='/trendinglist'> <FaArrowLeft /> Back to Library</Link>
            <section className="page-container">
                {loading && (
                    <div className="py-10 text-center">
                        Loading book details...
                    </div>
                )}

                {error && (
                    <div className="py-10 text-center text-red-500">
                        {error}
                    </div>
                )}

                {!loading && !error && book && (
                    <div className="flex flex-col md:flex-row items-start gap-10 w-full">
                        {/* BOOK COVER */}
                        <div className="bg-[#F2F2F2] rounded p-6 md:w-fit w-full shrink-0">
                            {book.covers?.[0] ? (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                                    alt={book.title}
                                    className="md:max-w-full w-full max-h-110 object-contain"
                                />
                            ) : (
                                <div className="w-62.5 h-100 flex items-center justify-center text-gray-500">
                                    No cover available
                                </div>
                            )}
                        </div>

                        {/* BOOK INFORMATION */}
                        <div className="flex-1 min-w-0 ">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-bold mb-4">
                                    {book.title}
                                </h1>
                                <span className="bg-[#DCFCE7] text-green p-1 rounded-md text-label-sm right-3">Available</span>
                            </div>

                            {/* author name */}
                            <p className="text-gray-600 mb-4">
                                by {" "}
                                {book.author_name?.length
                                    ? book.author_name.join(", ")
                                    : "Unknown author"}
                            </p>
                            <hr className="border-outline-variant mb-6" />

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-5 mb-5 border border-outline-variant px-4 py-2 rounded">
                                {/* genre */}
                                <div>
                                    <p className="text-sm text-gray-500">Genre</p>
                                    <p className="font-medium">
                                        {book.subjects?.[0] || "Not available"}
                                    </p>
                                </div>
                                {/* publication year */}
                                <div>
                                    <p className="text-sm text-gray-500">Publication Year</p>
                                    <p className="font-medium">
                                        {book.publication_year || "Not available"}
                                    </p>
                                </div>
                                {/* ISBN */}
                                <div>
                                    <p className="text-sm text-gray-500">ISBN</p>
                                    <p className="font-medium">
                                        {book.first_publish_date || "Not available"}
                                    </p>
                                </div>
                                {/* Location */}
                                <div>
                                    <p className="text-sm text-gray-500">Location</p>
                                    <p className="font-medium">
                                        {book.first_publish_date || "Not available"}
                                    </p>
                                </div>
                                {/* publisher */}
                                <div>
                                    <p className="text-sm text-gray-500">Publisher</p>
                                    <p className="font-medium">
                                        {book.first_publish_date || "Not available"}
                                    </p>
                                </div>



                            </div>
                            <div className="mb-5">
                                <h2 className="text-xl font-bold mb-3">
                                    Description
                                </h2>

                                <p className="text-gray-600 leading-7">
                                    {typeof book.description === "string"
                                        ? book.description
                                        : book.description?.value || "No description available."}
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <button className="bg-primary text-white px-6 py-3 flex items-center gap-1 text-sm font-semibold rounded">
                                    <FaBook />
                                    Borrow Material
                                </button>
                                <button className="bg-[#F9F9FF] text-black px-6 py-3 rounded border border-outline-variant text-sm font-semibold ">
                                    Preview Extract
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default BookDetails;