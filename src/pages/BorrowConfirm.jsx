import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MdArrowBack,
    MdInfoOutline,
    MdCheckCircle
} from 'react-icons/md';
import Button from '../components/Button';

const BorrowConfirm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const bookTitle =
        location.state?.bookTitle || 'Neural Networks Architecture';

    const [loanPeriod, setLoanPeriod] = useState(14);

    // Calculate dates
    const today = new Date();
    const returnDate = new Date(today);
    returnDate.setDate(today.getDate() + loanPeriod);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const periods = [
        { days: 7, label: 'Short' },
        { days: 14, label: 'Standard' },
        { days: 21, label: 'Extended' }
    ];

    const handleConfirm = () => {
        navigate('/borrow-success', {
            state: {
                referenceId:
                    'BNX-' +
                    Math.floor(Math.random() * 9000 + 1000) +
                    '-TL'
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora">

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-indigo-50">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="min-h-16 flex items-center gap-2 sm:gap-4">
                        <button type="button" onClick={() => navigate(-1)} aria-label="Go back" className="shrink-0
                w-10 h-10
                -ml-1
                rounded-full
                flex items-center justify-center
                text-slate-500
                hover:bg-slate-50
                hover:text-slate-700
                transition-colors
              "
                        >
                            <MdArrowBack size={23} />
                        </button>

                        <h1 className="min-w-0 text-base sm:text-lg md:text-xl font-bold text-slate-800 truncate">
                            Confirm Borrow Request
                        </h1>

                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-5">

                {/* Page heading */}
                <div className="mb-6 sm:mb-8 lg:mb-3">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-800 tracking-tight ">
                        Borrow Book
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium mb-1">
                        Review your borrowing details before confirming.
                    </p>
                </div>

                {/* Responsive Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] gap-6 lg:gap-8 xl:gap-10 mx-auto">
                    {/* Book Preview */}
                    <section className=" bg-white rounded-2xl border border-indigo-50 shadow-sm p-5  sm:p-6 lg:p-5 text-center">
                        <div className="w-62.5 h-76.25 sm:w-41.25 sm:h-56.25 lg:w-45  lg:h-61.25 bg-slate-50 rounded-xl mx-auto mb-5 shadow-md border border-slate-100 flex items-center justify-center overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300"
                                alt="Book Cover"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <span className="inline-flex items-center justify-center bg-indigo-50 text-primary-contborder-primary-container text-[9px] sm:text-[10px] font-black uppercase  tracking-wider px-3 py-1.5 rounded-full mb-3">
                            Available for Loan
                        </span>

                        <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 tracking-tight leading-tight wrap-break-words">
                            {bookTitle}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium italic">
                            by Dr. Sarah Jenkins
                        </p>

                    </section>

                    {/* Borrowing Details */}
                    <div className="min-w-0">
                        {/* Loan Period */}
                        <section className="mb-6 sm:mb-7">
                            <div className="mb-3 sm:mb-4">
                                <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-wider">
                                    Select Loan Period
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400  mt-1">
                                    Choose how long you would like to keep this book.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                {periods.map((period) => {
                                    const isSelected = loanPeriod === period.days;

                                    return (
                                        <button
                                            key={period.days}
                                            type="button"
                                            onClick={() => setLoanPeriod(period.days)}
                                            className={`
                        min-w-0
                        min-h-19.5
                        sm:min-h-22.5
                        px-2
                        sm:px-3
                        py-3
                        rounded-xl
                        border-2
                        flex
                        flex-col
                        items-center
                        justify-center
                        transition-all
                        ${isSelected
                                                    ? 'border-primary-container bg-indigo-50 text-primary-contborder-primary-container shadow-sm'
                                                    : 'border-slate-100 bg-white text-slate-400 hover:border-indigo-100 hover:bg-indigo-50/30'
                                                }
                      `}
                                        >
                                            <span className="
                        text-sm
                        sm:text-lg
                        font-black
                        whitespace-nowrap
                      ">
                                                {period.days} Days
                                            </span>

                                            <span className="
                        text-[9px]
                        sm:text-[10px]
                        font-bold
                        uppercase
                        tracking-wide
                        mt-1
                      ">
                                                {period.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Request Summary */}
                        <section className="bg-white rounded-2xl border border-indigo-50 shadow-sm overflow-hidden mb-6
              sm:mb-7">

                            <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-50/60 border-b border-indigo-50">
                                <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase  tracking-widest">
                                    Request Summary
                                </h3>
                            </div>

                            <div className="p-4 sm:p-5 lg:p-6 space-y-4">
                                {/* Borrow Date */}
                                <div className="flex items-center justify-between gap-4 text-xs sm:text-sm">
                                    <span className="text-slate-500 font-medium">
                                        Borrow Date
                                    </span>
                                    <span className="text-slate-800 font-bold text-right whitespace-nowrap">
                                        {formatDate(today)}
                                    </span>
                                </div>

                                {/* Return Date */}
                                <div className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  text-xs
                  sm:text-sm
                ">
                                    <span className="text-slate-500 font-medium">
                                        Expected Return
                                    </span>

                                    <span className="
                    text-primary-contborder-primary-container
                    font-black
                    text-right
                    whitespace-nowrap
                  ">
                                        {formatDate(returnDate)}
                                    </span>
                                </div>

                                {/* Information */}
                                <div className="
                  pt-4
                  border-t border-slate-100
                  flex
                  gap-3
                  items-start
                ">
                                    <MdInfoOutline
                                        className="text-amber-500 shrink-0 mt-0.5"
                                        size={18}
                                    />

                                    <p className="
                    text-[10px]
                    sm:text-[11px]
                    text-slate-400
                    font-medium
                    leading-relaxed
                  ">
                                        A late fee of $0.50/day applies if the book is not
                                        returned or renewed by the due date.
                                    </p>
                                </div>

                            </div>
                        </section>
                        {/* Actions */}
                        <div className="flex flex-col-reverse sm:flex-row gap-3">
                            <Button
                                variant="ghost"
                                className="w-full sm:flex-1 min-h-[48px] text-slate-400"
                                onClick={() => navigate(-1)}>
                                Cancel
                            </Button>
                            <Button variant="primary" className="w-full sm:flex-2 min-h-[48px] shadow-lg shadow-indigo-100"
                                onClick={handleConfirm}>
                                <MdCheckCircle className="mr-2 shrink-0" size={20} />
                                <span>Confirm Request</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BorrowConfirm;