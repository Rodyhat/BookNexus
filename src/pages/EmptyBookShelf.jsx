import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLibraryBooks, MdSearch } from 'react-icons/md';
import Button from '../components/Button';

/**
 * EmptyBookshelf Component
 * 
 * Used for the "My Books" section when a user has no active loans.
 */
const EmptyBookshelf = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora flex flex-col items-center justify-center px-6 pb-24 text-center">
      <div className="w-48 h-48 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-200 mb-8">
        <MdLibraryBooks size={80} className="opacity-40" />
      </div>

      <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-3">
        No Active Loans
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed max-w-sidebar-width mb-8 mx-auto">
        Your bookshelf is currently empty. Explore our extensive catalog to discover new academic resources.
      </p>

      <Button 
        variant="primary" 
        className="shadow-lg shadow-indigo-100"
        onClick={() => navigate('/catalog')}
      >
        <MdSearch className="mr-2 text-xl" /> Explore Catalog
      </Button>
    </div>
  );
};

export default EmptyBookshelf;
