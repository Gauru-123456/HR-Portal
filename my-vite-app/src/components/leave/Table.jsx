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
    <div className="p-6">
      <div className="text-center">
              <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center mt-4">
              <input
                type="text"
                placeholder="Search By Emp Id"
                className="px-4 py-0.5 border"
                onChange={filterByInput}
             />
            <div className="space-x-3">
            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
            onClick={() => filterByButton('Pending')}>
              Pending</button>

            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
            onClick={() => filterByButton('Approved')}>
              Approved</button>

            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
            onClick={() => filterByButton('Rejected')}>
              Rejected</button>
            </div>
        </div>

            <div className="mt-3" >  
          <DataTable columns={columns} data={filteredLeaves} pagination/>
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
