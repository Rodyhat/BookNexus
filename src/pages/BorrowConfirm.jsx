import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    FaArrowLeft,
    FaBook,
    FaCalendarAlt,
    FaCheckCircle,
} from "react-icons/fa";
import { BookContext } from "../context/myContext";
import Button from "../components/Button";

const BorrowConfirm = () => {
    const { bookId } = useParams();
    const { fetchBookDetails } = useContext(BookContext);
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [loanPeriod, setLoanPeriod] = useState(14);

    // Fetch the exact book the user selected
    useEffect(() => {
        const getBook = async () => {
            if (!bookId) {
                setError("Book ID is missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const data = await fetchBookDetails(bookId);

                if (!data) {
                    throw new Error("Book not found");
                }

                setBook(data);
            } catch (err) {
                console.error("Error loading book:", err);
                setError("Unable to load book details.");
            } finally {
                setLoading(false);
            }
        };

        getBook();
    }, [bookId, fetchBookDetails]);

    // Calculate dates
    const today = new Date();

    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + loanPeriod);

    const formatDate = (date) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleConfirm = () => {
        const referenceId = `BNX-${Date.now()
            .toString()
            .slice(-8)}`;

        navigate("/borrow-success", {
            state: {
                book,
                bookId,
                loanPeriod,
                borrowedDate: formatDate(today),
                returnDate: formatDate(returnDate),
                referenceId,
            },
        });
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F9F9FF] flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">
                        Loading book details...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !book) {
        return (
            <div className="min-h-screen bg-[#F9F9FF] flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaBook size={25} />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        Book Not Found
                    </h2>

                    <p className="text-gray-600 mb-6">
                        {error || "We could not load this book."}
                    </p>

                    <Button onClick={() => navigate(-1)}>
                        Go Back
                    </Button>
                </div>
            </div>
        );
    }

    const title = book.title || "Unknown Book";

    const author = book.author_name?.length
        ? book.author_name.join(", ")
        : "Unknown Author";

    const coverUrl = book.covers?.[0]
        ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
        : null;

    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-6xl mx-auto">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition mb-6 sm:mb-8"
                >
                    <FaArrowLeft />
                    <span className="text-sm sm:text-base">
                        Back to Book Details
                    </span>
                </button>

                {/* Heading */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                        Confirm Borrowing
                    </h1>

                    <p className="text-gray-500 mt-2 text-sm sm:text-base">
                        Review the book and borrowing period before confirming.
                    </p>
                </div>

                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                    {/* Book information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
                            Book Information
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-5">

                            {/* Cover */}
                            <div className="w-full sm:w-40 lg:w-44 shrink-0">
                                <div className="aspect-2/3 bg-gray-100 rounded-xl overflow-hidden">
                                    {coverUrl ? (
                                        <img
                                            src={coverUrl}
                                            alt={title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <FaBook size={40} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                                    {title}
                                </h3>

                                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                                    by {author}
                                </p>

                                {book.first_publish_date && (
                                    <div className="mt-5">
                                        <p className="text-xs uppercase tracking-wide text-gray-400">
                                            Published
                                        </p>

                                        <p className="text-gray-700 mt-1 text-sm">
                                            {book.first_publish_date}
                                        </p>
                                    </div>
                                )}

                                {book.subjects?.length > 0 && (
                                    <div className="mt-4">
                                        <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
                                            Category
                                        </p>

                                        <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                                            {book.subjects[0]}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Borrowing information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">
                            Borrowing Details
                        </h2>

                        {/* Borrow date */}
                        <div className="flex items-center justify-between gap-4 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                                    <FaCalendarAlt />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                                        Borrow Date
                                    </p>

                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {formatDate(today)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Loan period */}
                        <div className="py-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                                Loan Period
                            </p>

                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                {[7, 14, 21].map((period) => (
                                    <button
                                        key={period}
                                        type="button"
                                        onClick={() => setLoanPeriod(period)}
                                        className={`py-3 px-2 rounded-xl border text-sm font-semibold transition ${loanPeriod === period
                                            ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                                            : "border-gray-200 text-gray-600 hover:border-indigo-300"
                                            }`}
                                    >
                                        {period} Days
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Return date */}
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                            <div className="w-10 h-10 rounded-lg bg-white text-indigo-700 flex items-center justify-center shadow-sm">
                                <FaCheckCircle />
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">
                                    Return Date
                                </p>

                                <p className="font-bold text-gray-900">
                                    {formatDate(returnDate)}
                                </p>
                            </div>
                        </div>

                        {/* Confirm button */}
                        <div className="mt-6">
                            <Button
                                onClick={handleConfirm}
                                className="w-full"
                            >
                                Confirm Borrowing
                            </Button>
                        </div>

                        <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                            By confirming, you agree to return the book on or
                            before the selected return date.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowConfirm;