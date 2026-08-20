import { useContext } from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import { AdminContext } from "../context/myContext";
import logo from "/src/assets/logo.png";

const AdminHeader = () => {
    const { handleSidebar } = useContext(AdminContext);

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
                        src={logo}
                        alt="BookNexus"
                        className="w-9 h-9"
                    />

                    <h3 className="font-heading font-bold text-primary-container">
                        BookNexus
                    </h3>

                </div>

                {/* Right */}
                <div className="flex items-center gap-4">

                    <FiBell size={20} />

                    <div className="w-8 h-8 rounded-full border" />

                </div>

            </div>

        </header>
    );
};

export default AdminHeader;