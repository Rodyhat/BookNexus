import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle, MdRefresh, MdSearch } from "react-icons/md";
import Button from "../components/Button";
import { supabase } from "../services/supabase";
import toast from "react-hot-toast";

const AdminBorrowers = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const loadRequests = useCallback(async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("borrow_requests")
            .select("id, user_id, book_id, status, loan_period_days, requested_at, decided_at, return_date")
            .order("requested_at", { ascending: false });

        if (error) {
            console.error("Unable to load borrow requests:", error);
            toast.error(error.message || "Unable to load borrow requests.");
            setIsLoading(false);
            return;
        }

        const bookIds = [...new Set((data || []).map((request) => request.book_id))];
        let booksById = {};

        if (bookIds.length) {
            const { data: books, error: booksError } = await supabase
                .from("books")
                .select("id, title, author")
                .in("id", bookIds);

            if (booksError) {
                console.error("Unable to load requested books:", booksError);
                toast.error(booksError.message || "Unable to load requested book details.");
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

    const updateRequest = async (request, status) => {
        setUpdatingId(request.id);
        try {
            const { error } = await supabase.rpc("review_borrow_request", {
                p_request_id: String(request.id),
                p_decision: status,
            });
            if (error) throw error;
            const messages = {
                approved: "Borrow request approved.",
                rejected: "Borrow request rejected.",
                returned: "Book marked as returned.",
            };
            toast.success(messages[status]);
            await loadRequests();
        } catch (error) {
            console.error("Unable to update borrow request:", error);
            toast.error(error.message || "Unable to update borrow request.");
        } finally {
            setUpdatingId(null);
        }
    };

    const filteredRequests = requests.filter((request) => {
        const term = searchTerm.toLowerCase();
        return [
            request.user_id,
            request.book?.title,
            request.book?.author,
            request.status,
        ].some((value) => value?.toLowerCase().includes(term));
    });

    const statusStyles = {
        pending: "bg-amber-50 text-amber-700",
        approved: "bg-green-50 text-green-700",
        rejected: "bg-red-50 text-red-700",
        returned: "bg-slate-100 text-slate-700",
    };

    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora pb-12">
            <header className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
                        Borrow Requests
                    </h1>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium">
                        Review requests and approve or reject them.
                    </p>
                </div>
                <Button variant="secondary" onClick={loadRequests} disabled={isLoading}>
                    <MdRefresh size={18} /> Refresh
                </Button>
            </header>

            <div className="relative mb-6">
                <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="search"
                    aria-label="Search borrow requests"
                    placeholder="Search borrower or book..."
                    className="w-full bg-white border border-indigo-50 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </div>

            <div className="bg-white rounded-2xl border border-indigo-50 shadow-sm overflow-x-auto">
                <table className="w-full min-w-180 text-left">
                    <thead className="bg-slate-50 border-b border-indigo-50">
                        <tr>
                            {["Borrower", "Book", "Requested", "Due date", "Status", "Actions"].map((heading) => (
                                <th key={heading} className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {isLoading ? (
                            <tr><td colSpan="6" className="px-5 py-12 text-center text-slate-500">Loading requests...</td></tr>
                        ) : filteredRequests.length === 0 ? (
                            <tr><td colSpan="6" className="px-5 py-12 text-center text-slate-500">No borrow requests found.</td></tr>
                        ) : filteredRequests.map((request) => (
                            <tr key={request.id}>
                                <td className="px-5 py-4">
                                    <p className="font-bold text-slate-800">Borrower ID</p>
                                    <p className="text-xs text-slate-500">{request.user_id}</p>
                                </td>
                                <td className="px-5 py-4">
                                    <p className="font-bold text-slate-800">{request.book?.title || "Book"}</p>
                                    <p className="text-xs text-slate-500">{request.book?.author || ""}</p>
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {new Date(request.requested_at).toLocaleDateString()}
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {request.return_date ? new Date(`${request.return_date}T00:00:00`).toLocaleDateString() : `After ${request.loan_period_days} days`}
                                </td>
                                <td className="px-5 py-4">
                                    <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${statusStyles[request.status] || "bg-slate-100 text-slate-700"}`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    {request.status === "pending" ? (
                                        <div className="flex gap-2">
                                            <Button
                                                className="bg-green-600 text-white hover:bg-green-700"
                                                disabled={updatingId === request.id}
                                                onClick={() => updateRequest(request, "approved")}
                                            >
                                                <MdCheckCircle /> Approve
                                            </Button>
                                            <Button
                                                variant="danger"
                                                disabled={updatingId === request.id}
                                                onClick={() => updateRequest(request, "rejected")}
                                            >
                                                Reject
                                            </Button>
                                        </div>
                                    ) : request.status === "approved" ? (
                                        <Button
                                            variant="secondary"
                                            disabled={updatingId === request.id}
                                            onClick={() => updateRequest(request, "returned")}
                                        >
                                            Mark returned
                                        </Button>
                                    ) : <span className="text-xs text-slate-400">No action available</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBorrowers;
