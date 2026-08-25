import { FiPlusSquare, FiUserPlus } from "react-icons/fi";
import { MdQrCodeScanner } from "react-icons/md";

const QuickAction = () => {
    return (
        <section className="bg-white py-6 px-6 lg:w-fit  lg:col-span-1 rounded-[8px]">
            <h3 className="font-heading text-lg font-semibold pb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
                <button className="text-white bg-primary-container rounded-lg px-4 py-6 flex flex-col items-center">
                    <FiPlusSquare size={20}/>
                    <h6 className="text-sm">Add Book</h6>
                </button>
                <button className="text-black bg-border-light rounded-lg px-4 py-6 flex flex-col items-center">
                    <FiUserPlus size={20}/>
                    <h6 className="text-sm">New Borrower</h6>
                </button>
                <button className="text-black bg-border-light rounded-lg p-4 py-6 flex flex-col items-center col-span-2">
                    <MdQrCodeScanner size={20}/>
                    <h6 className="text-sm">Scan Return</h6>
                </button>
            </div>
        </section>
    )
}
export default QuickAction;