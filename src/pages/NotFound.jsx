import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdHome } from 'react-icons/md';
import Button from '../components/Button';

/**
 * NotFound Component
 * 
 * Themed 404 Error page for BookNexus.
 */
const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <div className="relative inline-block mb-12">
                    <div className="text-[120px] font-black text-indigo-50 leading-none">404</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-primary-container">
                            <MdSearch size={48} />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-4">
                    Page Not Found
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-80 mx-auto">
                    The book or page you are looking for has been moved or archived. Please verify the link or search our catalog.
                </p>

                <div className="flex flex-col gap-3 max-w-60 mx-auto">
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => navigate('/')}
                    >
                        <MdHome className="mr-2 text-xl" /> Return Home
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
