import React, { useState, useContext } from 'react';
import {
    MdSearch,
    MdAdd,
    MdEdit,
    MdDeleteOutline,
    MdChevronLeft,
    MdChevronRight
} from 'react-icons/md';
import { BookContext } from '../context/myContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const AdminBooks = () => {
    const { books, search, changeSearch } = useContext(BookContext);
    const navigate = useNavigate();
    return (
        <div className="min-h-screen font-sora">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Book Management</h1>
                    <p className="text-slate-500 text-sm font-medium">Add, edit, and oversee your library inventory.</p>
                </div>
                <Button variant="primary" className="shadow-md shadow-indigo-100" onClick={() => navigate('/admin/add_edit_books')}>
                    <MdAdd className="mr-2 text-xl" /> Add New Book
                </Button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm mb-6">
                <div className="relative">
                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Search inventory..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm outline-none focus:border-primary-container transition-all"
                        value={search}
                        onChange={(e) => changeSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Inventory Table */}
            <div className="bg-white rounded-xl border border-indigo-50 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Book Title</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest hidden md:table-cell">Author</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {books.map((book) => (
                            <tr key={book.key} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-bold text-slate-800 text-sm truncate block max-w-50">{book.title}</span>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="text-xs text-slate-500 font-medium">{book.author_name?.[0] || 'Unknown'}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-1 rounded-full uppercase">
                                        Available
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-slate-400 hover:text-primary-container transition-colors"><MdEdit size={18} /></button>
                                        <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><MdDeleteOutline size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBooks;