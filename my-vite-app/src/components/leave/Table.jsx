import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from 'axios';

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);
  
  const fetchLeaves = async () => {
  console.log(" fetchLeaves called");

  try {
    const token = localStorage.getItem("token");
    console.log(" Token:", token);

    const response = await axios.get("http://localhost:5000/api/leave", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ API Response:", response.data);

    if (response.data.success) {
      let sno = 1;

      const data = response.data.leaves.map((leave) => {
        console.log(" Mapping leave:", leave); // Log each leave

        return {
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId?.userId?.name || "N/A",
          leaveType: leave.leaveType,
          department: leave.employeeId?.department?.dep_name || "N/A",
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        };
      });

      console.log(" Final mapped data:", data);
      setLeaves(data);
      setFilteredLeaves(data);
    } else {
      console.warn(" API success false");
    }
  } catch (error) {
    console.error(" Error during fetchLeaves:", error.message);
    if (error.response) {
      console.error(" Server error response:", error.response.data);
    }
  }
 };
  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status
      .toLowerCase()
      .includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
    {filteredLeaves ? (
    <div className="p-4 md:p-6">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Search By Emp Id"
          className="w-full md:w-auto px-4 py-2 border rounded"
          onChange={filterByInput}
        />
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded transition-colors"
            onClick={() => filterByButton('Pending')}
          >
            Pending
          </button>
          <button 
            className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded transition-colors"
            onClick={() => filterByButton('Approved')}
          >
            Approved
          </button>
          <button 
            className="px-3 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded transition-colors"
            onClick={() => filterByButton('Rejected')}
          >
            Rejected
          </button>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">  
        <DataTable columns={columns} data={filteredLeaves} pagination responsive/>
      </div>
    </div>
     ) : (
      <div>Loading...</div>
    )}
 </>
  );
};

export default Table;

/*
IMPORTANT
THIS FETCH LEAVE IS WRONG AND ABOVE FETCH LEAVE IS CORRECT 
My old fetch leave I will correct this later

const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Fetched from API:",response.data);
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId?.employeeId || "N/A",
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department.dep_name, 
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
       setLeaves(data)
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  }; */
