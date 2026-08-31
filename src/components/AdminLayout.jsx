import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { AdminContext } from '../context/myContext';

const AdminLayout = () => {
    const { sidebarOpen, handleSidebar } = useContext(AdminContext);

    return (
        <div className="h-screen flex bg-[#F9F9FF] font-sora overflow-hidden">

            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity duration-300 ${
                    sidebarOpen
                        ? 'opacity-100'
                        : 'opacity-0 pointer-events-none'
                }`}
                onClick={handleSidebar}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-indigo-50
                    transform transition-transform duration-300 ease-in-out
                    ${
                        sidebarOpen
                            ? 'translate-x-0'
                            : '-translate-x-full'
                    }
                    lg:translate-x-0`}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleSidebar}
                    className="absolute right-4 top-4 z-70 flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                    aria-label="Close sidebar"
                >
                    <FiX size={24} />
                </button>

                <AdminSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex min-w-0 flex-1 flex-col h-screen overflow-hidden lg:ml-64">

                {/* Header */}
                <AdminHeader />

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="mx-auto max-w-6xl">
                        <Outlet />
                    </div>
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;