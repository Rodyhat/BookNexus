import { FiMoreVertical, FiPlusSquare, FiUserPlus } from "react-icons/fi";
import { MdQrCodeScanner } from "react-icons/md";

const TopCategories = () => {
    return (
        <section className="bg-white py-6 px-6 w-full col-span-1 rounded-[8px]">
            <div className="flex justify-between">
                <h3 className="font-heading text-lg font-semibold pb-6">Top Categories</h3>
                <FiMoreVertical size={20} />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <div className="fiction">
                    <div className="">
                        <div className="flex justify-between pb-3">
                            <h6>Fiction</h6>
                            <span>42%</span>
                        </div>
                        <div className="w-full h-3 flex rounded-full overflow-hidden">
                            <div className="w-[50%] bg-primary-container"></div>
                            <div className="w-[50%] bg-border-light "></div>
                        </div>
                    </div>
                </div>
                <div className="fiction">
                    <div className="">
                        <div className="flex justify-between pb-3">
                            <h6>Non-Fiction</h6>
                            <span>28%</span>
                        </div>
                        <div className="w-full h-3 flex rounded-full overflow-hidden">
                            <div className="w-[40%] bg-primary-container"></div>
                            <div className="w-[60%] bg-border-light "></div>
                        </div>
                    </div>
                </div>
                <div className="fiction">
                    <div className="">
                        <div className="flex justify-between pb-3">
                            <h6>Science & Tech</h6>
                            <span>15%</span>
                        </div>
                        <div className="w-full h-3 flex rounded-full overflow-hidden">
                            <div className="w-[30%] bg-primary-container"></div>
                            <div className="w-[70%] bg-border-light "></div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default TopCategories;