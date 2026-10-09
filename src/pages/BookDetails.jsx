import { useContext, useEffect, useState } from "react";
import DetailsNavbar from "../components/DetailsNavbar";
import { BookContext, AuthContext } from "../context/myContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBook } from "react-icons/fa";
import Button from "../components/Button";
import { saveRedirect } from "../utils/borrowRedirect";
import { supabase } from "../services/supabase";

const BookDetails = () => {
    const { fetchBookDetails } = useContext(BookContext);
    const { isAuthenticated } = useContext(AuthContext)
    const { bookId } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                setLoading(true);
                setError("");
                let data;
                if (/^\d+$/.test(bookId)) {
                    const { data: libraryBook, error: libraryError } = await supabase
                        .from("books")
                        .select("*")
                        .eq("id", bookId)
                        .maybeSingle();

                    if (libraryError) throw libraryError;
                    if (!libraryBook) throw new Error("Book not found in the library catalog.");
                    data = libraryBook;
                } else {
                    data = await fetchBookDetails(bookId);
                }
                setBook(data);
            } catch (error) {
                console.error(error);
                setError(error.message || "Unable to load book details.");
            } finally {
                setLoading(false);
            }
        };
        if (bookId) getBookDetails();
    }, [bookId, fetchBookDetails]);

    const handleBorrowClick = () => {
        const borrowDestination = `/borrow-confirm/${bookId}`;

        if (!isAuthenticated) {
            // Save the borrow destination so it survives
            // Sign In → Sign Up → Email Confirmation.
            saveRedirect(borrowDestination);

            navigate("/signin", {
                state: {
                    from: borrowDestination,
                },
            });

            return;
        }

        navigate(borrowDestination);
    };
    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora">
            <DetailsNavbar />

            <div className="page-container mx-auto px-4 py-4">
                <Link
                    className="inline-flex items-center text-sm font-bold text-primary-container gap-2 mb-6"
                    to='/trendinglist'
                >
                    <FaArrowLeft /> Back to Library
                </Link>

                <section className="bg-white rounded-2xl border border-indigo-50 shadow-sm p-6 md:p-10">
                    {loading && (
                        <div className="py-20 text-center flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-4 border-indigo-100 border-t-primary-container rounded-full animate-spin"></div>
                            <p className="text-slate-500 font-medium">Loading book details...</p>
                        </div>
                    )}

                    {error && (
                        <div className="py-20 text-center">
                            <p className="text-red-500 font-bold">{error}</p>
                            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
                        </div>
                    )}

                    {!loading && !error && book && (
                        <div className="flex flex-col md:flex-row items-start gap-10 lg:gap-16">
                            {/* BOOK COVER */}
                            <div className="w-full md:w-80 shrink-0">
                                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-inner flex justify-center items-center aspect-3/4">
                                    {book.cover_url || book.covers?.[0] ? (
                                        <img
                                            src={book.cover_url || `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                                            alt={book.title}
                                            className="max-w-full max-h-full object-contain shadow-lg rounded-sm"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-slate-300">
                                            <FaBook size={64} />
                                            <span className="text-xs font-bold uppercase tracking-widest">No Cover</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* BOOK INFORMATION */}
                            <div className="flex-1 min-w-0 py-2">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                    <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                                        {book.title}
                                    </h1>
                                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                        Available
                                    </span>
                                </div>

                                <p className="text-slate-500 text-lg font-medium mb-8">
                                    by <span className="text-primary-container font-bold">
                                        {book.author || (book.author_name?.length
                                            ? book.author_name.join(", ")
                                            : "Unknown Author")}
                                    </span>
                                </p>

                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-10 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Genre</p>
                                        <p className="font-bold text-slate-700 text-sm">
                                            {book.genre || book.subjects?.[0] || "Academic"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Year</p>
                                        <p className="font-bold text-slate-700 text-sm">
                                            {book.first_publish_date || book.publisher || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Language</p>
                                        <p className="font-bold text-slate-700 text-sm">English</p>
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-3">
                                        About this book
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-sm">
                                        {typeof book.description === "string"
                                            ? book.description
                                            : book.description?.value || "No description available for this academic resource."}
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {book.id && (
                                        <Button
                                            variant="primary"
                                            className="px-8 py-4 shadow-lg shadow-indigo-100"
                                            onClick={handleBorrowClick}
                                        >
                                            <FaBook className="mr-2" /> Request Book
                                        </Button>
                                    )}
                                    <Button
                                        variant="secondary"
                                        className="px-8 py-4"
                                    >
                                        Preview Extract
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </div >
        </div >
    );
};

export default BookDetails;