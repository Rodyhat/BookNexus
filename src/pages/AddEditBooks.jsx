import React, { useState, useContext } from 'react';
import {
    MdClose,
    MdCloudUpload,
    MdSave,
    MdOutlineLibraryBooks
} from 'react-icons/md';
import { BookContext } from '../context/myContext';
import Button from '../components/Button';
import AdminSidebar from '../components/AdminSidebar';

// usereducer
const initialBookForm = {
    title: '',
    author: '',
    categories: '',
    Isbn: "",
    publisher: "",
    totalCopies: '',
    summary: '',
    bookImage: ""
}

const bookFormReducer = (state, action) => {
    if (action.type === 'UPDATE_FIELD') {
        return { ...state, [action.field]: action.value }
    }
    else if (action.type === 'RESET') {
        return initialBookForm;
    }
    else {
        return state;
    }
}


const AddEditBook = ({ bookToEdit, onClose }) => {
    const { addBook, updateBook } = useContext(BookContext);
    const isEditMode = !!bookToEdit;

    const [formData, setFormData] = useState({
        key: bookToEdit?.key || '',
        title: bookToEdit?.title || '',
        author: bookToEdit?.author || '',
        genre: bookToEdit?.genre || '',
        isbn: bookToEdit?.isbn || '',
        publisher: bookToEdit?.publisher || '',
        pages: bookToEdit?.pages || '',
        language: bookToEdit?.language || 'English',
        description: bookToEdit?.description || '',
        totalCopies: bookToEdit?.totalCopies || 1
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditMode) {
                await updateBook(formData);
            } else {
                await addBook(formData);
            }
            if (onClose) onClose();
        } catch (error) {
            console.error('Failed to save book:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // use reducer
    const [allAddedBooks, setAllAddedBooks] = useReducer(reducer, addBooks)


    const inputClasses = "w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm outline-none focus:border-[#3730A3] focus:ring-1 focus:ring-[#3730A3] transition-all font-medium text-slate-700 placeholder:text-slate-400";
    const labelClasses = "text-[11px] font-black  tracking-widest uppercase mb-1.5 block";

    return (
        <div className=" bg-[#F9F9FF] font-sora">
            <div className="bg-white rounded-2xl border border-indigo-50  overflow-hidden">

                <div className="px-6 py-6 border-b border-indigo-50 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-primary-container">
                            <MdOutlineLibraryBooks size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-slate-800 tracking-tight">
                                {isEditMode ? 'Edit Book Details' : 'Add New Book'}
                            </h1>
                            <p className="text-xs text-slate-500 font-medium">Enter the details to update the library catalog.</p>
                        </div>
                    </div>

                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className={labelClasses}>Book Title *</label>
                            <input type="text" name="title" required value={formData.title} onChange={handleChange} placeholder="e.g. The Design of Everyday Things" className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Author *</label>
                            <input type="text" name="author" required value={formData.author} onChange={handleChange} placeholder="e.g. Don Norman" className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Genre / Category</label>
                            <select name="genre" value={formData.genre} onChange={handleChange} className={`${inputClasses} appearance bg-size[20px] bg-position[right_12px_center] bg-no-repeat`}>
                                <option value="">Select Genre...</option>
                                <option value="Design">Design</option>
                                <option value="Technology">Technology</option>
                                <option value="Science">Science</option>
                                <option value="Fiction">Fiction</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-50">
                        <div>
                            <label className={labelClasses}>ISBN</label>
                            <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} placeholder="978-..." className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Publisher</label>
                            <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} placeholder="e.g. Basic Books" className={inputClasses} />
                        </div>
                        <div>
                            <label className={labelClasses}>Total Copies</label>
                            <input type="number" name="totalCopies" min="1" value={formData.totalCopies} onChange={handleChange} className={inputClasses} />
                        </div>
                    </div>

                    <div className="space-y-6 pt-4 border-t border-slate-50">
                        <div>
                            <label className={labelClasses}>Description / Summary</label>
                            <textarea name="description" rows="4" value={formData.description} onChange={handleChange} placeholder="Provide a brief overview..." className={`${inputClasses} resize-none`} />
                        </div>
                        <div>
                            <label className={labelClasses}>Book Cover Image</label>
                            <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer group">
                                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 group-hover:text-primary-container transition-colors mb-3">
                                    <MdCloudUpload size={24} />
                                </div>
                                <p className="text-sm font-bold text-slate-700">Click to upload or drag and drop</p>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">SVG, PNG, JPG or GIF</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-indigo-50">
                        <button type="button" onClick={onClose} className="px-6 py-2.5 text-sm font-bold hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all">Cancel</button>
                        <Button type="submit" variant="primary" isLoading={isLoading} className="shadow-lg shadow-indigo-100 min-w-35">
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