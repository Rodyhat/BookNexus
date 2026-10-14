import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdAccessTime, MdCheckCircle, MdHistory, MdMenuBook } from "react-icons/md";
import Button from "../components/Button";
import { supabase } from "../services/supabase";
import toast from "react-hot-toast";

const UserBooks = () => {
    const [activeTab, setActiveTab] = useState("active");
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [downloadingId, setDownloadingId] = useState(null);
    const [returningId, setReturningId] = useState(null);
    const navigate = useNavigate();

    const loadRequests = useCallback(async () => {
        setIsLoading(true);
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            console.error("Unable to identify signed-in user:", authError);
            toast.error("Please sign in again to view your book requests.");
            setRequests([]);
            setIsLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("borrow_requests")
            .select("id, user_id, book_id, status, loan_period_days, requested_at, decided_at, return_date, return_requested_at, returned_at")
            .eq("user_id", user.id)
            .order("requested_at", { ascending: false });

        if (error) {
            console.error("Unable to load your borrow requests:", error);
            toast.error(error.message || "Unable to load your books.");
            setRequests([]);
            setIsLoading(false);
            return;
        }

        const bookIds = [...new Set((data || []).map((request) => request.book_id))];
        let booksById = {};
        if (bookIds.length) {
            const { data: books, error: booksError } = await supabase
                .from("books")
                .select("id, title, author, cover_url, ebook_path")
                .in("id", bookIds);

            if (booksError) {
                console.error("Unable to load requested books:", booksError);
                toast.error(booksError.message || "Unable to load book details.");
                setRequests([]);
                setIsLoading(false);
                return;
            }
            booksById = Object.fromEntries((books || []).map((book) => [String(book.id), book]));
        }

        setRequests((data || []).map((request) => ({
            ...request,
            book: booksById[String(request.book_id)],
        })));
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadRequests();
    }, [loadRequests]);

    const downloadBook = async (request) => {
        setDownloadingId(request.id);
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;
            if (!user || request.user_id !== user.id || request.status !== "approved") {
                throw new Error("Only the borrower of an approved request can download this book.");
            }
            if (!request.book?.ebook_path) {
                throw new Error("An ebook file has not been uploaded for this book.");
            }

            const { data: approvedRequest, error: requestError } = await supabase
                .from("borrow_requests")
                .select("id")
                .eq("id", request.id)
                .eq("user_id", user.id)
                .eq("status", "approved")
                .maybeSingle();

            if (requestError) throw requestError;
            if (!approvedRequest) throw new Error("This borrow request is no longer approved.");

            const { data, error } = await supabase.storage
                .from("book-files")
                .createSignedUrl(request.book.ebook_path, 300, {
                    download: true,
                });
            if (error) throw error;
            window.location.assign(data.signedUrl);
        } catch (error) {
            console.error("Unable to download ebook:", error);
            toast.error(error.message || "Unable to download this ebook.");
        } finally {
            setDownloadingId(null);
        }
    };

    const requestReturn = async (request) => {
        setReturningId(request.id);
        try {
            const { error } = await supabase.rpc("request_borrow_return", {
                p_request_id: String(request.id),
            });
            if (error) throw error;
            toast.success("Return request sent to the library team.");
            await loadRequests();
        } catch (error) {
            console.error("Unable to request book return:", error);
            toast.error(error.message || "Unable to request this book return.");
        } finally {
            setReturningId(null);
        }
    };

    const currentRequests = requests.filter((request) =>
        activeTab === "history"
            ? request.status === "rejected" || request.status === "returned"
            : request.status === "pending" || request.status === "approved" || request.status === "return_requested"
    );

    const getStatusClass = (status) => {
        if (status === "approved") return "bg-green-50 text-green-700 border-green-100";
        if (status === "rejected") return "bg-red-50 text-red-700 border-red-100";
        if (status === "return_requested") return "bg-sky-50 text-sky-700 border-sky-100";
        if (status === "returned") return "bg-slate-100 text-slate-700 border-slate-200";
        return "bg-amber-50 text-amber-700 border-amber-100";
    };

    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora">
            <main className="mx-auto py-6 md:py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-2">My Books</h1>
                    <p className="text-slate-500 text-sm font-medium">Track your requests and approved ebooks.</p>
                </div>

                <div className="flex p-1 bg-indigo-50/50 rounded-xl mb-8">
                    <button
                        type="button"
                        onClick={() => setActiveTab("active")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "active" ? "bg-primary-container text-white shadow-md" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <MdMenuBook size={18} /> Requests ({requests.filter((request) => request.status === "pending" || request.status === "approved" || request.status === "return_requested").length})
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("history")}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "history" ? "bg-primary-container text-white shadow-md" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <MdHistory size={18} /> History
                    </button>
                </div>

                {isLoading ? (
                    <p className="py-12 text-center text-slate-500">Loading your requests...</p>
                ) : currentRequests.length === 0 ? (
                    <div className="rounded-2xl border border-indigo-50 bg-white p-8 text-center">
                        <p className="text-slate-500">{activeTab === "history" ? "No completed requests yet." : "You have no pending requests or approved books."}</p>
                        <Button variant="secondary" className="mt-4" onClick={() => navigate("/trendinglist")}>
                            Explore the catalog
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {currentRequests.map((request) => (
                            <article key={request.id} className="bg-white rounded-2xl border border-indigo-50 p-4 flex gap-4 shadow-sm">
                                <div className="w-20 h-28 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                                    {request.book?.cover_url && (
                                        <img src={request.book.cover_url} alt={request.book.title || "Book cover"} className="w-full h-full object-cover" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                    <div>
                                        <h2 className="font-black text-slate-800 text-sm leading-snug">{request.book?.title || "Book no longer available"}</h2>
                                        <p className="text-xs text-slate-500 mt-1">{request.book?.author || "Unknown author"}</p>
                                    </div>
                                    <div className="space-y-2 mt-3">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase ${getStatusClass(request.status)}`}>
                                            {request.status === "approved" && <MdCheckCircle size={13} />}
                                            {request.status.replaceAll("_", " ")}
                                        </span>
                                        {(request.status === "approved" || request.status === "return_requested") && request.return_date && (
                                            <p className="flex items-center gap-1.5 text-xs text-slate-500">
                                                <MdAccessTime size={15} />
                                                Due {new Date(`${request.return_date}T00:00:00`).toLocaleDateString()}
                                            </p>
                                        )}
                                        {request.status === "return_requested" && (
                                            <p className="text-xs text-sky-700">Return requested. Waiting for admin confirmation.</p>
                                        )}
                                        {request.status === "returned" && request.returned_at && (
                                            <p className="text-xs text-slate-500">
                                                Returned {new Date(request.returned_at).toLocaleDateString()}
                                            </p>
                                        )}
                                        {request.status === "approved" && (
                                            <div className="grid gap-2">
                                                <Button
                                                    className="w-full"
                                                    disabled={downloadingId === request.id}
                                                    onClick={() => downloadBook(request)}
                                                >
                                                    {downloadingId === request.id ? "Preparing..." : "Download ebook"}
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    className="w-full"
                                                    disabled={returningId === request.id}
                                                    onClick={() => requestReturn(request)}
                                                >
                                                    {returningId === request.id ? "Requesting..." : "Request return"}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserBooks;
