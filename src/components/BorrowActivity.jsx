import { LuUser } from "react-icons/lu";
import { Link } from "react-router-dom";

const BorrowActivity = () => {
    return (
        <section className="shadow-sm p-6 w-fit">
            <div className="flex justify-between">
                <h5 className="text-lg">Recent Borrow Activity</h5>
                <Link className="text-sm text-primary-container">View all</Link>
            </div>
            <section>
                <div className="flex gap-5 py-4">
                    <div className="bg-surface-container-high text-primary-container w-10 h-10 rounded-[50%] flex items-center justify-center">
                        <LuUser size={20} />
                    </div>
                    <div className="flex">
                        <div className="">
                            <h6>Sarah Jenkins</h6>
                            <p>Borrowed 'The Design of Everyday Things'</p>
                            <div className="bg-tertiary-fixed/20 text-tertiary-container rounded-full text-label-sm  p-1.5  w-fit">Due: Oct 24, 2023</div>
                        </div>
                        <span className="time">2 minutes ago</span>
                    </div>
                </div>
                <hr className="border-outline-variant" />
                <div className="flex gap-5 py-4">
                    <div className="bg-surface-container-high text-primary-container w-10 h-10 rounded-[50%] flex items-center justify-center">
                        <LuUser size={20} />
                    </div>
                    <div className="flex">
                        <div className="">
                            <h6>Sarah Jenkins</h6>
                            <p>Borrowed 'The Design of Everyday Things'</p>
                            <div className="bg-tertiary-fixed/20 text-tertiary-container rounded-full text-label-sm  p-1.5  w-fit">Due: Oct 24, 2023</div>
                        </div>
                        <span className="time">2 minutes ago</span>
                    </div>
                </div>
                <hr className="border-outline-variant" />
            </section>

        </section>

    )
}
export default BorrowActivity;