import { FaBook, FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="bg-surface-container-low py-10 w-64 ps-7 min-h-screen flex flex-col shrink-0 fixed top- left-0 h-screen z-50">
            <div className="shrink-0 text-primary-container font-heading font-bold text-headline-sm">
                ADMIN PANEL
            </div>
            <nav className="mt-6 flex flex-1 flex-col">
                {/* Main navigation */}
                <ul className="flex flex-col gap-2">
                    {/* Dashboard */}
                    <NavLink
                        to="/admin/dashboard"
                        className="relative block"
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <>
                                        <div className="absolute inset-0 rounded bg-surface-container" />

                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container" />
                                    </>
                                )}

                                <div
                                    className={`relative flex items-center gap-4 py-2 ${isActive
                                        ? "text-primary-container"
                                        : "text-on-surface"
                                        }`}
                                >
                                    <MdDashboard />
                                    <span>Dashboard</span>
                                </div>
                            </>
                        )}
                    </NavLink>

                    {/* Books */}
                    <NavLink
                        to="/admin/books"
                        className="relative block"
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <>
                                        <div className="absolute inset-0 rounded bg-surface-container" />

                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container" />
                                    </>
                                )}

                                <div
                                    className={`relative flex items-center gap-4 py-2 ${isActive
                                        ? "text-primary-container"
                                        : "text-on-surface"
                                        }`}
                                >
                                    <FaBook />
                                    <span>Books</span>
                                </div>
                            </>
                        )}
                    </NavLink>

                    {/* Borrowers */}
                    <NavLink
                        to="/admin/borrowers"
                        className="relative block"
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <>
                                        <div className="absolute inset-0 rounded bg-surface-container" />

                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container" />
                                    </>
                                )}

                                <div
                                    className={`relative flex items-center gap-4 py-2 ${isActive
                                        ? "text-primary-container"
                                        : "text-on-surface"
                                        }`}
                                >
                                    <FaUsers />
                                    <span>Borrowers</span>
                                </div>
                            </>
                        )}
                    </NavLink>

                </ul>

                {/* Settings */}
                <ul className="mt-auto">
                    <NavLink
                        to="/admin/settings"
                        className="relative block"
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <>
                                        <div className="absolute inset-0 rounded bg-surface-container" />

                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container" />
                                    </>
                                )}

                                <div
                                    className={`relative flex items-center gap-4 py-2 ${isActive
                                        ? "text-primary-container"
                                        : "text-on-surface"
                                        }`}
                                >
                                    <FiSettings />
                                    <span>Settings</span>
                                </div>
                            </>
                        )}
                    </NavLink>
                </ul>

            </nav>
        </div>
    );
};

export default AdminSidebar;