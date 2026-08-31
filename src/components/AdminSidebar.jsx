import { FaBook, FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
    const navItems = [
        {
            to: "/admin/dashboard",
            label: "Dashboard",
            icon: MdDashboard,
        },
        {
            to: "/admin/books",
            label: "Books",
            icon: FaBook,
        },
        {
            to: "/admin/borrowers",
            label: "Borrowers",
            icon: FaUsers,
        },
    ];

    return (
        <div className="h-full w-full bg-surface-container-low">
            <div className="flex h-full flex-col px-7 py-10">

                {/* Logo / Title */}
                <div className="shrink-0 text-primary-container font-heading font-bold text-headline-sm">
                    ADMIN PANEL
                </div>

                <nav className="mt-6 flex flex-1 flex-col">

                    {/* Main Navigation */}
                    <ul className="flex flex-col gap-2">
                        {navItems.map(({ to, label, icon: Icon }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    className="relative block"
                                >
                                    {({ isActive }) => (
                                        <div
                                            className={`relative flex items-center gap-4 rounded py-2 ${
                                                isActive
                                                    ? "text-primary-container"
                                                    : "text-on-surface"
                                            }`}
                                        >
                                            {isActive && (
                                                <>
                                                    {/* Active Background */}
                                                    <span className="absolute inset-0 z-0 rounded bg-surface-container" />

                                                    {/* Active Indicator */}
                                                    <span className="absolute -left-7 top-0 h-full w-1 rounded-r bg-primary-container" />
                                                </>
                                            )}

                                            <Icon className="relative z-10 shrink-0" />

                                            <span className="relative z-10">
                                                {label}
                                            </span>
                                        </div>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Settings */}
                    <ul className="mt-auto">
                        <li>
                            <NavLink
                                to="/admin/settings"
                                className="relative block"
                            >
                                {({ isActive }) => (
                                    <div
                                        className={`relative flex items-center gap-4 rounded py-2 ${
                                            isActive
                                                ? "text-primary-container"
                                                : "text-on-surface"
                                        }`}
                                    >
                                        {isActive && (
                                            <>
                                                {/* Active Background */}
                                                <span className="absolute inset-0 z-0 rounded bg-surface-container" />

                                                {/* Active Indicator */}
                                                <span className="absolute -left-7 top-0 h-full w-1 rounded-r bg-primary-container" />
                                            </>
                                        )}

                                        <FiSettings className="relative z-10 shrink-0" />

                                        <span className="relative z-10">
                                            Settings
                                        </span>
                                    </div>
                                )}
                            </NavLink>
                        </li>
                    </ul>

                </nav>
            </div>
        </div>
    );
};

export default AdminSidebar;