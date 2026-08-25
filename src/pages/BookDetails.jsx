import { useContext, useEffect, useState } from "react";
import DetailsNavbar from "../components/DetailsNavbar";
import { BookContext } from "../context/myContext";
import { useParams } from "react-router-dom";

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
        <div>
            <DetailsNavbar />

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* BOOK COVER */}
                        <div className="bg-[#F2F2F2] rounded p-6">
                            {book.covers?.[0] ? (
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                                    alt={book.title}
                                    className="w-full max-h-125 object-contain"
                                />
                            ) : (
                                <div className="h-100 flex items-center justify-center text-gray-500">
                                    No cover available
                                </div>
                            )}
                        </div>

                        {/* BOOK INFORMATION */}
                        <div>
                            <h1 className="text-3xl font-bold mb-4">
                                {book.title}
                            </h1>

                            <p className="text-gray-600 mb-4">
                                Author:{" "}
                                {book.authors?.length
                                    ? book.authors
                                          .map(
                                              (author) =>
                                                  author.name
                                          )
                                          .join(", ")
                                    : "Unknown author"}
                            </p>

                            {book.first_publish_date && (
                                <p className="text-gray-600 mb-4">
                                    First published:{" "}
                                    {book.first_publish_date}
                                </p>
                            )}

                            {book.description && (
                                <div className="mb-6">
                                    <h2 className="font-bold text-xl mb-2">
                                        Description
                                    </h2>

                                    <p className="text-gray-600 leading-7">
                                        {typeof book.description ===
                                        "string"
                                            ? book.description
                                            : book.description.value}
                                    </p>
                                </div>
                            )}

                            {book.subjects?.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="font-bold text-xl mb-2">
                                        Subjects
                                    </h2>

                                    <div className="flex flex-wrap gap-2">
                                        {book.subjects
                                            .slice(0, 10)
                                            .map((subject) => (
                                                <span
                                                    key={subject}
                                                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            )}

                            <button className="bg-primary text-white px-6 py-3 rounded">
                                Reserve Book
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default BookDetails;