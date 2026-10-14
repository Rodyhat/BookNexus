import { MdHistory, MdPersonOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const getBorrowerName = (profile, userId) =>
    profile?.full_name
    || profile?.name
    || profile?.display_name
    || profile?.email
    || `Borrower ${String(userId || "").slice(0, 8)}`;

const getInitials = (name) => name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "U";

const getRelativeTime = (value) => {
    if (!value) return "Date unavailable";
    const elapsedSeconds = Math.max(0, (Date.now() - new Date(value).getTime()) / 1000);
    if (elapsedSeconds < 60) return "Just now";
    if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`;
    if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`;
    return `${Math.floor(elapsedSeconds / 86400)}d ago`;
};

const BorrowActivity = ({ requests = [], isLoading = false }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
        <section className="rounded-lg shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-5">
                <h5 className="text-lg font-semibold font-heading">Recent Borrow Activity</h5>
                <Link to="/admin/borrowers" className="text-sm font-semibold text-primary-container hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                    <p className="p-6 text-sm text-slate-500">Loading activity...</p>
                ) : requests.length === 0 ? (
                    <div className="flex flex-col items-center px-6 py-10 text-center text-slate-500">
                        <MdHistory size={28} className="mb-2 text-slate-300" />
                        <p className="text-sm">Borrow and return activity will appear here.</p>
                    </div>
                ) : requests.map((request) => {
                    const borrowerName = getBorrowerName(request.borrower, request.user_id);
                    const avatarUrl = request.borrower?.avatar_url
                        || request.borrower?.photo_url
                        || request.borrower?.picture_url
                        || request.borrower?.avatar
                        || request.borrower?.picture;
                    const activityAt = request.returned_at
                        || request.return_requested_at
                        || request.decided_at
                        || request.requested_at;
                    const isActive = request.status === "approved" || request.status === "return_requested";
                    const isOverdue = isActive
                        && request.return_date
                        && new Date(`${request.return_date}T00:00:00`) < today;
                    const activityLabel = isOverdue
                        ? "Loan overdue"
                        : {
                            pending: "Submitted a borrow request",
                            approved: "Loan approved",
                            rejected: "Borrow request declined",
                            return_requested: "Requested a return",
                            returned: "Book returned",
                        }[request.status] || "Borrow request updated";

                    return (
                        <article key={request.id} className="flex items-start gap-3 p-4 sm:p-5">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-sm font-bold text-primary-container">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt={`${borrowerName} profile`} className="h-full w-full object-cover" />
                                ) : (
                                    getInitials(borrowerName)
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                    <h6 className="truncate text-sm font-semibold text-slate-800">{borrowerName}</h6>
                                    <time className="shrink-0 text-xs text-slate-400" dateTime={activityAt || undefined}>
                                        {getRelativeTime(activityAt)}
                                    </time>
                                </div>
                                <p className="mt-1 text-sm text-slate-600">
                                    {activityLabel}: <span className="font-medium text-slate-800">{request.book?.title || "Book unavailable"}</span>
                                </p>
                                {isActive && request.return_date && (
                                    <p className={`mt-2 text-xs font-medium ${isOverdue ? "text-red-700" : "text-slate-500"}`}>
                                        Due {new Date(`${request.return_date}T00:00:00`).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default BorrowActivity;