import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { FiX } from "react-icons/fi";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { AdminContext } from "../context/myContext";

const AdminLayout = () => {
    const { sidebarOpen, handleSidebar } = useContext(AdminContext);

    return (
        <div className="min-h-screen w-full bg-gray-50">

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={handleSidebar}
                    />

                    <div className="fixed left-0 top-0 z-50 lg:hidden">
                        <AdminSidebar />

                        <button
                            onClick={handleSidebar}
                            className="absolute right-3 top-3"
                        >
                            <FiX size={24} />
                        </button>
                    </div>
                </>
            )}

            {/* Desktop */}
            <div className="hidden lg:flex">

                <AdminSidebar />

                <div className="min-w-0 flex-1">
                    <AdminHeader />

                    <main className="p-6">
                        <Outlet />
                    </main>
                </div>

            </div>

            {/* Mobile / Tablet */}
            <div className="lg:hidden">

                <AdminHeader />

                <main className="p-4">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;