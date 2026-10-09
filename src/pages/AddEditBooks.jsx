import React, { useContext, useEffect, useReducer, useState } from 'react';
import { MdCloudUpload, MdSave, MdOutlineLibraryBooks } from 'react-icons/md';
import { BookContext } from '../context/myContext';
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';
// Initial Form State
const initialBookForm = {
    id: null,
    key: '',
    title: '',
    author_name: '',
    genre: '',
    isbn: '',
    publisher: '',
    totalCopies: 1,
    language: 'English',
    description: '',
    bookImage: '',
    ebookPath: ''
};

// Form Reducer
const bookFormReducer = (state, action) => {
    if (action.type === 'UPDATE_FIELD') {
        return { ...state, [action.field]: action.value }
    } else if (action.type === 'SET_FORM') {
        return { ...state, ...action.payload }
    }
    else if (action.type === 'RESET') {
        return initialBookForm;
    } else {
        return state;
    }
};

// Component
const AddEditBook = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { addBook, updateBook } = useContext(BookContext);
    // Detect if we are in Edit Mode based on data passed via navigate() state
    const bookToEdit = location.state?.bookToEdit;
    const isEditMode = !!bookToEdit;
    const [booksForm, dispatchBookForm] = useReducer(bookFormReducer, initialBookForm);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedEbook, setSelectedEbook] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    // Populate form when editing or reset when adding
    useEffect(() => {
        if (bookToEdit) {
            dispatchBookForm({
                type: 'SET_FORM',
                payload: {
                    id: bookToEdit.id || null,
                    key: bookToEdit.key || '',
                    title: bookToEdit.title || '',
                    author_name: bookToEdit.author || '',
                    genre: bookToEdit.genre || '',
                    isbn: bookToEdit.isbn || '',
                    publisher: bookToEdit.publisher || '',
                    totalCopies: bookToEdit.total_copies || 1,
                    language: bookToEdit.language || 'English',
                    description: bookToEdit.description || '',
                    bookImage: bookToEdit.cover_url || '',
                    ebookPath: bookToEdit.ebook_path || '',
                }
            });
            setPreviewUrl(bookToEdit.cover_url || '');
        } else {
            dispatchBookForm({ type: 'RESET' });
            setPreviewUrl('');
        }
    }, [bookToEdit]);
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (!file) return;
        // Allowed file types
        const allowedTypes = [
            'image/png',
            'image/jpeg',
            'image/gif',
            'image/svg+xml'
        ];
        // Maximum file size: 2 MB
        const maxSize = 2 * 1024 * 1024;
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            toast.error('Please select a PNG, JPG, GIF, or SVG image.');
            return;
        }
        // Check file size
        if (file.size > maxSize) {
            toast.error('Image is too large. Maximum size is 2 MB.');
            return;
        }
        // File is valid
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };
    // Handle Input
    const handleBookInputChange = (e) => {
        const { name, value } = e.target;
        dispatchBookForm({
            type: 'UPDATE_FIELD',
            field: name,
            value
        });
    };
    const uploadBookCover = async () => {
        // No new image selected
        if (!selectedFile) {
            return booksForm.bookImage;
        }

        // Get the file extension
        const fileExtension = selectedFile.name.split('.').pop();

        // Create a unique file name
        const fileName = `${Date.now()}.${fileExtension}`;

        // File location inside the bucket
        const filePath = `covers/${fileName}`;

        // Upload the file
        const { error: uploadError } = await supabase.storage
            .from('book-covers')
            .upload(filePath, selectedFile);

        if (uploadError) {
            throw uploadError;
        }

        // Get the public URL
        const { data } = supabase.storage
            .from('book-covers')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };
    const uploadEbook = async () => {
        // Keep the existing ebook when editing without replacing it.
        if (!selectedEbook) {
            return booksForm.ebookPath || null;
        }
        const fileName = `${Date.now()}.pdf`;
        const filePath = `books/${fileName}`;
        const { error } = await supabase.storage
            .from('book-files')
            .upload(filePath, selectedEbook, {
                contentType: 'application/pdf',
                upsert: false
            });
        if (error) {
            throw error;
        }
        // Save the storage path, not a public URL.
        return filePath;
    };
    // Submit Form
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const bookImage = await uploadBookCover();
            const ebookPath = await uploadEbook();

            const bookData = {
                ...booksForm,
                bookImage,
                ebookPath
            };

            if (isEditMode) {
                await updateBook(bookData);
                toast.success('Book updated successfully!');
            } else {
                await addBook(bookData);
                toast.success('Book added successfully!');
            }

            navigate('/admin/books');

            if (onClose) {
                onClose();
            }
        } catch (error) {
            console.error('Failed to save book:', error);
            toast.error(error.message || 'Failed to save book.');
        } finally {
            setIsLoading(false);
        }
    };
    const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#3730A3] focus:ring-1 focus:ring-[#3730A3] transition-all font-medium text-slate-700 placeholder:text-slate-400";
    const labelClasses = "text-[11px] font-black tracking-widest uppercase mb-1.5 block text-slate-400";
    return (
        <div className="bg-[#F9F9FF] font-sora min-h-screen p-4 sm:p-8">
            <div className=" bg-white rounded-2xl border border-indigo-50 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="px-4 sm:px-6 py-5 sm:py-6 border-b border-indigo-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-primary-container shrink-0">
                            <MdOutlineLibraryBooks size={24} />
                        </div>
                        <div className="min-w-0">
                            <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight truncate">
                                {isEditMode ? 'Edit Book Details' : 'Add New Book'}
                            </h1>
                            <p className="text-xs text-slate-500 font-medium mt-1">
                                {isEditMode ? 'Modify the existing catalog entry.' : 'Enter the details to update the library catalog.'}
                            </p>
                        </div>
                    </div>
                </div>
                {/* Form */}
                <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        <div className="md:col-span-2">
                            <label className={labelClasses}>Book Title *</label>
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

                        <div>
                            <label className={labelClasses}>Author *</label>
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

                        <div>
                            <label className={labelClasses}>Genre / Category</label>
                            <select
                                name="genre"
                                value={booksForm.genre}
                                onChange={handleBookInputChange}
                                className={`${inputClasses} appearance bg-size-[20px] bg-position-[right_12px_center] bg-no-repeat`}
                            >
                                <option value="">Select Genre...</option>
                                <option value="Design">Design</option>
                                <option value="Technology">Technology</option>
                                <option value="Science">Science</option>
                                <option value="Fiction">Fiction</option>
                            </select>
                        </div>
                    </div>

                    {/* Book Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 pt-5 border-t border-slate-50">
                        <div>
                            <label className={labelClasses}>ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                value={booksForm.isbn}
                                onChange={handleBookInputChange}
                                placeholder="978-..."
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Publisher</label>
                            <input
                                type="text"
                                name="publisher"
                                value={booksForm.publisher}
                                onChange={handleBookInputChange}
                                placeholder="e.g. Basic Books"
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>Total Copies</label>
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
                            <label className={labelClasses}>Description / Summary</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={booksForm.description}
                                onChange={handleBookInputChange}
                                placeholder="Provide a brief overview..."
                                className={`${inputClasses} resize-none`}
                            />
                        </div>

                        <div>
                            <label className={labelClasses}>Book Cover Image</label>
                            {previewUrl && (
                                <div className="mb-4 flex justify-center">
                                    <img
                                        src={previewUrl}
                                        alt="Book cover preview"
                                        className="w-24 h-32 object-cover rounded-lg border border-slate-200 shadow-sm"
                                    />
                                </div>
                            )}
                            <label
                                htmlFor="book-cover"
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-xl p-6 sm:p-8 flex flex-col items-center justify-center transition-all cursor-pointer group ${isDragging
                                    ? 'border-primary-container bg-indigo-50 scale-[1.01]'
                                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                                    }`}
                            >
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary-container transition-colors mb-3">
                                    <MdCloudUpload size={24} />
                                </div>

                                <p className={`text-sm font-bold text-center ${isDragging ? 'text-primary-container]' : 'text-slate-700'
                                    }`}>
                                    {isDragging
                                        ? 'Drop cover here'
                                        : selectedFile
                                            ? selectedFile.name
                                            : 'Click to upload or drag and drop'}
                                </p>

                                <p className="text-[11px] text-slate-400 font-medium mt-1">
                                    SVG, PNG, JPG or GIF
                                </p>

                                <input
                                    id="book-cover"
                                    type="file"
                                    accept="image/png,image/jpeg,image/gif,image/svg+xml"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];

                                        if (!file) return;

                                        // Allowed file types
                                        const allowedTypes = [
                                            'image/png',
                                            'image/jpeg',
                                            'image/gif',
                                            'image/svg+xml'
                                        ];

                                        // Maximum file size: 2 MB
                                        const maxSize = 2 * 1024 * 1024;

                                        // Check file type
                                        if (!allowedTypes.includes(file.type)) {
                                            toast.error('Please select a PNG, JPG, GIF, or SVG image.');
                                            e.target.value = '';
                                            return;
                                        }

                                        // Check file size
                                        if (file.size > maxSize) {
                                            toast.error('Image is too large. Maximum size is 2 MB.');
                                            e.target.value = '';
                                            return;
                                        }

                                        // File is valid
                                        setSelectedFile(file);
                                        setPreviewUrl(URL.createObjectURL(file));
                                    }}
                                />
                            </label>
                        </div>
                        <div>
                            <label className={labelClasses}>
                                Ebook / PDF File
                            </label>

                            <label
                                htmlFor="ebook-file"
                                className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer border-slate-200 bg-slate-50/50 hover:bg-slate-50"
                            >
                                <MdCloudUpload size={28} className="text-slate-400 mb-2" />

                                <p className="text-sm font-bold text-center text-slate-700">
                                    {selectedEbook
                                        ? selectedEbook.name
                                        : 'Click to upload ebook'}
                                </p>

                                <p className="text-xs text-slate-400 mt-1">
                                    PDF only · Maximum 20 MB
                                </p>
                                <input
                                    id="ebook-file"
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        if (
                                            file.type !== 'application/pdf' &&
                                            !file.name.toLowerCase().endsWith('.pdf')
                                        ) {
                                            toast.error('Please select a PDF file.');
                                            e.target.value = '';
                                            return;
                                        }

                                        if (file.size > 20 * 1024 * 1024) {
                                            toast.error('PDF must be no larger than 20 MB.');
                                            e.target.value = '';
                                            return;
                                        }

                                        setSelectedEbook(file);
                                    }}
                                />
                            </label>

                            {booksForm.ebookPath && !selectedEbook && (
                                <p className="text-xs text-green-600 mt-2">
                                    An ebook is already uploaded for this book.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-5 border-t border-indigo-50">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/books')}
                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                        >
                            Cancel
                        </button>
                        <Button
                            type="submit"
                            variant="primary"
                            isLoading={isLoading}
                            className="w-full sm:w-auto shadow-lg shadow-indigo-100 min-w-35"
                        >
                            <MdSave className="mr-2 text-lg" />
                            {isEditMode ? 'Update Book' : 'Save Book'}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddEditBook;