import React from 'react';
import axios from 'axios';

export const columns = (statusChange) => [
  {
    name: 'S No',
    selector: (row) => row.sno,
    width: '70px',
    center: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: 'Emp ID',
    selector: (row) => row.empId,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: 'Department',
    selector: (row) => row.department,
    sortable: true,
    grow: 1,
    wrap: true,
  },
  {
    name: 'Action',
    cell: (row) => (
      <AttendanceHelper
        status={row.status}
        employeeId={row.employeeId}
        statusChange={statusChange}
      />
    ),
    center: true,
    minWidth: '350px',
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (statusType) => {
    try {
      // ✅ Updated to use correct PUT route
      const response = await axios.put(
        `http://localhost:5000/api/attendance/update/${employeeId}`,
        { status: statusType },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        statusChange(employeeId, statusType); // ✅ Notify parent to update UI
      }
    } catch (error) {
      console.error("Error marking attendance:", error.message);
    }
  };

  return (
    <div>
      {status == null ? (
        <div className="flex flex-wrap gap-1">
          <button
            className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-xs"
            onClick={() => markEmployee('Present')}
          >
            Present
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs"
            onClick={() => markEmployee('Absent')}
          >
            Absent
          </button>
          <button
            className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-xs"
            onClick={() => markEmployee('Sick')}
          >
            Sick
          </button>
          <button
            className="px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-colors text-xs"
            onClick={() => markEmployee('Leave')}
          >
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-200 text-center px-3 py-1 rounded font-medium capitalize text-sm">
          {status}
        </p>
      )}
    </div>
  );
};






/*import axios from 'axios';

export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno,
        width: '70px'
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        width: '130px'
    },
    {
        name: 'Emp ID',
        selector: (row) => row.employeeId,
        sortable: true,
        width: '120px'
    },
    {
        name: 'Department',
        selector: (row) => row.department,
        sortable: true,
        width: '120px'
    },
    {
        name: 'Action',
        selector: (row) => row.action,
        center: true,
    },
]

export const AttendanceHelper = ({status, employeeId}) => {
    const markEmployee = async (status, employeeId) => {
        const response = await axios.put(`http://localhost:5000/api/attendance/update/${employeeId}`, {status},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            if(response.data.success) {
                stausChange()
            }
    }
return (
    <div>
    {status == null ? (
    <div className="flex space-x-8">
        <button
            className="px-4 py-2 bg-green-500 text-white"
            onClick={() => markEmployee('present', employeeId)}
        >
            Present
        </button>
        <button
            className="px-4 py-2 bg-red-500 text-white"
            onClick={() => markEmployee('absent', employeeId)}>
            Absent
        </button>
        <button
            className="px-4 py-2 bg-gray-500 text-white"
            onClick={() => markEmployee('sick', employeeId)}>
            Sick
        </button>
        <button
            className="px-4 py-2 bg-yellow-500 text-black"
            onClick={() => markEmployee('leave', employeeId)}>
            Leave
        </button>
    </div>
        ) : (
     <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
    )}
 </div>
  )
}*/


