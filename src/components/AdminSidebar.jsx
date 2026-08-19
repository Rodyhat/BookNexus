import { FaBook, FaUsers } from "react-icons/fa";
import { FiMenu, FiSettings } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className={`bg-surface-container-low py-10 w-64 ps-7 min-h-screen hidden md:flex flex-col `}>
            <div className="text-primary-container font-heading font-bold text-headline-sm">
                ADMIN PANEL
            </div>

            <nav className="mt-6 flex-1 border">
                <ul className="flex flex-col gap-2">

                    {/* Dashboard */}
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            `relative block ${isActive ? "" : ""}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <>
                                        {/* Background */}
                                        <div className="absolute inset-0 rounded bg-surface-container"></div>

                                        {/* Blue indicator */}
                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container"></span>
                                    </>
                                )}

                                {/* Content */}
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
                                        <div className="absolute inset-0  rounded bg-surface-container"></div>

                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container"></span>
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
                                        <div className="absolute inset-0 rounded bg-surface-container"></div>

                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container"></span>
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
                    {/* Settings */}
                    <NavLink
                        to="/admin/settings"
                        className="relative border block"
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <>
                                        <div className="absolute inset-0 rounded bg-surface-container"></div>

                                        <span className="absolute -left-4 top-0 h-full w-1 rounded-l bg-primary-container"></span>
                                    </>
                                )}

                                <div
                                    className={`relative flex items-center  gap-4 py-2 ${isActive
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