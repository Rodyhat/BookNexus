import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCheckCircle, MdSearch, MdDashboard } from 'react-icons/md';
import Button from '../components/Button';

/**
 * BorrowingSuccess Component
 * 
 * Displayed after a user successfully submits a borrowing request.
 */
const BorrowingSuccess = ({ referenceId = "#BNX-4829-TL" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-indigo-50 shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
          <MdCheckCircle size={48} />
        </div>

        <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-3">
          Request Submitted
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          Your borrowing request has been received. A librarian will review and process your request shortly.
        </p>

        <div className="space-y-3">
          <Button 
            variant="primary" 
            className="w-full shadow-lg shadow-indigo-100"
            onClick={() => navigate('/user/dashboard')}
          >
            <MdDashboard className="mr-2" /> Back to Dashboard
          </Button>
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={() => navigate('/catalog')}
          >
            <MdSearch className="mr-2" /> Browse More Books
          </Button>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-50">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Reference: {referenceId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BorrowingSuccess;
