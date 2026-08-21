import { FiPlusSquare, FiUserPlus } from "react-icons/fi";
import { MdQrCodeScanner } from "react-icons/md";

const QuickAction = () => {
    return (
        <section className="bg-white py-6 px-6 w-fit cols-span-1 rounded-[8px]">
            <h3 className="font-heading text-lg font-semibold pb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
                <div className="text-white bg-primary-container rounded-lg p-8 flex flex-col items-center">
                    <FiPlusSquare />
                    <h6 className="text-sm">Add Book</h6>
                </div>
                <div className="text-black bg-[#F1F5F9] rounded-lg p-8 flex flex-col items-center">
                    <FiUserPlus />
                    <h6>New Borrower</h6>
                </div>
                <div className="text-black bg-[#F1F5F9] rounded-lg p-8 flex flex-col items-center col-span-2">
                    <MdQrCodeScanner />
                    <h6>Scan Return</h6>
                </div>
            </div>
        </section>
    )
}
export default QuickAction;