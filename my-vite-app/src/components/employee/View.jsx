import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        //console.log(response.data)
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  return (
    <>{employee ? (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-4 md:p-8 rounded-md shadow-md">
      <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={`http://localhost:5000/${employee.userId?.profileImage}`}
            className="rounded-full border w-48 h-48 md:w-72 md:h-72 object-cover"
            alt="Profile"
          />
        </div>
        <div>
          <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
            <p className="text-base md:text-lg font-bold">Name:</p>
            <p className="font-medium">{employee.userId?.name}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
            <p className="text-base md:text-lg font-bold">Employee ID:</p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
            <p className="text-base md:text-lg font-bold">Date of Birth:</p>
            <p className="font-medium">
              {employee.dob && new Date(employee.dob).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
            <p className="text-base md:text-lg font-bold">Gender:</p>
            <p className="font-medium">{employee.gender}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
            <p className="text-base md:text-lg font-bold">Department:</p>
            <p className="font-medium">{employee.department?.dep_name}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-3 mb-4">
            <p className="text-base md:text-lg font-bold">Marital Status:</p>
            <p className="font-medium">{employee.maritalStatus}</p>
          </div>
        </div>
      </div>
    </div>
    ): <div> Loading....</div>}</>
  );
};

export default View;
