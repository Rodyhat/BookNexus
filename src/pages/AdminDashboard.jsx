import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { MdCheckCircle, MdLibraryBooks, MdMenuBook } from "react-icons/md";
import BorrowActivity from "../components/BorrowActivity";
import QuickAction from "../components/QuickAction";
import TopCategories from "../components/TopCategories";
import { AuthContext } from "../context/myContext";
import { supabase } from "../services/supabase";

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    const loadDashboard = useCallback(async () => {
        setIsLoading(true);
        setLoadError("");

        try {
            const [booksResult, requestsResult] = await Promise.all([
                supabase
                    .from("books")
                    .select("id, title, genre, total_copies, available_copies"),
                supabase
                    .from("borrow_requests")
                    .select("id, user_id, book_id, status, requested_at, decided_at, return_date, return_requested_at, returned_at")
                    .order("requested_at", { ascending: false }),
            ]);

            if (booksResult.error) throw booksResult.error;
            if (requestsResult.error) throw requestsResult.error;

            const bookIds = [...new Set((requestsResult.data || []).map((request) => request.book_id))];
            const userIds = [...new Set((requestsResult.data || []).map((request) => request.user_id))];
            let booksById = {};
            let profilesById = {};

            if (bookIds.length) {
                const { data: requestedBooks, error } = await supabase
                    .from("books")
                    .select("id, title, author, cover_url")
                    .in("id", bookIds);
                if (error) throw error;
                booksById = Object.fromEntries((requestedBooks || []).map((book) => [String(book.id), book]));
            }

            if (userIds.length) {
                const { data: profiles, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .in("id", userIds);
                if (error) {
                    console.warn("Borrower profile details are unavailable:", error.message);
                } else {
                    profilesById = Object.fromEntries((profiles || []).map((profile) => [String(profile.id), profile]));
                }
            }

            setBooks(booksResult.data || []);
            setRequests((requestsResult.data || []).map((request) => ({
                ...request,
                book: booksById[String(request.book_id)],
                borrower: profilesById[String(request.user_id)],
            })));
        } catch (error) {
            console.error("Unable to load admin dashboard:", error);
            setLoadError(error.message || "Unable to load dashboard data.");
            setBooks([]);
            setRequests([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    const getActivityTime = (request) => new Date(
        request.returned_at
        || request.return_requested_at
        || request.decided_at
        || request.requested_at
        || 0
    ).getTime();
    const recentRequests = [...requests].sort(
        (first, second) => getActivityTime(second) - getActivityTime(first)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeLoans = requests.filter((request) =>
        request.status === "approved" || request.status === "return_requested"
    );
    const overdueLoans = activeLoans.filter((request) =>
        request.return_date && new Date(`${request.return_date}T00:00:00`) < today
    );
    const availableCopies = books.reduce((total, book) => total + (Number(book.available_copies) || 0), 0);
    const stats = [
        { label: "CATALOG TITLES", value: books.length, icon: MdLibraryBooks, color: "#3730A3", bg: "bg-indigo-50" },
        { label: "AVAILABLE COPIES", value: availableCopies, icon: MdCheckCircle, color: "#047857", bg: "bg-emerald-50" },
        { label: "ACTIVE LOANS", value: activeLoans.length, icon: MdMenuBook, color: "#D97706", bg: "bg-amber-50" },
        { label: "OVERDUE", value: overdueLoans.length, icon: FiAlertTriangle, color: "#DC2626", bg: "bg-red-50" },
    ];
    const categories = useMemo(() => {
        const counts = books.reduce((result, book) => {
            const genre = book.genre?.trim() || "Uncategorized";
            result[genre] = (result[genre] || 0) + 1;
            return result;
        }, {});
        const total = books.length || 1;
        return Object.entries(counts)
            .map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 100) }))
            .sort((first, second) => second.count - first.count)
            .slice(0, 4);
    }, [books]);

    const displayValue = (value) => loadError ? "—" : isLoading ? "..." : value.toLocaleString();

    return (
        <section className="w-full">
            <div>
                <h3 className="font-sora text-headline-lg font-bold">Overview</h3>
                <p className="text-sm text-slate-500">
                    {user?.user_metadata?.full_name
                        ? `Welcome, ${user.user_metadata.full_name}. `
                        : ""}
                    Live catalog and borrowing activity.
                </p>
            </div>
            <div className="my-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="flex items-center justify-between border border-slate-200 bg-white p-5 shadow-sm">
                        <div>
                            <h5 className="py-3 text-xs font-semibold text-slate-500">{label}</h5>
                            <p className="font-heading text-3xl font-extrabold text-slate-900">{displayValue(value)}</p>
                        </div>
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bg}`} style={{ color }}>
                            <Icon size={20} />
                        </div>
                    </div>
                ))}
            </div>
            {loadError && (
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-l-4 border-red-600 bg-red-50 p-4 text-sm text-red-800">
                    <p>{loadError}</p>
                    <button type="button" onClick={loadDashboard} className="font-semibold underline">Retry</button>
                </div>
            )}
            <div className="grid gap-5 lg:grid-cols-3">
                <BorrowActivity requests={recentRequests.slice(0, 5)} isLoading={isLoading} />
                <div className="grid gap-5">
                    <QuickAction />
                    <TopCategories categories={categories} isLoading={isLoading} />
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard;