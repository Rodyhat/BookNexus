import { useContext } from "react";
import { FiBell, FiLogOut, FiMenu } from "react-icons/fi";
import { AdminContext, AuthContext } from "../context/myContext";
import { useNavigate } from "react-router-dom";
const AdminHeader = () => {
    const { handleSidebar } = useContext(AdminContext);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const metadata = user?.user_metadata || {};
    const adminName = metadata.full_name || metadata.name || user?.email || "Admin";
    const avatarUrl = metadata.avatar_url || metadata.picture || metadata.photo_url;
    const initials = adminName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");

    return (
        <header className="w-full border-b border-outline-variant bg-white">

            <div className="flex items-center justify-between px-4 py-4">

                {/* Left */}
                <div className="flex items-center gap-3">

                    <button
                        type="button"
                        onClick={handleSidebar}
                        className="lg:hidden text-primary-container"
                    >
                        <FiMenu size={24} />
                    </button>

                    <img
                        src="/logo.png"
                        alt="BookNexus"
                        className="w-9 h-9"
                    />

                    <h3 className="font-heading font-bold text-primary-container">
                        BookNexus
                    </h3>

                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                    <FiBell size={20} className="text-slate-500" />
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-indigo-50 text-xs font-bold text-primary-container">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={`${adminName} profile`} className="h-full w-full object-cover" />
                            ) : initials || "A"}
                        </div>
                        <span className="hidden max-w-40 truncate text-sm font-semibold text-slate-700 sm:block">
                            {adminName}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={async () => {
                            await logout();
                            navigate("/signin", { replace: true });
                        }}
                        className="flex items-center gap-2 rounded px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        aria-label="Sign out"
                        title="Sign out"
                    >
                        <FiLogOut size={18} />
                        <span className="hidden md:inline">Sign out</span>
                    </button>
                </div>

            </div>

        </header>
    );
};

export default AdminHeader;