import React from 'react';
import {
  MdSearch,
  MdQrCodeScanner,
  MdHistory,
  MdFavoriteBorder,
  MdAccessTime,
  MdErrorOutline,
  MdBook,
  MdDashboard,
  MdLibraryBooks
} from 'react-icons/md';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/src/assets/logo.png';

const UserDashboard = () => {
  const navigate = useNavigate();
  const stats = [
    {
      label: "BOOKS BORROWED",
      value: 42,
      icon: MdBook,
      color: "#3730A3",
      bg: "bg-indigo-50"
    },
    {
      label: "ACTIVE LOANS",
      value: 3,
      icon: MdAccessTime,
      color: "#D97706",
      bg: "bg-amber-50"
    },
    {
      label: "OVERDUE",
      value: 1,
      icon: MdErrorOutline,
      color: "#DC2626",
      bg: "bg-red-50"
    }
  ];

  const currentlyReading = [
    {
      id: 1,
      title: "The Design of Everyday Things",
      author: "Don Norman",
      due: "Due in 2 days",
      type: "overdue",
      cover:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200"
    },
    {
      id: 2,
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      due: "Due in 5 days",
      type: "upcoming",
      cover:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=200"
    },
    {
      id: 3,
      title: "Information Architecture",
      author: "Louis Rosenfeld",
      due: "Due in 14 days",
      type: "normal",
      cover:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=200"
    }
  ];

  const borrowingHistory = [
    {
      id: 1,
      title: "Clean Code",
      date: "Returned on Oct 12, 2023"
    },
    {
      id: 2,
      title: "Refactoring UI",
      date: "Returned on Sep 28, 2023"
    },
    {
      id: 3,
      title: "The Pragmatic Programmer",
      date: "Returned on Aug 15, 2023"
    }
  ];

  const quickActions = [
    { label: 'Search Books', icon: MdSearch },
    { label: 'Scan ISBN', icon: MdQrCodeScanner },
    { label: 'Loan History', icon: MdHistory },
    { label: 'My Wishlist', icon: MdFavoriteBorder }
  ];
  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora">

      {/* ================= MAIN CONTENT ================= */}
      <main className="page-container mx-auto">

        <div className="py-6 md:py-8 lg:py-10">

          {/* ================= WELCOME ================= */}
          <section className="mb-8 md:mb-10">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">

              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                  Welcome back, Alex.
                </h1>

                <p className="text-sm md:text-base text-slate-600">
                  You have 2 books due this week.
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
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-10">

            {stats.map((stat, idx) => (
              <div
                key={idx}
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
                    {stat.value}
                  </p>

                </div>

              </div>
            ))}

          </section>


          {/* ================= CURRENTLY BORROWED ================= */}
          <section className="mb-10">

            <h2 className="text-xl font-bold text-slate-800 mb-5 md:mb-6">
              Currently Borrowed
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">

              {currentlyReading.map((book) => (

                <div
                  key={book.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 flex flex-col justify-between h-full hover:bg-indigo-50/30 transition-colors group"
                >

                  {/* Book information */}
                  <div>

                    <div className="flex items-start mb-5">

                      {/* Cover */}
                      <div className="w-16 h-24 bg-slate-100 rounded overflow-hidden shrink-0 mr-4">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">

                        <h3 className="text-base font-semibold text-slate-900 leading-6 line-clamp-2 mb-1 group-hover:text-primary-container transition-colors">
                          {book.title}
                        </h3>

                        <p className="text-sm text-slate-500 truncate">
                          {book.author}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Bottom */}
                  <div className="mt-auto border-t border-slate-100 pt-4 flex justify-between items-center gap-2">

                    <span
                      className={`px-2 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${book.type === 'overdue'
                        ? 'bg-red-100 text-red-800'
                        : book.type === 'upcoming'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {book.due}
                    </span>

                    <button className="text-primary-container text-sm font-semibold hover:underline shrink-0">
                      Renew
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </section>


          {/* ================= BORROWING HISTORY ================= */}
          <section className="mb-10">

            <h2 className="text-xl font-bold text-slate-800 mb-5 md:mb-6">
              Borrowing History
            </h2>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">

              <div className="divide-y divide-slate-100">

                {borrowingHistory.map((item) => (

                  <div
                    key={item.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-indigo-50/30 transition-colors"
                  >

                    <div className="flex items-center gap-3 min-w-0">

                      <MdBook
                        size={30}
                        className="text-slate-300 shrink-0"
                      />

                      <div className="min-w-0">

                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {item.title}
                        </p>

                        <p className="text-xs md:text-sm text-slate-500 truncate">
                          {item.date}
                        </p>

                      </div>

                    </div>

                    <span className="hidden md:inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] font-medium shrink-0">
                      Returned
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

              {quickActions.map((action, i) => {

                const Icon = action.icon;

                return (
                  <button
                    key={i}
                    className="min-w-0 flex flex-col items-center justify-center p-4 md:p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                  >

                    <Icon
                      className="text-primary-container mb-2 md:mb-3 group-hover:scale-110 transition-transform"
                      size={26}
                    />

                    <span className="text-[9px] sm:text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-wide text-center leading-tight">
                      {action.label}
                    </span>

                  </button>
                );

              })}

            </div>

          </section>

        </div>

      </main>


      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">

        <div className="flex justify-around items-center h-16">

          <Link
            to="/dashboard"
            className="flex flex-col items-center justify-center w-full h-full text-primary-container"
          >
            <MdDashboard
              size={23}
              className="mb-1"
            />

            <span className="text-[10px] font-black uppercase tracking-tighter">
              Dashboard
            </span>
          </Link>


          <Link
            to="/mybooks"
            className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-primary-container transition-colors"
          >
            <MdLibraryBooks
              size={23}
              className="mb-1"
            />

            <span className="text-[10px] font-bold uppercase tracking-tighter">
              My Books
            </span>
          </Link>


          <Link
            to="/profile"
            className="flex flex-col items-center justify-center w-full h-full text-slate-400 hover:text-primary-container transition-colors"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              className="w-6 h-6 rounded-full mb-1 grayscale opacity-70"
              alt="Profile"
            />

            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Profile
            </span>
          </Link>

        </div>

      </nav>

    </div>
  );
};

export default UserDashboard;