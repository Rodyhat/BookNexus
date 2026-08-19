// import { FaBell } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
import logo from '/src/assets/logo.png';
import { FiBell, FiMenu } from 'react-icons/fi';
const AdminHeader = () => {
    return (
        <nav className=''>
            <div className="flex justify-between items-center p-5">
                <button className='md:hidden' onClick={}>  <FiMenu size={20} /></button>
                <div className="flex items-center">
                    <img src={logo} alt="" className='size-10' />
                    <h3 className='font-heading font-bold text-primary-container text-headline-sm'>BookNexus</h3>
                </div>
                <div className="flex gap-4 items-center">
                    <FiBell size={20} />
                    <div className="w-7 h-7 rounded-[50%] border"></div>
                </div>
            </div>
            <hr className='border-outline-variant' />
        </nav>

    )
}

export default AdminHeader;