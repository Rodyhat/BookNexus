import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

const AdminDashboard = () => {
    return (
        <section className="flex">
            {/* side bar */}
            <AdminSidebar />
            <div className="flex-1">
                <AdminHeader />

                {/* content */}
            </div>
        </section>
    )
}

export default AdminDashboard;