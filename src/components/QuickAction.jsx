import { FiPlusSquare, FiUsers } from "react-icons/fi";
import { MdLibraryBooks } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const QuickAction = () => {
    const navigate = useNavigate();
    return (
        <section className="bg-white py-6 px-6 lg:w-fit  lg:col-span-1 rounded-[8px]">
            <h3 className="font-heading text-lg font-semibold pb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
                <button
                    className="text-white bg-primary-container rounded-lg px-4 py-6 flex flex-col items-center"
                    onClick={() => navigate('/admin/add_edit_books')}
                >
                    <FiPlusSquare size={20} />
                    <span className="text-sm">Add Book</span>
                </button>
                <button
                    className="text-black bg-border-light rounded-lg px-4 py-6 flex flex-col items-center"
                    onClick={() => navigate('/admin/borrowers')}
                >
                    <FiUsers size={20} />
                    <span className="text-sm">Borrowers</span>
                </button>
                <button
                    className="text-black bg-border-light rounded-lg p-4 py-6 flex flex-col items-center col-span-2"
                    onClick={() => navigate('/admin/books')}
                >
                    <MdLibraryBooks size={20} />
                    <span className="text-sm">Manage Books</span>
                </button>
            </div>
        </section>
    )
}
export default QuickAction;