import { Outlet, NavLink } from "react-router-dom";
import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import UserHeader from "./UserHeader";

const UserLayout = () => {
    return (
        <div className="min-h-screen bg-[#F9F9FF] font-sora pb-20 md:pb-0">

            <UserHeader />

            {/* ================= PAGE CONTENT ================= */}
            <main className="page-container mx-auto">
                <Outlet />
            </main>

            {/* ================= MOBILE BOTTOM NAV ================= */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50">

                <div className="flex justify-around items-center h-16">

                    {/* Dashboard */}
                    <NavLink
                        to="/user/dashboard"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full transition-colors ${
                                isActive
                                    ? "text-primary-container"
                                    : "text-slate-400"
                            }`
                        }
                    >
                        <MdDashboard size={23} className="mb-1" />

                        <span className="text-[10px] font-bold uppercase tracking-tighter">
                            Dashboard
                        </span>
                    </NavLink>


                    {/* My Books */}
                    <NavLink
                        to="/user/mybooks"
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full transition-colors ${
                                isActive
                                    ? "text-primary-container"
                                    : "text-slate-400"
                            }`
                        }
                    >
                        <MdLibraryBooks size={23} className="mb-1" />

                        <span className="text-[10px] font-bold uppercase tracking-tighter">
                            My Books
                        </span>
                    </NavLink>


                    {/* Profile */}
                    <NavLink
                        to="/user/profile"
                        className="w-full h-full"
                    >
                        {({ isActive }) => (
                            <div
                                className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                                    isActive
                                        ? "text-primary-container"
                                        : "text-slate-400"
                                }`}
                            >
                                <img
                                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                                    className={`w-6 h-6 rounded-full mb-1 ${
                                        isActive
                                            ? ""
                                            : "grayscale opacity-70"
                                    }`}
                                    alt="Profile"
                                />

                                <span className="text-[10px] font-bold uppercase tracking-tighter">
                                    Profile
                                </span>
                            </div>
                        )}
                    </NavLink>

                </div>

            </nav>

        </div>
    );
};

export default UserLayout;