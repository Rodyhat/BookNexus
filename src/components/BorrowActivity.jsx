import { FiAlertCircle } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { MdPriorityHigh } from "react-icons/md";
import { Link } from "react-router-dom";

const BorrowActivity = () => {
    return (
        <section className="shadow-sm col-span-2 rounded-[8px]">
            <div className="flex justify-between px-4 py-6 bg-[#F8FAFC]">
                <h5 className="text-lg font-semibold font-heading">Recent Borrow Activity</h5>
                <Link className="text-sm text-primary-container">View all</Link>
            </div>
            <section className="bg-white">
                <div className="flex gap-3 p-5">
                    <div className="bg-surface-container-high text-primary-container w-10 h-10 rounded-[50%] flex items-center justify-center">
                        <LuUser size={24} />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="">
                            <h6 className="text-sm font-semibold">Sarah Jenkins</h6>
                            <p className="py-2">Borrowed 'The Design of Everyday Things'</p>
                            <div className="bg-tertiary-fixed/20 text-tertiary-container rounded-full text-label-sm  p-1.5  w-fit">Due: Oct 24, 2023</div>
                        </div>
                        <span className="time text-label-sm">2 minutes ago</span>
                    </div>
                </div>
                <hr className="border-outline-variant " />
                <div className="flex gap-3 p-5">
                    <div className="bg-surface-container-high text-primary-container w-10 h-10 rounded-[50%] flex items-center justify-center">
                        <LuUser size={24} />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="">
                            <h6 className="text-sm font-semibold">Sarah Jenkins</h6>
                            <p className="py-2">Borrowed 'The Design of Everyday Things'</p>
                            <div className="bg-tertiary-fixed/20 text-tertiary-container rounded-full text-label-sm  p-1.5  w-fit">Due: Oct 24, 2023</div>
                        </div>
                        <span className="time text-label-sm">2 minutes ago</span>
                    </div>
                </div>
                <hr className="border-outline-variant " />
                <div className="flex gap-3 p-5">
                    <div className="bg-[#FEEBEE] text-error w-10 h-10 rounded-[50%] flex items-center justify-center">
                        <MdPriorityHigh size={24} />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="">
                            <h6 className="text-sm font-semibold">Sarah Jenkins</h6>
                            <p className="py-2">Borrowed 'The Design of Everyday Things'</p>
                            <div className="bg-tertiary-fixed/20 text-tertiary-container rounded-full text-label-sm  p-1.5  w-fit">Due: Oct 24, 2023</div>
                        </div>
                        <span className="time text-label-sm">2 minutes ago</span>
                    </div>
                </div>
                <hr className="border-outline-variant " />
                <div className="flex gap-3 p-5">
                    <div className="bg-surface-container-high text-primary-container w-10 h-10 rounded-[50%] flex items-center justify-center">
                        <LuUser size={24} />
                    </div>
                    <div className="flex w-full justify-between">
                        <div className="">
                            <h6 className="text-sm font-semibold">Sarah Jenkins</h6>
                            <p className="py-2">Borrowed 'The Design of Everyday Things'</p>
                            <div className="bg-tertiary-fixed/20 text-tertiary-container rounded-full text-label-sm  p-1.5  w-fit">Due: Oct 24, 2023</div>
                        </div>
                        <span className="time text-label-sm">2 minutes ago</span>
                    </div>
                </div>
                <hr className="border-outline-variant " />
               
            </section>

        </section>

    )
}
export default BorrowActivity;