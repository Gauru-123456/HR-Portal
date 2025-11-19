import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data.success) {
          console.log("✅ Leave Detail:", response.data.leave);
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
        const response = await axios.put(
          `http://localhost:5000/api/leave/${id}`, 
          { status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data.success) {
          navigate('/admin-dashboard/leaves')
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
  }

  //This line will display if employee leave detail couldn't display
  if (!leave || !leave.employeeId || !leave.employeeId.userId) {
    return <div className="text-center mt-10 text-red-600">Leave not found or data incomplete</div>;
  }

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-4 md:p-8 rounded-md shadow-md">
          <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Leave Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`}
                className="rounded-full border w-48 h-48 md:w-72 md:h-72 object-cover"
              />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">Name:</p>
                <p className="font-medium">{leave.employeeId.userId.name}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">Employee ID:</p>
                <p className="font-medium">{leave.employeeId.employeeId}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">Leave Type:</p>
                <p className="font-medium">{leave.leaveType}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">Reason:</p>
                <p className="font-medium">{leave.reason}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">Department:</p>
                <p className="font-medium">{leave.employeeId.department.dep_name}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">Start Date:</p>
                <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">End Date:</p>
                <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
                <p className="text-base md:text-lg font-bold">
                    {leave.status === 'Pending' ? 'Action:' : 'Status:'}
                </p>
                {leave.status === 'Pending' ? (
                    <div className='flex gap-2 mt-2 sm:mt-0'>
                        <button 
                          className='px-3 py-1 bg-teal-300 hover:bg-teal-400 rounded transition-colors'
                          onClick={() => changeStatus(leave._id, "Approved")}
                        >
                          Approve
                        </button>
                        <button 
                          className='px-3 py-1 bg-red-300 hover:bg-red-400 rounded transition-colors'
                          onClick={() => changeStatus(leave._id, "Rejected")}
                        >
                          Reject
                        </button>
                    </div>
                ) : (
                    <p className="font-medium">{leave.status}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10 text-lg">Loading...</div>
      )}
    </>
  );
};

export default Detail;
