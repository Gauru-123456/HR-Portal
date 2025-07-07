import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns } from '../../utils/AttendanceHelper';
import { AttendanceHelper } from '../../utils/AttendanceHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  // ✅ Status change handler
  const statusChange = (employeeId, newStatus) => {
    const updated = attendance.map((item) =>
      item.employeeId === employeeId ? { ...item, status: newStatus } : item
    );
    setAttendance(updated);
    setFilteredAttendance(updated);
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/attendance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.attendance.map((att) => ({
            employeeId: att.employeeId._id, // ✅ use MongoDB ID
            empId: att.employeeId.employeeId, // 👈 if you still want to display 245 in the table
            sno: sno++,
            department: att.employeeId.department.dep_name,
            name: att.employeeId.userId.name,
            status: att.status,
          }));
          setAttendance(data);
          setFilteredAttendance(data);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(value) || emp.name.toLowerCase().includes(value)
    );
    setFilteredAttendance(filtered);
  };

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-6 py-0.5 border"
          onChange={handleFilter}
        />
        <p className="text-2xl">
          Mark Employees for{' '}
          <span className="text-2xl font-bold underline">
            {new Date().toISOString().split('T')[0]}
          </span>
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns(statusChange)}
          data={filteredAttendance}
          progressPending={loading}
          pagination
        />
      </div>
    </div>
  );
};

export default Attendance;




/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, AttendanceHelper } from '../../utils/AttendanceHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilterAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/attendance', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.attendance.map((att) => ({
            employeeId: att.employeeId.employeeId,
            sno: sno++,
            department: att.employeeId.department.dep_name,
            name: att.employeeId.userId.name,
            action: <AttendanceHelper status={att.status} employeeId={att.employeeId.employeeId} statusChange={statusChange} />,
          }));
          setAttendance(data);
          setFilterAttendance(data);
        }
      } catch (error) {
        console.log(error.message);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance(); //  Run it inside useEffect
  }, []);

  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();
    const records = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(value) ||
      emp.name.toLowerCase().includes(value)
    );
    setFilterAttendance(records);
  };

  if (!filteredAttendance) {
    return <div>Loading .....</div>
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="px-6 py-0.5 border"
          onChange={handleFilter}
        />
        <p classname='text-2x1'>
          Mark Employees for <span className='text-2x1 font-bold underline'>{new Date().toISOString().split('T')[0]}</span>
        </p>

        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filteredAttendance}
          progressPending={loading}
          pagination
        />
      </div>
    </div>
  );
};

export default Attendance;*/
