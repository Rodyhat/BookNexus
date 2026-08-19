import { FaBook, FaUsers } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return (
        <div className="bg-surface-container-low px-8 py-10">
            <div className="text-primary-container font-heading font-bold text-headline-sm">ADMIN PANEL</div>
            <nav>
                <ul className="flex flex-col gap-2">
                    <div className="">
                        <span className="border-primary-container w-2 h-4"></span>
                        <div className="flex gap-4 items-center bg-surface-container text-primary-container"><MdDashboard /> <Link className="">Dashboard</Link></div>
                    </div>
                    <div className="flex gap-4 items-center"><FaBook /> <Link>Books</Link></div>
                    <div className="flex gap-4 items-center"><FaUsers /><Link>Borrowers</Link></div>
                </ul>
                <div className="flex gap-4 items-center"><FiSettings />Settings</div>
            </nav>
        </div>
    )
}

export default AdminSidebar;