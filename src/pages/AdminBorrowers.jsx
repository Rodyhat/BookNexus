import React, { useState } from 'react';
import {
    MdSearch,
    MdFilterList,
    MdAdd,
    MdMoreVert,
    MdCheckCircle,
    MdErrorOutline,
    MdAccessTime,
    MdClose,
    MdChevronLeft,
    MdChevronRight
} from 'react-icons/md';
import Button from '../components/Button';

const AdminBorrowers = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const activeBorrows = [
        {
            id: 'BR-2941',
            borrowerName: 'Eleanor Vance',
            bookTitle: 'The Haunting of Hill House',
            author: 'Shirley Jackson',
            dateOut: 'Oct 12',
            dueDate: 'Oct 26',
            status: 'Active',
            statusColor: 'text-green-600 bg-green-50'
        },
        {
            id: 'BR-4242',
            borrowerName: 'Arthur Dent',
            bookTitle: "Hitchhiker's Guide",
            author: 'Douglas Adams',
            dateOut: 'Sep 20',
            dueDate: 'Oct 04',
            status: 'Overdue',
            statusColor: 'text-red-600 bg-red-50'
        },
        {
            id: 'BR-1011',
            borrowerName: 'Hiro Protagonist',
            bookTitle: 'Snow Crash',
            author: 'Neal Stephenson',
            dateOut: 'Oct 18',
            dueDate: 'Nov 01',
            status: 'Active',
            statusColor: 'text-green-600 bg-green-50'
        },
        {
            id: 'BR-7734',
            borrowerName: 'Clarice Starling',
            bookTitle: 'Silence of the Lambs',
            author: 'Thomas Harris',
            dateOut: 'Oct 22',
            dueDate: 'Nov 05',
            status: 'Reserved',
            statusColor: 'text-amber-600 bg-amber-50'
        }
    ];

    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora pb-12">

            {/* Page Header */}
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
                    Borrower Records
                </h1>

                <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
                    Manage active loans and track borrower history.
                </p>
            </div>

            {/* Global Actions & Search */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">

                {/* Search */}
                <div className="relative flex-1 min-w-0">
                    <MdSearch
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                    />

                    <input
                        type="text"
                        placeholder="Search borrower or book ID..."
                        className="w-full bg-white border border-indigo-50 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* New Record */}
                <Button
                    variant="primary"
                    className="w-full sm:w-auto justify-center shadow-lg shadow-indigo-100 whitespace-nowrap"
                >
                    <MdAdd className="mr-2 text-xl" />
                    New Record
                </Button>
            </div>

            {/* Notification / Status Banner */}
            <div className="bg-white border-l-4 border-green-500 rounded-xl p-4 sm:p-5 mb-6 sm:mb-8 shadow-sm flex items-start gap-3 sm:gap-4 relative">

                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                    <MdCheckCircle size={21} />
                </div>

                <div className="flex-1 min-w-0 pr-4">
                    <h4 className="font-bold text-slate-800 text-sm">
                        Recent Returns Processed
                    </h4>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        3 items were marked as returned in the last hour.
                        Inventory has been updated automatically.
                    </p>
                </div>

                <button className="absolute top-4 right-3 sm:right-4 text-slate-300 hover:text-slate-500 transition-colors">
                    <MdClose size={20} />
                </button>
            </div>

            {/* Active Borrows Table Section */}
            <div className="bg-white rounded-2xl border border-indigo-50 shadow-sm overflow-hidden mb-8 sm:mb-10">

                {/* Table Header */}
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-indigo-50 flex flex-col xs:flex-row sm:flex-row items-start sm:items-center justify-between gap-3">
                    <h2 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                        Active Borrows
                    </h2>

                    <button className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                        Filter
                        <MdFilterList size={18} />
                    </button>
                </div>

                {/* Responsive Table */}
                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left">

                        <thead className="bg-slate-50/50 border-b border-indigo-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                    Borrower Name
                                </th>

                                <th className="px-4 sm:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                    Book Title
                                </th>

                                <th className="px-4 sm:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                    Dates
                                </th>

                                <th className="px-4 sm:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                    Status
                                </th>

                                <th className="px-4 sm:px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {activeBorrows.map((loan) => (
                                <tr
                                    key={loan.id}
                                    className="hover:bg-slate-50/30 transition-colors group"
                                >
                                    {/* Borrower */}
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 min-w-[180px]">
                                        <div className="font-bold text-slate-800 text-sm whitespace-nowrap">
                                            {loan.borrowerName}
                                        </div>

                                        <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wide uppercase">
                                            ID: {loan.id}
                                        </div>
                                    </td>

                                    {/* Book */}
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 min-w-[220px]">
                                        <div className="font-bold text-slate-800 text-sm truncate max-w-[230px]">
                                            {loan.bookTitle}
                                        </div>

                                        <div className="text-xs text-slate-500 mt-0.5">
                                            {loan.author}
                                        </div>
                                    </td>

                                    {/* Dates */}
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 min-w-[150px]">
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-slate-400 font-medium">
                                                Out:
                                            </span>

                                            <span className="text-slate-700 font-bold">
                                                {loan.dateOut}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs mt-1">
                                            <span className="text-slate-400 font-medium">
                                                Due:
                                            </span>

                                            <span
                                                className={`font-black ${
                                                    loan.status === 'Overdue'
                                                        ? 'text-red-600'
                                                        : 'text-slate-800'
                                                }`}
                                            >
                                                {loan.dueDate}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                                        <span
                                            className={`inline-flex text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider whitespace-nowrap ${loan.statusColor}`}
                                        >
                                            {loan.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 sm:px-6 py-4 sm:py-5 text-right">
                                        <button className="p-2 text-slate-300 group-hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                            <MdMoreVert size={22} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Scroll Hint */}
                <div className="sm:hidden px-4 py-2 bg-slate-50/50 border-t border-indigo-50">
                    <p className="text-[9px] text-slate-400 font-bold text-center uppercase tracking-wider">
                        Swipe horizontally to view table
                    </p>
                </div>

                {/* Pagination Footer */}
                <div className="px-4 sm:px-6 py-4 bg-slate-50/30 border-t border-indigo-50 flex flex-col sm:flex-row items-center justify-between gap-3">

                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-bold text-center sm:text-left">
                        Showing 4 of 142 records
                    </p>

                    <div className="flex gap-2">
                        <button className="p-2 border border-indigo-50 rounded-lg bg-white text-slate-300 cursor-not-allowed">
                            <MdChevronLeft size={20} />
                        </button>

                        <button className="p-2 border border-indigo-50 rounded-lg bg-white text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <MdChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* System Overview */}
            <h3 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight mb-4 sm:mb-5">
                System Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">

                {/* Total Active */}
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-indigo-50 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MdAccessTime size={80} />
                    </div>

                    <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-2">
                        Total Active
                    </p>

                    <p className="text-3xl sm:text-4xl font-black text-indigo-600">
                        142
                    </p>

                    <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-3/4"></div>
                    </div>
                </div>

                {/* Overdue */}
                <div className="bg-red-50/50 p-5 sm:p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <MdErrorOutline size={80} />
                    </div>

                    <p className="text-[10px] font-black tracking-widest uppercase mb-2 text-red-500">
                        Overdue
                    </p>

                    <p className="text-3xl sm:text-4xl font-black text-red-600">
                        12
                    </p>

                    <p className="text-[10px] font-bold text-red-400 mt-4 uppercase">
                        Attention Required
                    </p>
                </div>

                {/* Audit Complete */}
                <div className="bg-slate-900 md:col-span-2 lg:col-span-1 p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[160px]">

                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800')] bg-cover bg-center opacity-20"></div>

                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-3">
                            <MdCheckCircle size={24} />
                        </div>

                        <h4 className="text-white font-black text-base sm:text-lg tracking-tight">
                            Audit Complete
                        </h4>

                        <p className="text-slate-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">
                            Last checked today at 08:00 AM
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminBorrowers;