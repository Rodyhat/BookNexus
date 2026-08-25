import { FiAlertTriangle } from "react-icons/fi";
import { MdCheckCircle, MdLibraryBooks, MdMenuBook } from "react-icons/md";
import BorrowActivity from "../components/BorrowActivity";
import QuickAction from "../components/QuickAction";
import TopCategories from "../components/TopCategories";
import { useContext } from "react";
import { AdminContext } from "../context/myContext";

const AdminDashboard = () => {
    return (
        <section className="w-full">
            <div className="">
                <h3 className="font-sora text-headline-lg font-bold">Overview</h3>
                <p>System status and recent library activity.</p>
            </div>
            <div className="grid my-7 gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                <div className="bg-white p-6 w-full rounded-[8px] shadow-sm  lg:border-transparent transition-colors duration-600 lg:hover:border-primary-container border border-primary-container">
                    <div className="flex items-center justify-between">
                        <h5 className="text-body-sm py-5">TOTAL BOOKS</h5>
                        <div className="w-8 h-8 rounded-[50%] text-primary-container flex items-center justify-center bg-surface-container-high"><MdLibraryBooks size={20} /></div>
                    </div>
                    <h1 className="font-extrabold font-heading text-display">24,592</h1>
                </div>
                <div className='bg-white p-6 w-full rounded-[8px] shadow-sm border border-tertiary-container lg:border-transparent transition-colors duration-600 lg:hover:border-tertiary-container' >
                    <div className="flex items-center justify-between">
                        <h5 className="text-body-sm py-5">AVAILABLE</h5>
                        <div className="w-8 h-8 rounded-[50%] text-tertiary-container flex items-center justify-center bg-tertiary-fixed/20"><MdCheckCircle size={20} /></div>
                    </div>
                    <h1 className="font-extrabold font-heading text-display">24,592</h1>
                </div>
                <div className="bg-white p-6 w-full rounded-[8px] shadow-sm border border-secondary-container lg:border-transparent transition-colors lg:hover:border-secondary-container duration-600">
                    <div className="flex items-center gap-4 justify-between">
                        <h5 className="text-body-sm py-5">BORROWED</h5>
                        <div className="w-8 h-8 rounded-[50%] text-secondary-container flex items-center justify-center bg-[#FFFBEB]"><MdMenuBook size={20} /></div>
                    </div>
                    <h1 className="font-extrabold font-heading text-display">24,592</h1>
                </div>
                <div className="bg-white p-6 w-full rounded-[8px] shadow-sm border border-error lg:border-transparent transition-colors duration-600 lg:hover:border-error">
                    <div className="flex items-center gap-4 justify-between">
                        <h5 className="text-body-sm py-5">OVERDUE</h5>
                        <div className="w-8 h-8 rounded-[50%] text-error flex items-center justify-center bg-[#FEEBEE]"><FiAlertTriangle size={20} /></div>
                    </div>
                    <h1 className="font-extrabold font-heading text-display">24,592</h1>
                </div>

            </div>
            <div className="grid gap-5 lg:grid-cols-3">
                <BorrowActivity />
                <div className="grid gap-5">
                    <QuickAction />
                    <TopCategories />
                </div>
            </div>
        </section>
    )
}

export default AdminDashboard;