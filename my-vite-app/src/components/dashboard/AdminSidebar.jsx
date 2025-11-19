import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaCalendarAlt, FaCog, FaMoneyBillWave, FaRegCalendarAlt, FaTachometerAlt, FaUsers, FaBars, FaTimes } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";

const AdminSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return(
    <>
        {/* Mobile Menu Button */}
        <button 
            onClick={toggleSidebar}
            className="lg:hidden fixed top-3 left-4 z-50 p-2 bg-teal-600 text-white rounded-md"
        >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>

        {/* Overlay for mobile */}
        {isOpen && (
            <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={toggleSidebar}
            ></div>
        )}

        {/* Sidebar */}
        <div className={`bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 z-40 transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h3 className="text-xl text-center font-pacific">Employee MS</h3>
            </div>
            <div className="px-4 overflow-y-auto h-[calc(100vh-3rem)]">
                <NavLink 
                    to="/admin-dashboard"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink 
                    to="/admin-dashboard/employees"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <FaUsers />
                    <span>Employees</span>
                </NavLink>
                <NavLink 
                    to="/admin-dashboard/departments"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <FaBuilding />
                    <span>Department</span>
                </NavLink>
                <NavLink 
                    to="/admin-dashboard/leaves"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <FaCalendarAlt />
                    <span>Leave</span>
                </NavLink>
                <NavLink 
                    to="/admin-dashboard/salary/add"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>
                <NavLink 
                    to="/admin-dashboard/attendance"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <FaRegCalendarAlt />
                    <span>Attendance</span>
                </NavLink>
                <NavLink 
                    to="/admin-dashboard/attendance-report"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <AiOutlineFileText />
                    <span>Attendance Report</span>
                </NavLink>
                <NavLink 
                    to="/admin-dashboard/setting"
                    onClick={() => setIsOpen(false)}
                    className={({isActive}) => `${isActive ? "bg-teal-500 ":""}
                    flex items-center space-x-4 block py-2.5 px-4 rounded hover:bg-teal-700 transition-colors`}
                >
                    <FaCog />
                    <span>Settings</span>
                </NavLink>
            </div>
        </div>
    </>
    
        
    )
}

export default AdminSidebar

//className="flex items-center space-x-4 block py-2.5 px-4 rounded"