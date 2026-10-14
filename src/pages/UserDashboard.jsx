import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  MdSearch,
  MdHistory,
  MdAccessTime,
  MdErrorOutline,
  MdBook,MdCheckCircleOutline,
  MdLibraryBooks,
  MdPersonOutline,
  MdHourglassEmpty
} from 'react-icons/md';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/myContext';
import { supabase } from '../services/supabase';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const loadRequests = useCallback(async () => {
    if (isAuthLoading) return;
    if (!user?.id) {
      setRequests([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError('');
    try {
      const { data, error } = await supabase
        .from('borrow_requests')
        .select('id, book_id, status, requested_at, decided_at, return_date, return_requested_at, returned_at')
        .eq('user_id', user.id)
        .order('requested_at', { ascending: false });

      if (error) throw error;

      const bookIds = [...new Set((data || []).map((request) => request.book_id))];
      let booksById = {};
      if (bookIds.length) {
        const { data: books, error: booksError } = await supabase
          .from('books')
          .select('id, title, author, cover_url')
          .in('id', bookIds);
        if (booksError) throw booksError;
        booksById = Object.fromEntries((books || []).map((book) => [String(book.id), book]));
      }

      setRequests((data || []).map((request) => ({
        ...request,
        book: booksById[String(request.book_id)],
      })));
    } catch (error) {
      console.error('Unable to load dashboard activity:', error);
      setLoadError(error.message || 'Unable to load your borrowing activity.');
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthLoading, user?.id]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  useEffect(() => {
    if (isAuthLoading || !user?.id) return undefined;

    const channel = supabase
      .channel(`user-borrow-activity-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'borrow_requests',
          filter: `user_id=eq.${user.id}`,
        },
        loadRequests
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthLoading, loadRequests, user?.id]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromToday = new Date(today);
  weekFromToday.setDate(weekFromToday.getDate() + 7);
  const activeRequests = requests.filter((request) =>
    request.status === 'approved' || request.status === 'return_requested'
  );
  const overdueRequests = activeRequests.filter((request) =>
    request.return_date && new Date(`${request.return_date}T00:00:00`) < today
  );
  const dueThisWeek = activeRequests.filter((request) => {
    if (!request.return_date) return false;
    const dueDate = new Date(`${request.return_date}T00:00:00`);
    return dueDate >= today && dueDate <= weekFromToday;
  });
  const totalBorrowed = requests.filter((request) =>
    request.status === 'approved' || request.status === 'return_requested' || request.status === 'returned'
  );
  const pendingRequests = requests.filter((request) => request.status === 'pending');
  const stats = [
    { label: 'TOTAL BORROWED', value: totalBorrowed.length, icon: MdBook, color: '#3730A3', bg: 'bg-indigo-50' },
    { label: 'ACTIVE LOANS', value: activeRequests.length, icon: MdAccessTime, color: '#D97706', bg: 'bg-amber-50' },
    { label: 'OVERDUE', value: overdueRequests.length, icon: MdErrorOutline, color: '#DC2626', bg: 'bg-red-50' },
    { label: 'PENDING REQUESTS', value: pendingRequests.length, icon: MdHourglassEmpty, color: '#B45309', bg: 'bg-amber-50' },
    { label: 'DUE THIS WEEK', value: dueThisWeek.length, icon: MdHistory, color: '#047857', bg: 'bg-emerald-50' },
  ];
  const recentActivity = useMemo(() => requests
    .map((request) => {
      const activityAt = request.returned_at || request.return_requested_at || request.decided_at || request.requested_at;
      const descriptions = {
        pending: 'Borrow request submitted',
        approved: 'Loan approved',
        rejected: 'Borrow request declined',
        return_requested: 'Return requested',
        returned: 'Book returned',
      };
      return { ...request, activityAt, description: descriptions[request.status] || request.status };
    })
    .sort((first, second) => new Date(second.activityAt) - new Date(first.activityAt))
    .slice(0, 5), [requests]);
  const firstName = user?.user_metadata?.full_name?.trim().split(/\s+/)[0]
    || user?.user_metadata?.name?.trim().split(/\s+/)[0]
    || user?.email?.split('@')[0]
    || 'there';

  const dueLabel = (request) => {
    if (request.status === 'return_requested') return 'Return requested';
    if (!request.return_date) return 'Due date unavailable';
    const dueDate = new Date(`${request.return_date}T00:00:00`);
    const daysUntilDue = Math.round((dueDate - today) / 86400000);
    if (daysUntilDue < 0) return `Overdue by ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) === 1 ? '' : 's'}`;
    if (daysUntilDue === 0) return 'Due today';
    if (daysUntilDue === 1) return 'Due tomorrow';
    return `Due in ${daysUntilDue} days`;
  };

  const quickActions = [
    { label: 'Browse catalog', icon: MdSearch, to: '/trendinglist' },
    { label: 'My books', icon: MdLibraryBooks, to: '/user/mybooks' },
    { label: 'Account settings', icon: MdPersonOutline, to: '/user/profile' },
  ];
  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora">

      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto">
        <div className="py-6 md:py-8 lg:py-10">
          {/* ================= WELCOME ================= */}
          <section className="mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  Welcome back, {firstName}.
                </h1>
                <p className="text-sm-label md:text-base text-slate-600">
                  {isLoading || isAuthLoading
                    ? 'Loading your borrowing activity...'
                    : overdueRequests.length > 0
                      ? `${overdueRequests.length} ${overdueRequests.length === 1 ? 'loan is' : 'loans are'} overdue.`
                      : dueThisWeek.length > 0
                        ? `${dueThisWeek.length} ${dueThisWeek.length === 1 ? 'book is' : 'books are'} due this week.`
                        : activeRequests.length > 0
                          ? `You have ${activeRequests.length} active ${activeRequests.length === 1 ? 'loan' : 'loans'}.`
                          : 'You have no active loans. Browse the catalog to find your next book.'}
                </p>
              </div>
              <Button
                variant="primary"
                className="w-full md:w-auto px-5 font-semibold" onClick={() => navigate('/trendinglist')}
              >
                Browse Catalog
              </Button>
            </div>
          </section>
          {/* ================= STATISTICS ================= */}
          <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 md:gap-4 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-4 md:p-5 lg:p-6 rounded-xl shadow-sm border-l-4 flex items-center gap-4"
                style={{ borderLeftColor: stat.color }}
              >
                <div className={`${stat.bg} p-3 rounded-xl shrink-0`}>
                  <stat.icon
                    size={24}
                    style={{ color: stat.color }}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] md:text-[10px] font-black text-slate-400 tracking-widest uppercase truncate">
                    {stat.label}
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-slate-800">
                    {loadError ? '—' : isLoading || isAuthLoading ? '...' : stat.value}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {loadError && (
            <div className="mb-8 flex flex-col gap-3 border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between">
              <p>{loadError}</p>
              <Button variant="secondary" onClick={loadRequests}>Try again</Button>
            </div>
          )}

          {/* ================= CURRENTLY BORROWED ================= */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-5 md:mb-6">
              Currently Borrowed
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">

              {isLoading || isAuthLoading ? (
                <p className="col-span-full py-8 text-center text-sm text-slate-500">Loading active loans...</p>
              ) : activeRequests.length === 0 ? (
                <div className="col-span-full border-y border-slate-200 bg-white px-6 py-10 text-center">
                  <MdCheckCircleOutline className="mx-auto mb-3 text-3xl text-emerald-600" />
                  <p className="font-semibold text-slate-800">No active loans</p>
                  <p className="mt-1 text-sm text-slate-500">Approved books will appear here with their due dates.</p>
                </div>
              ) : activeRequests.map((request) => {
                const isOverdue = request.return_date
                  && new Date(`${request.return_date}T00:00:00`) < today;
                return (
                  <article
                    key={request.id}
                    className="flex h-full flex-col justify-between border border-slate-200 bg-white p-4 transition-colors hover:bg-indigo-50/30 md:p-5"
                  >
                    <div className="mb-5 flex items-start">
                      <div className="mr-4 flex h-24 w-16 shrink-0 items-center justify-center overflow-hidden bg-slate-100">
                        {request.book?.cover_url ? (
                          <img src={request.book.cover_url} alt={request.book.title || 'Book cover'} className="h-full w-full object-cover" />
                        ) : (
                          <MdBook size={28} className="text-slate-300" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 line-clamp-2 text-base font-semibold leading-6 text-slate-900">
                          {request.book?.title || 'Book no longer available'}
                        </h3>
                        <p className="truncate text-sm text-slate-500">{request.book?.author || 'Unknown author'}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <span className={`text-xs font-semibold ${isOverdue ? 'text-red-700' : request.status === 'return_requested' ? 'text-sky-700' : 'text-slate-600'}`}>
                        {dueLabel(request)}
                      </span>
                      <Link to="/user/mybooks" className="shrink-0 text-sm font-semibold text-primary-container hover:underline">
                        View loan
                      </Link>
                    </div>
                  </article>
                );
              })}

            </div>

          </section>


          {/* ================= BORROWING HISTORY ================= */}
          <section className="mb-10">

            <h2 className="text-xl font-bold text-slate-800 mb-5 md:mb-6">
              Recent Activity
            </h2>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

              <div className="divide-y divide-slate-100">

                {isLoading || isAuthLoading ? (
                  <p className="p-5 text-sm text-slate-500">Loading recent activity...</p>
                ) : recentActivity.length === 0 ? (
                  <p className="p-5 text-sm text-slate-500">Your borrow requests and returns will appear here.</p>
                ) : recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-b-0 hover:bg-indigo-50/30"
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <MdBook
                        size={30}
                        className="text-slate-300 shrink-0"
                      />

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {item.book?.title || 'Book no longer available'}
                        </p>

                        <p className="text-xs md:text-sm text-slate-500 truncate">
                          {item.description} · {item.activityAt ? new Date(item.activityAt).toLocaleDateString() : 'Date unavailable'}
                        </p>

                      </div>

                    </div>

                    <span className="hidden shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium capitalize text-slate-700 md:inline-block">
                      {item.status.replaceAll('_', ' ')}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </section>


          {/* ================= QUICK ACTIONS ================= */}
          <section className="mb-8">

            <h2 className="text-xl font-bold text-slate-800 mb-5 md:mb-6">
              Quick Actions
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">

              {quickActions.map((action) => {

                const Icon = action.icon;

                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="min-w-0 flex flex-col items-center justify-center border border-slate-200 bg-white p-4 transition-colors hover:bg-indigo-50/30 md:p-6 group"
                  >

                    <Icon
                      className="text-primary-container mb-2 md:mb-3 group-hover:scale-110 transition-transform"
                      size={26}
                    />

                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-wide text-center leading-tight">
                      {action.label}
                    </span>

                  </Link>
                );

              })}

            </div>

          </section>

        </div>

      </main>


    </div>
  );
};

export default UserDashboard;