import { Link, NavLink } from "react-router-dom";
import Logo from '/src/assets/logo.png'

const UserHeader = () => {
    return (
        //  ================= TOP HEADER ================= 
        <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-indigo-100 z-40" >

            <div className="page-container flex justify-between items-center py-2 md:py-3">

                {/* Logo */}
                <Link to="/dashboard" className="shrink-0">
                    <img
                        src={Logo}
                        alt="BookNexus"
                        className="w-12 h-12 md:w-14 md:h-14 object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-4 lg:gap-8">

                    <NavLink
                        to="/user/dashboard"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded transition-colors ${isActive
                                ? "text-primary-container font-semibold bg-[#EEF2FF]"
                                : "text-slate-500 hover:bg-[#EEF2FF]"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/user/mybooks"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded transition-colors ${isActive
                                ? "text-primary-container font-semibold bg-[#EEF2FF]"
                                : "text-slate-500 hover:bg-[#EEF2FF]"
                            }`
                        }
                    >
                        My Books
                    </NavLink>

                    <NavLink
                        to="/user/profile"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded transition-colors ${isActive
                                ? "text-primary-container font-semibold bg-[#EEF2FF]"
                                : "text-slate-500 hover:bg-[#EEF2FF]"
                            }`
                        }
                    >
                        Profile
                    </NavLink>

                    {/* Profile Image */}
                    <Link
                        to="/user/profile"
                        className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-slate-200 overflow-hidden shrink-0"
                    >
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </Link>

                </nav>

                {/* Mobile / Tablet Profile */}
                <Link
                    to="/user/profile"
                    className="md:hidden w-9 h-9 rounded-full border border-slate-200 overflow-hidden shrink-0"
                >
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </Link>

            </div>
        </header >
    )
}

export default UserHeader;