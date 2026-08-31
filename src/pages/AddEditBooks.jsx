import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
    MdCloudUpload,
    MdSave,
    MdOutlineLibraryBooks
} from 'react-icons/md';
import { BookContext } from '../context/myContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

// -----------------------------
// Initial Form State
// -----------------------------

const initialBookForm = {
    key: '',
    title: '',
    author_name: '',
    genre: '',
    isbn: '',
    publisher: '',
    totalCopies: 1,
    language: 'English',
    description: '',
    bookImage: ''
};

// -----------------------------
// Form Reducer
// -----------------------------

const bookFormReducer = (state, action) => {
    if (action.type === 'UPDATE_FIELD') {
        return {
            ...state,
            [action.field]: action.value
        };
    }

    if (action.type === 'SET_FORM') {
        return {
            ...state,
            ...action.payload
        };
    }

    if (action.type === 'RESET') {
        return initialBookForm;
    }

    return state;
};

// -----------------------------
// Component
// -----------------------------

const AddEditBook = ({ bookToEdit, onClose }) => {
    const navigate = useNavigate();
    const { addBook, updateBook } = useContext(BookContext);

    const isEditMode = !!bookToEdit;

    const [booksForm, dispatchBookForm] = useReducer(
        bookFormReducer,
        initialBookForm
    );

    const [isLoading, setIsLoading] = useState(false);

    // -----------------------------
    // Populate form when editing
    // -----------------------------

    useEffect(() => {
        if (bookToEdit) {
            dispatchBookForm({
                type: 'SET_FORM',
                payload: {
                    key: bookToEdit.key || '',
                    title: bookToEdit.title || '',
                    author_name: bookToEdit.author_name || '',
                    genre: bookToEdit.genre || '',
                    isbn: bookToEdit.isbn || '',
                    publisher: bookToEdit.publisher || '',
                    totalCopies: bookToEdit.totalCopies || 1,
                    language: bookToEdit.language || 'English',
                    description: bookToEdit.description || '',
                    bookImage: bookToEdit.bookImage || ''
                }
            });
        } else {
            dispatchBookForm({
                type: 'RESET'
            });
        }
    }, [bookToEdit]);

    // -----------------------------
    // Handle Input
    // -----------------------------

    const handleBookInputChange = (e) => {
        const { name, value } = e.target;

        dispatchBookForm({
            type: 'UPDATE_FIELD',
            field: name,
            value
        });
    };

    // -----------------------------
    // Reset Form
    // -----------------------------

    const resetBookForm = () => {
        dispatchBookForm({
            type: 'RESET'
        });
    };

    // -----------------------------
    // Submit Form
    // -----------------------------

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            if (isEditMode) {
                await updateBook(booksForm);
            } else {
                await addBook(booksForm);
            }

            resetBookForm();

            if (onClose) {
                onClose();
            }

        } catch (error) {
            console.error('Failed to save book:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses =
        "w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#3730A3] focus:ring-1 focus:ring-[#3730A3] transition-all font-medium text-slate-700 placeholder:text-slate-400";

    const labelClasses =
        "text-[11px] font-black tracking-widest uppercase mb-1.5 block";

    return (
        <div className="bg-[#F9F9FF] font-sora">
            <div className="bg-white rounded-2xl border border-indigo-50 overflow-hidden">

                {/* Header */}
                <div className="px-4 sm:px-6 py-5 sm:py-6 border-b border-indigo-50 flex items-center justify-between bg-white sticky top-0 z-10">

                    <div className="flex items-center gap-3 min-w-0">

                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-primary-container shrink-0">
                            <MdOutlineLibraryBooks size={24} />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight truncate">
                                {isEditMode
                                    ? 'Edit Book Details'
                                    : 'Add New Book'}
                            </h1>

                            <p className="text-xs text-slate-500 font-medium mt-1">
                                Enter the details to update the library catalog.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleFormSubmit}
                    className="p-4 sm:p-6 space-y-6"
                >

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">

                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className={labelClasses}>
                                Book Title *
                            </label>

                            <input
                                type="text"
                                name="title"
                                required
                                value={booksForm.title}
                                onChange={handleBookInputChange}
                                placeholder="e.g. The Design of Everyday Things"
                                className={inputClasses}
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className={labelClasses}>
                                Author *
                            </label>

                            <input
                                type="text"
                                name="author_name"
                                required
                                value={booksForm.author_name}
                                onChange={handleBookInputChange}
                                placeholder="e.g. Don Norman"
                                className={inputClasses}
                            />
                        </div>

                        {/* Genre */}
                        <div>
                            <label className={labelClasses}>
                                Genre / Category
                            </label>

                            <select
                                name="genre"
                                value={booksForm.genre}
                                onChange={handleBookInputChange}
                                className={`${inputClasses} appearance-none`}
                            >
                                <option value="">
                                    Select Genre...
                                </option>

                                <option value="Design">
                                    Design
                                </option>

                                <option value="Technology">
                                    Technology
                                </option>

                                <option value="Science">
                                    Science
                                </option>

                                <option value="Fiction">
                                    Fiction
                                </option>
                            </select>
                        </div>

                    </div>

                    {/* Book Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 pt-5 border-t border-slate-50">

                        {/* ISBN */}
                        <div>
                            <label className={labelClasses}>
                                ISBN
                            </label>

                            <input
                                type="text"
                                name="isbn"
                                value={booksForm.isbn}
                                onChange={handleBookInputChange}
                                placeholder="978-..."
                                className={inputClasses}
                            />
                        </div>

                        {/* Publisher */}
                        <div>
                            <label className={labelClasses}>
                                Publisher
                            </label>

                            <input
                                type="text"
                                name="publisher"
                                value={booksForm.publisher}
                                onChange={handleBookInputChange}
                                placeholder="e.g. Basic Books"
                                className={inputClasses}
                            />
                        </div>

                        {/* Total Copies */}
                        <div>
                            <label className={labelClasses}>
                                Total Copies
                            </label>

                            <input
                                type="number"
                                name="totalCopies"
                                min="1"
                                value={booksForm.totalCopies}
                                onChange={handleBookInputChange}
                                className={inputClasses}
                            />
                        </div>

                    </div>

                    {/* Description */}
                    <div className="space-y-5 pt-5 border-t border-slate-50">

                        <div>
                            <label className={labelClasses}>
                                Description / Summary
                            </label>

                            <textarea
                                name="description"
                                rows="4"
                                value={booksForm.description}
                                onChange={handleBookInputChange}
                                placeholder="Provide a brief overview..."
                                className={`${inputClasses} resize-none`}
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className={labelClasses}>
                                Book Cover Image
                            </label>

                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">

                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary-container transition-colors mb-3">
                                    <MdCloudUpload size={24} />
                                </div>

                                <p className="text-sm font-bold text-slate-700 text-center">
                                    Click to upload or drag and drop
                                </p>

                                <p className="text-[11px] text-slate-400 font-medium mt-1">
                                    SVG, PNG, JPG or GIF
                                </p>

                            </div>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-5 border-t border-indigo-50">

                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                        >
                            Cancel
                        </button>

                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isLoading}
                            className="w-full sm:w-auto shadow-lg shadow-indigo-100" onClick={() => navigate('/admin/books')}
                        >
                            <MdSave className="mr-2 text-lg" />

                            {isEditMode
                                ? 'Update Book'
                                : 'Save Book'}
                        </Button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddEditBook;