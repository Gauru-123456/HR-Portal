/*import React from 'react' - this line is removed permanently because now i am using react 19

const AdminDashboard = () => {
   return (
      <div>AdminDashboard</div>
   )
}


export default AdminDashboard   */

import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  if (!user) return <div>Please login to continue</div>;

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 lg:ml-64 bg-gray-100 min-h-screen">
        <Navbar />
        <Outlet />   
      </div>
    </div>
  );
};

export default AdminDashboard;



/* Add more dashboard components here */
































/*import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const {user, loading} = useAuth()
  const navigate = useNavigate()

  if(loading ) {
    return <div>Loading .....</div>
  }

  if(!user) {
    navigate('/login')
  }
  return (
    <div>AdminDashboard      {user && user.name}</div>
  );
};

export default AdminDashboard;

*/
