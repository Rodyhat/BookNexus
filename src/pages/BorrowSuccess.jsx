import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MdCheckCircle,
  MdDashboard,
  MdSearch
} from 'react-icons/md';
import Button from '../components/Button';

/**
 * BorrowingSuccess Component
 * 
 * High-fidelity feedback screen after successful borrowing request.
 */
const BorrowingSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const referenceId = location.state?.referenceId || "#BNX-4829-TL";

  return (
    <div className="min-h-screen bg-[#F9F9FF] font-sora flex items-center justify-center p-6">
      <div className=" w-full bg-white rounded-3xl border border-indigo-50 shadow-xl p-8 md:p-12 text-center relative overflow-hidden">

        {/* Success Icon Animation Placeholder */}
        <div className="relative z-10 w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8 shadow-inner">
          <MdCheckCircle size={56} />
        </div>

        {/* Messaging */}
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-4">
            Request Submitted
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-sidebar-width mx-auto font-medium">
            Your borrowing request has been received. A librarian will review and process your request shortly.
          </p>
        </div>

        {/* Actions */}
        <div className="relative z-10 space-y-4">
          <Button
            variant="primary"
            className="w-full py-4 shadow-xl shadow-indigo-100 text-sm"
            onClick={() => navigate('/user/dashboard')}
          >
            <MdDashboard className="mr-2" size={18} /> Back to Dashboard
          </Button>
          <Button
            variant="secondary"
            className="w-full py-4 text-sm"
            onClick={() => navigate('/trendinglist')}
          >
            <MdSearch className="mr-2" size={18} /> Browse More Books
          </Button>
        </div>

        {/* Reference Number */}
        <div className="relative z-10 mt-12 pt-8 border-t border-slate-50">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
            Reference ID: {referenceId}
          </p>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-50/30 rounded-full blur-3xl pointer-events-none" />
      </div>
    </div>
  );
};

export default BorrowingSuccess;